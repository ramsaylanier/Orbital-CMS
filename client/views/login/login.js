Template.login.events({
	'submit #login-form': function(element, template){
		element.preventDefault();

		var username = template.find('#username-field').value,
			password = template.find('#password-field').value;


		Meteor.loginWithPassword(username, password, function(error){
			if (error){
				throwError(error.reason, 'error')
			} else {
				Router.go('/');
			}
		});

		return false;

	},
	'submit #register-form': function(element, template){
		element.preventDefault();
		var user = {
			username: template.find('#account-username').value,
			password: template.find('#account-password').value,
			passwordVerify: template.find('#account-password-verify').value,
			email: template.find("#account-email").value,
			roles: 'admin'
		};

		var trimInput = function(val) {
		    return val.replace(/^\s*|\s*$/g, "");
		}

		user.email = trimInput(user.email);

		if (user.password != user.passwordVerify){
			throwError('passwords dont match', 'error');
		}

		Meteor.call('user', user, function(error, id){
			if (error){
				throwError(error.reason, 'error')
			} else {
				throwError('User Added!', 'success')
			}
		});
	}
})

Template.login.helpers({
	adminExists: function(users){
		console.log('hey');
		console.log(users);

		if (users){
			if (users.roles == 'admin'){
				return true;
			}
		}
	}
})