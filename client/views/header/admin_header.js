Template.adminHeader.events({
	'click .add-page-btn': function(e, template){
		e.preventDefault();

		$('.add-post-modal').remove();

		if ($('.add-page-modal').length == 0){
			UI.insert(UI.render(Template.addPage), $('.container').get(0));
		}
	},

	'click .add-post-btn': function(e){
		e.preventDefault();
		
		$('.add-page-modal').remove();

		if ($('.add-post-container').length == 0){
			UI.insert(UI.render(Template.addPost), $('.container').get(0));
		}
	}
});