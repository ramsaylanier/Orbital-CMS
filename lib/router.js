var subs = new SubsManager();


Router.configure({
	loadingTemplate: 'loading'
})

Router.onBeforeAction('loading');

Router.map(function(){
	this.route('home', {
		path: '/',
		layoutTemplate: 'layout'
	});

	this.route('login', {
		path: '/cms-login',
		layoutTemplate: 'loginLayout',
		waitOn: function(){ return subs.subscribe('adminRoleExists')},
		data: function(){ return Meteor.users.findOne()}
	});
});