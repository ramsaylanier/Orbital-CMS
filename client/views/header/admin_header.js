
Template.adminHeader.events({
	'click a': function(e){
		$('.modal').remove();
		$('.container').addClass('scaled-back');
		$('.admin-header').removeClass('shown');
		$('.admin-controls-btn').removeClass('admin-active').addClass('off-page');
	},
	'click .view-pages-btn': function(e, template){
		e.preventDefault();

		if ($('.add-page-modal').length == 0){
			var data = Pages.find();
			Blaze.renderWithData(Template.pagesList, data, $('.container').get(0));
		}
	},
	'click .add-page-btn': function(e, template){
		e.preventDefault();

		if ($('.add-page-modal').length == 0){
			Blaze.render(Template.addPage, $('.container').get(0));
		}
	},
	'click .view-posts-btn': function(e, template){
		e.preventDefault();

		if ($('.add-post-modal').length == 0){
			var data = Posts.find();
			Blaze.renderWithData(Template.postsList, data, $('.container').get(0));
		}
	},
	'click .add-post-btn': function(e){
		e.preventDefault();

		if ($('.add-post-container').length == 0){
			Blaze.render(Template.addPost, $('.container').get(0));
		}
	},
	'click .add-media-btn': function(e){
		e.preventDefault();

		if ($('.add-media-modal').length == 0){
			var media = Media.find();
			Blaze.renderWithData(Template.addMedia, media, $('.container').get(0));
		}
	},
	'click .settings-btn': function(e){
		e.preventDefault();

		if ($('.settings-modal').length == 0){
			var settings = Settings.findOne();
			Blaze.renderWithData(Template.settings, settings, $('.container').get(0));
		}
	},
	'click .menu-settings-btn': function(e){
		e.preventDefault();

		if ($('.settings-modal').length == 0){
			var settings = Settings.findOne();
			Blaze.renderWithData(Template.menuSettings, settings, $('.container').get(0));
		}
	},
	'click .view-blocks-btn': function(e){
		e.preventDefault();

		if ($('.view-blocks-container').length == 0){
			var data = Blocks.find();
			Blaze.renderWithData(Template.viewBlocks, data, $('.container').get(0));
		}
	},
	'click .add-block-btn': function(e){
		e.preventDefault();

		if ($('.add-block-container').length == 0){
			Blaze.render(Template.addBlock, $('.container').get(0));
		}
	}
});