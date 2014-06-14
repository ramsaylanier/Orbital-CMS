Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})

Meteor.publish('adminRoleExists', function(){
	return Meteor.users.find({roles: 'admin'},{fields: {'roles': 1}});
})