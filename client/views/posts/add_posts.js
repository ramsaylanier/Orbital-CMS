Template.addPost.destroyed = function(){
	console.log('add post template destroyed');
}

Template.addPost.rendered = function(){
	var $item = $(this.find('.add-post-container'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}