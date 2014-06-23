Media.allow({
  insert: function(userId){
  	return (Roles.userIsInRole(userId, ['admin']));
  },
  update: function(userId){
	return (Roles.userIsInRole(userId, ['admin']));
  },
  remove: function(userId){
	return (Roles.userIsInRole(userId, ['admin']));
  },
  download: function(userId){
  	return (Roles.userIsInRole(userId, ['admin']));
  }
})

