Template.showPage.rendered = function(){
	var $item = $(this.find('.page-container'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}