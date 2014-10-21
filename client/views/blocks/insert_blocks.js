Template.insertBlocks.rendered = function(){
	var $item = $(this.find('.insert-blocks-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}


Template.insertBlocks.helpers({
	'blockTemplates': function(){
		var templates = _.filter(_.keys(Template), function(name){return name.match('block_template');});
		templates = _.map(templates, function(name){ return name.replace(/_/g, ' ').substr(14)});
		return templates;
	}
})

Template.insertBlocks.events({
	'click .block-option': function(e){
		var data = $(e.target).data('block-template');
		data = data.replace(/\s/gi, '_');
		var blockTemplate = _.filter(_.keys(Template), function(name){ console.log(name); return name.match('block_template' + data);});
		Blaze.renderWithData(Template.addBlock, blockTemplate, $('.modal-container').get(0));
	},
	'click .save-block-option': function(e){
		var data = $(e.target).data('block-template');
		data = data.replace(/\s/gi, '_');
		var blockTemplate = _.filter(_.keys(Template), function(name){ console.log(name); return name.match('block_template' + data);});
		$('.modal').remove();

		Blaze.render(Template[blockTemplate], $('.page-content').get(0));
	}
})