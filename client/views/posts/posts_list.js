Template.postsList.rendered = function(){
	var $item = $(this.find('.modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.postsList.events({
	'click .edit-post-btn': function(){
		$('.modal').addClass('off-page');
		$('.admin-controls-btn').removeClass('off-page');
		$('.container').removeClass('admin-controls scaled-back');
		Session.set('editMode',true);
	},
	'click .delete-post-btn': function(e, template){
		e.preventDefault();

		Meteor.call('deletePost', this._id, function(error, id){
			if (error){
				throwError(error.reason, 'error')
			}
		})
	}
})