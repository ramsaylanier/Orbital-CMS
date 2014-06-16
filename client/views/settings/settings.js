Template.settings.events({
	'click .close-modal-btn': function(e){
		e.preventDefault();

		$('.modal').addClass('off-page');
		$('.container').removeClass('scaled-back');	
	},
	'submit form': function(e){
		e.preventDefault();

		var currentSettingsId = "";

		if (Settings.findOne()){
			currentSettingsId = Settings.findOne()._id;
		}

		var settings = {
			landingPage: $(e.target).find("[name=landing-page]").val()
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
	}
})

Template.settings.rendered = function(){
	var $item = $(this.find('.settings-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}