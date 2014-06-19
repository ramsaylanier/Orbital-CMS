Template.addMedia.rendered = function(){
	var $item = $(this.find('.add-media-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.addMedia.events({
	// 'submit form': function(e){
	// 	e.preventDefault();

	// 	var page ={
	// 		title: $(e.target).find('[name=title]').val(),
	// 		slug: Session.get('slug'),
	// 		content: $(e.target).find('[name=editor]').val()
	// 	}

	// 	Meteor.call('page', page, function(error, id) {
	// 		if (error){
	// 			throwError(error.reason, 'error');
	// 		} else {
	// 			$('.container').removeClass('scaled-back admin-controls');
	// 			$('.admin-controls-btn').removeClass('off-page');
	// 			$('.add-page-modal').addClass('off-page');
	// 			Router.go('/' + page.slug);
	// 		}
	// 	});
	// },
	'click .close-modal-btn': function(e){
		e.preventDefault();
		$('.container').removeClass('scaled-back');
		$('.modal').addClass('off-page');
		$('.admin-header').addClass('shown');
		$('.admin-controls-btn').removeClass('off-page').addClass('admin-active');
	}
})

Template.addMedia.helpers({
	
})