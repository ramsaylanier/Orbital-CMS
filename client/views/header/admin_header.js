Template.adminHeader.events({
	'click .add-page-btn': function(e, template){
		e.preventDefault();

		$('.modal').remove();
		$('.container').addClass('scaled-back');

		if ($('.add-page-modal').length == 0){
			UI.insert(UI.render(Template.addPage), $('.container').get(0));
		}
	},

	'click .add-post-btn': function(e){
		e.preventDefault();

		$('.modal').remove();
		$('.container').addClass('scaled-back');

		if ($('.add-post-container').length == 0){
			UI.insert(UI.render(Template.addPost), $('.container').get(0));
		}
	},

	'click .add-media-btn': function(e){
		e.preventDefault();

		$('.modal').remove();
		$('.container').addClass('scaled-back');

		if ($('.add-media-modal').length == 0){
			var media = Media.find();
			UI.insert(UI.renderWithData(Template.addMedia, media), $('.container').get(0));
		}
	},

	'click .settings-btn': function(e){
		e.preventDefault();

		$('.modal').remove();
		$('.container').addClass('scaled-back');

		if ($('.settings-modal').length == 0){
			var settings = Settings.findOne();
			UI.insert(UI.renderWithData(Template.settings, settings), $('.container').get(0));
		}
	},

	'click a': function(e){
		console.log('yay');
		$('.admin-header').removeClass('shown');
		$('.admin-controls-btn').removeClass('admin-active').addClass('off-page');
	}
});