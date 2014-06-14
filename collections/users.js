Meteor.methods({
	user: function(userAttributes){

		if (!userAttributes.username)
			throw new Meteor.Error(422, 'Please Enter a User Name')

		if (!userAttributes.email){
			throw new Meteor.Error(422, 'Please Enter an Email Address')
		}

		if (!userAttributes.password){
			throw new Meteor.Error(422, 'Please Enter a Password')
		}

		var userId = Accounts.createUser({
			email: userAttributes.email,
			password: userAttributes.password, 
			username: userAttributes.username
		});
		
		Roles.addUsersToRoles(userId, ['admin']);
		return userId;
	}
});