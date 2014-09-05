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
	$('.insert-content-btn').addClass('off-page');
}


Template.editPost.events({
	'mouseup .post-content': function(event){
		var editor = $('.sidebar-editor');
		var selection = getSelected();

		if (selection.type == 'Range'){
			targetY = selection.anchorNode.parentNode.offsetTop - editor.outerHeight();
			targetY = (targetY > 0) ? targetY : 0;
			targetX = event.pageX - editor.outerWidth() / 2;
			editor.css({
				"top": targetY,
				"left": targetX
			});
			editor.addClass('shown');
		} else {
			editor.removeClass('shown');
		}
	},
	'click .post-content': function(event){
		if (!($(event.target).hasClass('post-content'))){
			$('.insert-content-btn').removeClass('off-page');
			$('.insert-content-btn').css({
				"top": event.target.offsetTop
			})
		}
	},
	'keydown .post-content': function(event){
		$('.insert-content-btn').addClass('off-page');
	},
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
				Session.set('editMode', false);
				throwError('Post updated.', 'success');
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
	},
	'paste .post-content': function(e){
		e.preventDefault();
	    var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
	    document.execCommand('insertText', false, text);
	}
})

function getSelected() {
	if(window.getSelection)
		return window.getSelection(); 
	else if(document.getSelection)
		return document.getSelection(); 
	else {
		var selection = document.selection && document.selection.createRange();
        if(selection.text) { 
        	return selection.text; 
        }
        
        return false;
    }
        return false;
}

Template.insertContentButton.events({
	'click .insert-content-btn': function(event){
		event.preventDefault();
	}
})
