UI.registerHelper('setTitle', function(title){
	if (title){
		document.title = title;
	} else {
		document.title = "Orbital CMS | Your Blank Canvas"
	}
});

UI.registerHelper('adminActive', function(){
	return Session.get('adminActive');
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

UI.registerHelper('pageBlocks', function(){
	return Blocks.find({blockPages: this._id});
})

UI.registerHelper('editable', function(){
	return Session.get('editMode');
})

UI.registerHelper('blockTemplateView', function(){
	var templateName = "block" + this.blockTemplate.replace(/ /g, '_');
	return Template[templateName];
})

Template.layout.onCreated(function(){
	var instance = this;

	instance.autorun(function(){
		var pageListSub = instance.subscribe('pageList');
		var settingsSub = instance.subscribe('settings');
	})
})

Template.layout.events({
	'click .admin-controls-btn': function(e){
		e.preventDefault();
		var adminActive = Session.get('adminActive');

		if (adminActive){
			currentSlug = Session.get('currentSlug') || '/';
			Session.set('adminActive', false);
			FlowRouter.go(currentSlug);
		} else {
			currentSlug = FlowRouter.getParam('slug') || '';
			Session.set('currentSlug', '/' + currentSlug);
			FlowRouter.go('/admin');
		}
	},
	'click .set-header-image-btn': function(e){
		e.preventDefault();
		var images = Media.find();
		Blaze.renderWithData(Template.setFeaturedImage, images, $('.container').get(0));
	},
	'mouseenter .block': function(e){
		if ($('.application').hasClass('edit-mode')){
			var blockId = Blocks.findOne(this._id)._id;
			Blaze.renderWithData(Template.blockTools, blockId, $(e.target).get(0));
		}
	},
	'mouseleave .block': function(e){
		if ($('.application').hasClass('edit-mode')){
			$('.block-tools').remove();
		}
	},
	'click .post-link': function(e, template){
		e.preventDefault();

		var slug = $(e.target).attr('href');
		var posts = $('.post');

		for (var i = 0; i <= posts.length; i++){
			delayRemoval(i, $(posts[i]));
		} 

		function delayRemoval(i, post){
			Meteor.setTimeout(function(){
				post.addClass('off-page');
			}, (i+1) * 50);
		}

		Meteor.setTimeout(function(){
			FlowRouter.go(slug);
		}, posts.length * 150);
	}
})

