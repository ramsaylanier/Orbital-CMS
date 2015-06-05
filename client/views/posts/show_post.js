Template.showPost.rendered = function(){
	$('.post-container').addClass('off-page');
	var $item = $(this.find('.post-container'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.showPost.helpers({
	editMode: function(){
		return Session.get('editMode');
	},
	pageTemplate: function(){
		var templateName = Pages.findOne({_id: this._id}).pageTemplate.replace(/ /g, '_');
		return Template[templateName];
	}
});

Template.showPost.events({
	'click .save-post-btn': function(e, template){
		e.preventDefault();
		console.log(e);

		var updatedPost = {
			title: $('.post-title').html(),
			content: $('.post-content').html()
		},
		
		postId = template.data._id;

		Meteor.call('updatePost', postId, updatedPost, function(error, id){
			if (error){
				throwError(error.reason, 'error')
			} else {
				Session.set('editMode', false);
				throwError('Post updated.', 'success');
			}
		})
	},
	'click .delete-post-btn': function(e, template){

		var confirm = window.confirm('Are you sure you want to delete this post?');

		if (confirm === true){
			var postId = template.data._id;

			Meteor.call('deletePost', postId, function(error, id){
				if (error){
					throwError(error.reason, 'error')
				} else {
					Session.set('editMode', false);
					Router.go('/');
				}
			})
		}
	},
})