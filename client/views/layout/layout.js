UI.registerHelper('setTitle', function(title){
	if (title){
		document.title = title;
	} else {
		document.title = "Orbital CMS | Your Blank Canvas"
	}
});

Template.layout.events({
	'click .admin-controls-btn': function(e){
		e.preventDefault();

		$('.container').toggleClass('admin-controls');
		$('.admin-header').toggleClass('shown');
		$('.admin-controls-btn').toggleClass('admin-active');
	}
})