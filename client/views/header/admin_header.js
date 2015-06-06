
Template.adminHeader.events({
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
	}
});