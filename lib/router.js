var subs = new SubsManager();


Router.configure({
	loadingTemplate: 'loading',
	waitOn: function(){
		return [
			subs.subscribe('pages'),
			subs.subscribe('settings'),
			subs.subscribe('posts'),
			subs.subscribe('media')
		];
	}
})

Router.onBeforeAction('loading');
Router.onBeforeAction(function(){
	clearErrors();
})


Router.map(function(){
	this.route('showPage', {
		path: '/',
		layoutTemplate: 'layout',
		data: function(){
			landingPage = Settings.findOne().landingPage;
			return Pages.findOne({title: landingPage});
		}
	});

	this.route('login', {
		path: '/cms-login',
		layoutTemplate: 'loginLayout',
		waitOn: function(){
			return subs.subscribe('adminRoleExists')
		},
		data: function(){ 
			return Meteor.users.findOne()
		}
	});

	this.route('showPage',{
		path: '/:slug',
		layoutTemplate: 'layout',
		data: function(){
			page = Pages.findOne({slug: this.params.slug});
			if (page.pageTemplate == 'blog excerpt template')
				return [page, posts]
			return Pages.findOne({slug: this.params.slug})
		}
	});

	this.route('showPost', {
		path: '/posts/:slug',
		layoutTemplate: 'layout',
		data: function(){
			return Posts.findOne({slug: this.params.slug})
		}
	})
});