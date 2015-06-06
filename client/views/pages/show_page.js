Template.showPage.onCreated(function(){
	var instance = this;

	instance.autorun(function(){
		instance.slug = FlowRouter.getParam('slug') || Pages.findOne(Settings.findOne().landingPage).slug;
		var subscription = instance.subscribe('singlePage', instance.slug);

		if (subscription.ready()){
			Session.set('pageId', instance.page._id);
		}
	})

	instance.page = function(){
		return Pages.findOne({slug: instance.slug});
	}
})

Template.showPage.onRendered(function(){
	var page = $('.page-container');
	AnimateItem(page, DefaultPageAnimateIn);
});

Template.showPage.helpers({
	pageTemplate: function(){
		var templateName = Template.instance().page().pageTemplate.replace(/ /g, '_');
		return templateName;
	},
	page: function(){
		return Template.instance().page();
	}
});

Template.pageSettings.onRendered(function(){
	var instance = this;
	var item = instance.$('.page-settings');

	Meteor.defer(function(){
		item.velocity({
			bottom: 0
		}, {duration: 500, easing:Animations.defaultEasing})
	})
})

Template.pageSettings.events({
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
			content: $('.content-block').html(),
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
	'click .delete-page-btn': function(e){
		var pageId = Template.instance().data._id;

		Meteor.call('deletePage', pageId, function(error, id){
			if (error){
				throwError(error.reason, 'error');

				if (error.error === 100){
					FlowRouter.go('/admin/settings');
				}
			} else {
				FlowRouter.go('/');
			}
		})
	},
	'click .page-settings-btn': function(e){
		$(e.target).toggleClass('active');
		$('.page-settings').toggleClass('is-active');
	},
	'click .expand-page-settings-btn': function(){
		$('.page-settings').toggleClass('expanded');
	}
})

Template.pageSettings.helpers({
	editMode: function(){
		return Session.get('editMode');
	},
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