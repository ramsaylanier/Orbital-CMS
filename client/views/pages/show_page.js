Template.showPage.rendered = function(){
	Session.set('editMode', false);
	$('.page-container').addClass('off-page');
	var $item = $(this.find('.page-container'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.showPage.events({
	'click .edit-page-btn':function(e){
		e.preventDefault();
		currentMode = Session.get('editMode');

		if (currentMode == true){
			Session.set('editMode', false)
		} else {
			Session.set('editMode', true);
		}
	}
})

Template.showPage.helpers({
	editMode: function(){
		return Session.get('editMode');
	},
	pageTemplate: function(){
		var templateName = Pages.findOne({_id: this._id}).pageTemplate.replace(/ /g, '_');
		return Template[templateName];
	}
});


Template.editPage.rendered = function(){
	$('.title').focus();
}


Template.editPage.events({
	'click .save-page-btn': function(e, template){
		e.preventDefault();

		var pageTitle = '',
			pageId = template.data._id;

		if ($('.page-title').length){
			pageTitle = $('.page-title').text();
		}
		else 
			pageTitle = Pages.findOne(pageId).title;

		var updatedPage = {
			title: pageTitle,
			content: $('.page-content').html(),
			pageTemplate: $('#template-type').val().replace(/_/g, ' '),
			showTitle: $('#show-title').is(':checked')
		},
			pageId = template.data._id;

		Meteor.call('updatePage', pageId, updatedPage, function(error, id){
			if (error){
				throwError(error.reason, 'error')
			} else {
				throwError('Page updated.', 'success')
			}
		})
	},
	'click .delete-page-btn': function(e, template){
		var pageId = template.data._id;
		var settings = Settings.findOne();

		Meteor.call('deletePage', pageId, function(error, id){
			if (error){
				Blaze.renderWithData(Template.settings, settings, $('.container').get(0));
				throwError(error.reason, 'error');
			} else {
				Router.go('/');
				Session.set('editMode', false);
			}
		})
	},
	'click .page-settings-btn': function(e){
		$(e.target).toggleClass('active');
		$('.page-settings').toggleClass('is-active');
	},
	'click .insert-blocks-btn': function(){
		var blocks = Blocks.find();
		if ($('.insert-blocks-modal').length){
			$('.insert-blocks-modal').removeClass('off-page');
		} else {
			Blaze.renderWithData(Template.insertBlocks, blocks, $('.container').get(0));
		}
	}
})

Template.editPage.helpers({
	getTemplates: function(){
		var templates = _.filter(_.keys(Template), function(name){return name.match('template');});
		return _.map(templates, function(name){ return name.replace(/_/g, ' ');});
	},
	pageTemplate: function(){
		var templateName = Pages.findOne({_id: this._id}).pageTemplate.replace(/ /g, '_');
		return Template[templateName];
	},
	isSelected: function(currentTemplate){
		if (this.toString() == currentTemplate){
			return "selected";
		}
	},
	isChecked: function(currentSetting){
		if (currentSetting)
			return "checked"
	}
})

Template.blocksMenu.helpers({
	'blockTypes': function(){
		var blockTypes = _.filter(_.keys(Template), function(name){return name.match('block_template')});
		console.log(blockTypes);
	}
})