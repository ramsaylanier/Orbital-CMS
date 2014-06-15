Template.addPage.created = function(){
	var val = $('#title').val();
	if (val == undefined){
		val = "";
	}
	console.log(val);
	Session.set('slug', encodeURI(val).toLowerCase());
}


Template.addPage.destroyed = function(){
	Session.set('slug');
}

Template.addPage.rendered = function(){
	var $item = $(this.find('.add-page-container'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.addPage.events({
	'submit form': function(e){
		e.preventDefault();

		var page ={
			title: $(e.target).find('[name=title]').val(),
			slug: Session.get('slug'),
			hideTitle: checkOptions($('#show-title')),
			pageTemplate: $(e.target).find('[name=template-type]').val().replace(/_/g, ' '),
			content: $(e.target).find('[name=editor]').val()
		}

		Meteor.call('page', page, function(error, id) {
			if (error){
				//call custom throwError function
				throwError(error.reason, 'error');
			} else {
				Router.go('/admin/pages', page);
			}
		});
	},
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
	}
})

Template.addPage.helpers({
	value: function(){
		return Session.get('slug');
	},
	url: function(){
		return Meteor.absoluteUrl();
	},
})