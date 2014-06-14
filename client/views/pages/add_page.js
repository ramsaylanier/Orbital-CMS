Template.addPage.destroyed = function(){
	console.log('add page template destroyed')
}

Template.addPage.rendered = function(){
	var $item = $(this.find('.add-page-container'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}