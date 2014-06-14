Template.adminHeader.events({
	'click .add-page-btn': function(e, template){
		e.preventDefault();

		$('.add-post-container').remove();

		if ($('.add-page-container').length == 0){
			UI.insert(UI.render(Template.addPage), $('.container').get(0));
		}
	},

	'click .add-post-btn': function(e){
		e.preventDefault();
		$('.add-page-container').remove();

		if ($('.add-post-container').length == 0){
			UI.insert(UI.render(Template.addPost), $('.container').get(0));
		}
	}
});