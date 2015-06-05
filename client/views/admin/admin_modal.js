Template.adminModal.onRendered(function(){
	console.log(this);
	var modal = $('.modal');
	AnimateItem(modal, DefaultModalIn);
})

Template.adminModal.helpers({
	adminTemplate: function(){
		console.log(this);
		return this.adminTemplate
	}
})

Template.adminModal.events({
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