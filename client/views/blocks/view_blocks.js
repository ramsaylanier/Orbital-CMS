Template.viewBlocks.rendered = function(){
	var $item = $(this.find('.view-blocks-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}