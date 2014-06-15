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

			var page = _.extend(_.pick(pageAttributes, 'title', 'slug', 'content'), {
				submitted: new Date().getTime()
			});

			var pageId = Pages.insert(page);

			return pageId;

		}
	}
})