Template.showPage.rendered = function(){
	Session.set('editMode', false);
	$('.page-container').addClass('off-page');
	var $item = $(this.find('.page-container'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.showPage.events({
	'click .edit-page-btn':function(e){
		e.preventDefault();
		currentMode = Session.get('editMode');

		if (currentMode == true){
			Session.set('editMode', false)
		} else {
			Session.set('editMode', true);
		}
	}
})

Template.showPage.helpers({
	editMode: function(){
		return Session.get('editMode');
	}
});


Template.editPage.events({
	'submit form': function(e, template){
		e.preventDefault();

		var updatedPage = {
			title: $('.page-title').html(),
			content: $('.page-content').html()
		},
			pageId = template.data._id;

		Meteor.call('updatePage', pageId, updatedPage, function(error, id){
			if (error){
				throwError(error.reason, 'error')
			} else {
				throwError('Page updated.', 'success')
			}
		})
	}
})