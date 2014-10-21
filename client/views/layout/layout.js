UI.registerHelper('setTitle', function(title){
	if (title){
		document.title = title;
	} else {
		document.title = "Orbital CMS | Your Blank Canvas"
	}
});

UI.registerHelper('pages', function(){
	return Pages.find();
})

UI.registerHelper('posts', function(){
	return Posts.find({},{sort: {submitted: -1}});
})

UI.registerHelper('publishedDate', function(date){
	return moment().calendar(date);
})

UI.registerHelper('images', function(){
	return Media.find();
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

		if ($('.container').hasClass('scaled-back')){
			$('.admin-header').addClass('shown');
			$('.admin-controls-btn').removeClass('off-page').addClass('admin-active');
			$('.container').removeClass('scaled-back');
		}

		$('.modal').addClass('off-page');

	},
	'click .set-header-image-btn': function(e){
		e.preventDefault();
		var images = Media.find();
		Blaze.renderWithData(Template.setFeaturedImage, images, $('.container').get(0));
	},
	'click .block': function(e){
		$('.block-tools').remove();
		if (Session.get('editMode') == true){
			Blaze.render(Template.blockTools, $(e.target).get(0));
		}
	}
})

