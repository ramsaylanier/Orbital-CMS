Template.menuSettings.rendered = function(){
	var $item = $(this.find('.settings-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}