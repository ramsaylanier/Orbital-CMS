Settings = new Meteor.Collection("settings");

Meteor.methods({
	settings: function(settingId, settings){
		var loggedInUser = Meteor.user();

		if (Roles.userIsInRole(loggedInUser, ['admin'])){

			var settings = _.extend(_.pick(settings, 'landingPage', 'siteTitle', 'headerImage'), {
				submitted: new Date().getTime()
			});

			var settingsId = Settings.upsert(settingId, settings);

			return settingsId;
		}
	}
})