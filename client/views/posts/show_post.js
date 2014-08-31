Template.showPost.rendered = function(){
	Session.set('editMode', false);
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
	'click .edit-post-btn':function(e){
		e.preventDefault();
		currentMode = Session.get('editMode');

		if (currentMode == true){
			Session.set('editMode', false)
		} else {
			Session.set('editMode', true);
		}
	}
})

Template.editPost.rendered = function(){
	$('.title').focus();
}


Template.editPost.events({
	'click .save-post-btn': function(e, template){
		e.preventDefault();

		console.log($('#template-type').val());

		var updatedPost = {
			title: $('.post-title').html(),
			content: $('.post-content').html()
		},
			postId = template.data._id;

		Meteor.call('updatePost', postId, updatedPost, function(error, id){
			if (error){
				throwError(error.reason, 'error')
			} else {
				throwError('Post updated.', 'success')
			}
		})
	},
	'click .delete-post-btn': function(e, template){
		var postId = template.data._id;

		Meteor.call('deletePost', postId, function(error, id){
			if (error){
				throwError(error.reason, 'error')
			} else {
				Session.set('editMode', false);
				Router.go('/');
			}
		})
	},
	'click .featured-image-btn': function(e){
		e.preventDefault();
		data = Media.find();
		postId = this._id;
	    UI.insert(UI.renderWithData(Template.setFeaturedImage, data, parent), $('.container').get(0));
	}
})