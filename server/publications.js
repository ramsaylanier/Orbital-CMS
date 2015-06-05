Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})

Meteor.publish('pages', function(){
	return Pages.find();
})

Meteor.publish('pageTitles', function(){
	return Pages.find({}, {fields: {title: 1, slug: 1}});
})

Meteor.publish('pageList', function(){
	return Pages.find({}, {fields: {title: 1, slug: 1, pageTemplate: 1}});
})

Meteor.publish('singlePage', function(slug){
	return Pages.find({slug: slug})
})

Meteor.publish('postList', function(){
	return Posts.find();
})

Meteor.publish('settings', function(){
	return Settings.find();
})

Meteor.publish('media', function(){
	return Media.find();
})

Meteor.publish('adminRoleExists', function(){
	return Meteor.users.find({roles: 'admin'},{fields: {'roles': 1}});
})

Meteor.publish('menus', function(){
	return Menus.find();
})

Meteor.publish('categories', function(){
	return Categories.find();
})

Meteor.publish('blocks', function(){
	return Blocks.find();
})