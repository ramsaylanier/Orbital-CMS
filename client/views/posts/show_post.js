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
		if (!$(event.target).hasClass('post-content')){

			if (event.target.innerHTML == "<br>"){
				$('*').removeClass('is-empty');

				$(event.target).addClass('is-empty');

				$('.insert-content-menu').removeClass('off-page');
				$('.insert-content-menu').css({
					"top": event.target.offsetTop
				})
			} else {
				$('.insert-content-menu').addClass('off-page');
			}
	
		}
	},
	'click .post-section-inner': function(event){
		console.log('click');
	},
	'keydown .post-section': function(event){
		$('.insert-content-btn').addClass('off-page');

		if ($(event.target).children().length > 1)
			$(event.target).parent().removeClass('empty-section');

	    if (event.keyCode === 13) {
	    	if ($(event.target).parent().hasClass('code-section')){
	    		document.execCommand('insertHTML', false, '<code><br></code>');
	    	} else {
				document.execCommand('insertHTML', false, '<p><br></p>');
			}

		    // prevent the default behaviour of return key pressed
		    return false;
	    }
	},
	'click .save-post-btn': function(e, template){
		e.preventDefault();

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
		$('.insert-content-menu').toggleClass('is-active');
	},

	'click .add-hr-icon': function(event){
		var parentPostSection = $('.is-empty').parent('.post-section-inner').parent('.post-section');
		var hrSection = '<section class="post-section hr-section" contenteditable="false"><div class="post-section-inner" contenteditable="true"><hr></div></section>';
		var emptySection = '<section class="post-section newest-section empty-section" contenteditable="false"><div class="post-section-inner" contenteditable="true"><p><br></p></div></section>';

		checkForEmpty(parentPostSection, hrSection, emptySection);
	},
	'click .add-code-icon': function(event){
		var parentPostSection = $('.is-empty').parent('.post-section-inner').parent('.post-section');
		var codeSection = '<section class="post-section code-section" contenteditable="false"><div class="post-section-inner" contenteditable="true"><code><br></code></div></section>';
		var emptySection = '<section class="post-section newest-section empty-section" contenteditable="false"><div class="post-section-inner" contenteditable="true"><p><br></p></div></section>';
		
		checkForEmpty(parentPostSection, codeSection, emptySection);
	}
})

function checkForEmpty(parentSection, newSection, emptySection){
	$('.insert-content-menu').toggleClass('is-active');
	parentSection.removeClass('newest-section');
	if (parentSection.text().length == 0){
		parentSection.html(newSection);
		parentSection.after(emptySection);
	}
	else {
		parentSection.after(newSection + emptySection);
	}

	$('.is-empty').remove();
}
