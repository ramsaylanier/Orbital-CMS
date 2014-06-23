Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})

Meteor.publish('pages', function(){
	return Pages.find();
})

Meteor.publish('posts', function(){
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