Template.addPost.created = function(){
	var val = $('#title').val();
	if (val == undefined){
		val = "";
	}
	
	Session.set('slug', encodeURI(val).toLowerCase());
}

Template.addPost.destroyed = function(){
	console.log('add post template destroyed');
	Session.set('slug');
}

Template.addPost.rendered = function(){
	var $item = $(this.find('.add-post-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.addPost.events({
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
	'keyup #title':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase()));
	},
	'change #slug':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase()));
	},
	'click .text-view-toggle': function(e){
		e.preventDefault();
		$('.markup-view').removeClass('visible');
		$('.text-view').addClass('visible');
	},
	'click .markup-view-toggle': function(e){
		e.preventDefault();
		$('.text-view').removeClass('visible');
		$('.markup-view').addClass('visible');
	},
	'blur, keyup, paste, copy, cut, mouseup .text-view': function(e){
		if ($('.text-view').hasClass('visible')){
			$('.markup-view').text($('.text-view').html());
			$('#body-output').val($('.output').html());
		}
	},
	'blur, keyup, paste, copy, cut, mouseup .markup-view': function(e){
		if ($('.markup-view').hasClass('visible')){
			$('.text-view').html($.parseHTML($('.markup-view').text()));
			$('#body-output').val($('.output').html());
		}
	},
	'click .close-modal-btn': function(e){
		e.preventDefault();
		$('.container').removeClass('scaled-back');
		$('.add-post-modal').addClass('off-page');
		$('.admin-header').addClass('shown');
		$('.admin-controls-btn').removeClass('off-page').addClass('admin-active');
	}
})

Template.addPost.helpers({
	value: function(){
		return Session.get('slug');
	},
	url: function(){
		return Meteor.absoluteUrl();
	},
})