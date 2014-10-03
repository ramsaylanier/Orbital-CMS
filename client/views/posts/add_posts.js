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
	'submit form': function(e){
		e.preventDefault();

		$('#body-output').val($('.output').html());

		var post ={
			title: $(e.target).find('[name=title]').val(),
			slug: Session.get('slug'),
			content: $(e.target).find('[name=editor]').val()
		}

		Meteor.call('addPost', post, function(error, id) {
			if (error){
				throwError(error.reason, 'error');
			} else {
				$('.container').removeClass('scaled-back admin-controls');
				$('.admin-controls-btn').removeClass('off-page');
				$('.add-post-modal').addClass('off-page');
				Router.go('/posts/' + post.slug);
			}
		});
	},
	'keyup #title':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase()));
	},
	'change #slug':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase()));
	}
	// 'blur, keyup, paste, copy, cut, mouseup .text-view': function(e){
	// 	if ($('.text-view').hasClass('visible')){
	// 		$('.markup-view').text($('.text-view').html());
	// 		$('#body-output').val($('.output').html());
	// 	}
	// }
})

Template.addPost.helpers({
	value: function(){
		return Session.get('slug');
	},
	url: function(){
		return Meteor.absoluteUrl();
	}
})