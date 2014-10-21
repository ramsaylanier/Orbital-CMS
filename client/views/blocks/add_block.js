Template.addBlock.rendered = function(){
	var $item = $(this.find('.add-block-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

// Template.addBlock.helpers({
// 	getTemplates: function(){
// 		var templates = _.filter(_.keys(Template), function(name){return name.match('block_template');});
// 		return _.map(templates, function(name){ return name.replace(/_/g, ' ').substr(14)});
// 	}
// })

Template.addBlock.events({
	'submit form': function(e){
		e.preventDefault();

		var blockName = $('#block-name').val();
		var blockTemplate = $('#template-type').val();

		Meteor.call('addBlock', blockName, blockTemplate, function(error, id){
			if(error)
				throwError(error.reason, 'error');
			else
				throwError('Block added!', 'success');
		})
	}
})