var subs = new SubsManager();


Router.configure({
	loadingTemplate: 'loading',
	waitOn: function(){
		return [
			subs.subscribe('pages'),
			subs.subscribe('settings')
		];
	}
})

Router.onBeforeAction('loading');

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
			return Pages.findOne({slug: this.params.slug})
		}
	});
});