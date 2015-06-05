var adminRoutes = FlowRouter.group({
	prefix: "/admin"
})

adminRoutes.route('/', {
	action: function(){
		Session.set('adminActive', true);
		FlowLayout.render('layout', {main: 'showPage'})
	}
})

adminRoutes.route('/settings', {
	action: function(){
		var data = {
			adminTemplate: 'settings'
		}
		Blaze.renderWithData(Template.adminModal, data, $('body').get(0))
	}
})

adminRoutes.route('/pages', {
	action: function(){
		var data = {
			adminTemplate: 'pagesList'
		}
		Blaze.renderWithData(Template.adminModal, data, $('body').get(0))
	}
})

adminRoutes.route('/pages/add', {
	action: function(){
		var data = {
			adminTemplate: 'addPage'
		}
		Blaze.renderWithData(Template.adminModal, data, $('body').get(0))
	}
})

FlowRouter.route('/', {
	action: function(){
		FlowLayout.render('layout', {main: 'showPage'});
	}
})

FlowRouter.route('/:slug', {
	action: function(){
		Session.set('editMode', false);
		FlowLayout.render('layout', {main: 'showPage'})
	}
})

FlowRouter.route('/:slug/edit', {
	action: function(){
		Session.set('editMode', true);
		FlowLayout.render('layout', {main: 'showPage'})
	}
})

FlowRouter.route('/posts/:slug', {
	action: function(){
		Session.set('editMode', false);
		var post = Posts.findOne({slug: this.params.slug})
		FlowLayout.render('layout', {main: 'showPost'})
	}
})



// var subs = new SubsManager();


// Router.configure({
// 	layoutTemplate: 'layout'
// })

// Router.onBeforeAction('loading');
// Router.onBeforeAction(function(){
// 	clearErrors();
// 	this.next();
// })


// Router.map(function(){
// 	this.route('/', function(){
// 		this.render('showPage');
// 	});

// 	this.route('/cms-login', {
// 		waitOn: function(){
// 			return subs.subscribe('adminRoleExists');
// 		},

// 		action: function(){
// 			this.layout('loginLayout');
// 			this.render('login', {data: function(){
// 				return Meteor.users.findOne();
// 			}})
// 		}
// 	});

// 	// this.route('admin/pages', {
// 	// 	action: function(){
// 	// 		this.render('adminModal', {data: {adminTemplate: 'pagesList'}, to: 'modal'});
// 	// 	}
// 	// })

// 	// this.route('/:slug', {
// 	// 	onBeforeAction: function(){
// 	// 		Session.set('editMode', false);
// 	// 		this.next();
// 	// 	},
// 	// 	action: function(){
// 	// 		this.render('showPage')
// 	// 	}
// 	// }); 

// 	this.route('/:slug/edit', {
// 		onBeforeAction: function(){
// 			Session.set('editMode', true);
// 			this.next();
// 		},
// 		action: function(){
// 			var page = Pages.findOne({slug: this.params.slug});
// 			this.render('showPage', {data: page});
// 		}
// 	}); 

// 	this.route('/posts/:slug', {
// 		onBeforeAction: function(){
// 			Session.set('editMode', false);
// 			this.next();
// 		},
// 		action: function(){
// 			var post = Posts.findOne({slug: this.params.slug})
// 			this.render('showPost', {data: post});
// 		},
// 		name: 'post.show'
// 	});

// 	this.route('/posts/:slug/edit',{
// 		onBeforeAction: function(){
// 			Session.set('editMode', true);
// 			this.next();
// 		},
// 		action: function(){
// 			var post = Posts.findOne({slug: this.params.slug});
// 			this.render('showPost', {data: post});
// 		},
// 		name: 'post.edit'
// 	});
// });