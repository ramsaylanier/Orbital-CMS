UI.registerHelper('setTitle', function(title){
	if (title){
		document.title = title;
	} else {
		document.title = "Orbital CMS | Your Blank Canvas"
	}
});

UI.registerHelper('posts', function(){
	return Posts.find({},{sort: {submitted: -1}});
})

Template.layout.events({
	'click .admin-controls-btn': function(e){
		e.preventDefault();

		$('.container').toggleClass('admin-controls');
		$('.admin-header').toggleClass('shown');
		$('.admin-controls-btn').toggleClass('admin-active');
	},
	'click .close-modal-btn': function(e){
		e.preventDefault();
		$('.container').removeClass('scaled-back');
		$('.modal').addClass('off-page');
		$('.admin-header').addClass('shown');
		$('.admin-controls-btn').removeClass('off-page').addClass('admin-active');
	}
})

