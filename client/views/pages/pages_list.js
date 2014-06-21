Template.pagesList.rendered = function(){
	var $item = $(this.find('.modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}


Template.pageRow.events({
	'click .edit-page-btn': function(){
		$('.modal').addClass('off-page');
		$('.admin-controls-btn').removeClass('off-page');
		$('.container').removeClass('admin-controls scaled-back');
		Session.set('editMode',true);
	}
})