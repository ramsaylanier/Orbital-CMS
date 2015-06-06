Template.modal.onRendered(function(){
	var modal = $('.modal');
	AnimateItem(modal, DefaultModalIn);
})

Template.modal.helpers({
	adminTemplate: function(){
		return this.type === 'admin';
	},
	slug: function(){
		return FlowRouter.getParam('slug');
	}
})

Template.modal.events({
	'click .close-modal-trigger':function(e){
		AnimateItem($('.modal'), DefaultModalOut);

		var url = $(e.target).attr('href');

		if (url !== 'admin'){
			Session.set('adminActive', false);

		}
		FlowRouter.go(url);

		Meteor.setTimeout(function(){
			$('.modal').remove();
		}, 300)
	}
})