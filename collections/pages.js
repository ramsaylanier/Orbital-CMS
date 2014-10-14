Pages = new Meteor.Collection('pages');

Meteor.methods({
	page: function(pageAttributes){
		var loggedInUser = Meteor.user(),
			pageWithSameSlug = Pages.findOne({slug: pageAttributes.slug}),
			pageWithSameTitle = Pages.findOne({title: pageAttributes.title});


		if (Roles.userIsInRole(loggedInUser, ['admin'])){

			if (!pageAttributes.title){
				throw new Meteor.Error(422, 'Please enter a page title');
			}

			if (!pageAttributes.slug){
				throw new Meteor.Error(422, 'Please enter a page slug');
			}

			if (pageAttributes.slug && pageWithSameSlug){
				throw new Meteor.Error(302, 'This slug has already been used', pageWithSameSlug._id);
			}

			if (pageAttributes.title && pageWithSameTitle){
				throw new Meteor.Error(302, 'This page already exists', pageWithSameTitle._id);
			}

			var page = _.extend(_.pick(pageAttributes, 'title', 'slug', 'content', 'pageTemplate'), {
				submitted: new Date().getTime()
			});

			var pageId = Pages.insert(page);

			return pageId;

		}
	},
	updatePage: function(pageId, pageAttributes){

		var loggedInUser = Meteor.user();

		if (Roles.userIsInRole(loggedInUser, ['admin'])){

			if (!pageAttributes.title){
				throw new Meteor.Error(422, 'Please enter a page title');
			}

			var page = _.extend(_.pick(pageAttributes, 'title', 'content', 'pageTemplate'), {
				edited: new Date().getTime()
			});

			Pages.update({_id: pageId}, {$set: {
											title: page.title, 
											content: page.content, 
											pageTemplate: page.pageTemplate
										}
			});
		}
	},
	deletePage: function(pageId){
		var loggedInUser = Meteor.user();
		var settings = Settings.findOne();
		var landingPage = settings.landingPage;
		var pageTitle = Pages.findOne({_id: pageId}).title;
		var menus = Menus.find({"links.linkTitle": pageTitle}).fetch();

		_.each(menus, function(menu){
			var menuId = menu._id;

			console.log(menuId);
			
		})

		if (pageTitle == landingPage){
			throw new Meteor.Error(422, 'Before deleting this page, please select a new landing page.');
		}

		// if (Roles.userIsInRole(loggedInUser, ['admin'])){
		// 	Pages.remove({_id: pageId});
		// }
	}
})