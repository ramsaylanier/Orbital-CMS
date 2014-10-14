Template.addPage.created = function(){	
	Session.set('slug');
}


Template.addPage.destroyed = function(){
	Session.set('slug');
}

Template.addPage.rendered = function(){
	var $item = $(this.find('.add-page-modal'));
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
			content: $(e.target).find('[name=editor]').val(),
			pageTemplate: $('#template-type').val().replace(/_/g, ' ')
		}

		Meteor.call('page', page, function(error, id) {
			if (error){
				throwError(error.reason, 'error');
			} else {
				$('.container').removeClass('scaled-back admin-controls');
				$('.admin-controls-btn').removeClass('off-page');
				$('.add-page-modal').addClass('off-page');
				Router.go('/' + page.slug);
			}
		});
	},
	'keyup #title':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase() ) );
	},
	'keyup #slug':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase() ) );
	}
})

Template.addPage.helpers({
	value: function(){
		return Session.get('slug');
	},
	url: function(){
		return Meteor.absoluteUrl();
	},
	getTemplates: function(){
		var templates = _.filter(_.keys(Template), function(name){return name.match('template');});
		return _.map(templates, function(name){ return name.replace(/_/g, ' ')} );
	}
})