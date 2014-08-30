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

		var updatedPage = {
			title: $('.page-title').html(),
			content: $('.page-content').html(),
			pageTemplate: $('#template-type').val().replace(/_/g, ' ')
		},
			pageId = template.data._id;

		Meteor.call('updatePage', pageId, updatedPage, function(error, id){
			if (error){
				throwError(error.reason, 'error')
			} else {
				throwError('Page updated.', 'success')
			}
		})
	},
	'click .delete-page-btn': function(e, template){
		var pageId = template.data._id;

		Meteor.call('deletePage', pageId, function(error, id){
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