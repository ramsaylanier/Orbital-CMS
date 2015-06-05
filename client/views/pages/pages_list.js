Template.pagesList.onCreated(function(){
	console.log('pageListCreated');
	var instance = this;

	instance.autorun(function(){
		var subscription = instance.subscribe('pageList');
	})

	instance.pages = function(){
		return Pages.find({}, {fields: {title: 1, slug: 1, pageTemplate: 1}});
	}

})

Template.pagesList.helpers({
	pages: function(){
		return Template.instance().pages();
	}
})


Template.pageRow.events({
	'click .edit-page-btn': function(){

		$('.admin-controls-btn').removeClass('off-page');
		$('.container').removeClass('admin-controls scaled-back');
		Session.set('editMode',true);
	}
})