Template.settings.events({
	'submit form': function(e){
		e.preventDefault();

		var currentSettingsId = "";

		if (Settings.findOne()){
			currentSettingsId = Settings.findOne()._id;
		}

		var settings = {
			landingPage: $(e.target).find("[name=landing-page]").val(),
			siteTitle: $(e.target).find("[name=site-title]").val(),
			headerImage: $('.settings-header-image').attr('src')
		}

		console.log(settings.headerImage);

		Meteor.call('settings', currentSettingsId, settings, function(error, id){
			if (error){
				throwError(error.reason, 'error');
			} else {
				throwError('Settings updated!', 'success')
			}
		})
	}
});

Template.settings.helpers({
	pages: function(){
		return Pages.find();
	},
	featuredImage: function(){
		if (Session.get('featuredImage')){
			return Session.get('featuredImage');
		} else 
			return this.headerImage;
	}
})

Template.settings.rendered = function(){
	var $item = $(this.find('.settings-modal'));
	Session.set('featuredImage', '');
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.settings.destroyed = function () {
	Session.set('featuredImage', '');
};