Template.settings.events({
	'submit form': function(e){
		e.preventDefault();

		var currentSettingsId = "";

		if (Settings.findOne()){
			currentSettingsId = Settings.findOne()._id;
		}

		var landingPageName = $(e.target).find("[name=landing-page]").val();
		var page = Pages.findOne({title: landingPageName});

		var settings = {
			landingPage: page._id,
			siteTitle: $(e.target).find("[name=site-title]").val(),
			headerImage: $('.settings-header-image').attr('src')
		}

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
	},
	isLandingPage: function(){
		if (this._id == Settings.findOne().landingPage)
			return 'selected';
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