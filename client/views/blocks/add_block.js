Template.addBlock.onRendered(function(){
	var instance = this;

	instance.autorun(function(){
		var blockSub = instance.subscribe('blocks');
	})
});

Template.addNewBlock.helpers({
	'pageSelected': function(){
		if (this._id == Session.get('pageId'))
			return 'selected'
	},
	'blockTemplates': function(){
		var templates = _.filter(_.keys(Template), function(name){return name.match('block_');});
		templates = _.map(templates, function(name){ return name.replace(/_/g, ' ').substr(5)});
		return templates;
	}

})

Template.addNewBlock.events({
	'submit form': function(e){
		e.preventDefault();

		Session.set('pageId', null);

		var blockPages = [];

		$(".block-page-checkbox:checked").each(function () {
	        blockPages.push($(this).val());
	    });

		var blockName = $('#block-name').val();
		var blockTemplate = $('#block-template-type').val();

		console.log(blockPages);

		Meteor.call('addBlock', blockName, blockTemplate, blockPages, function(error, id){
			if(error)
				throwError(error.reason, 'error');
			else{				
				throwError('Block added!', 'success');
			}
		})
	}
})

Template.insertBlockRow.events({
	'click .insert-block-btn': function(e){
		var pageId = Session.get('pageId');

		Meteor.call('insertBlock', this._id, pageId, function(error){
			if(error)
				throwError(error.reason, 'error');
			else{
				$('.modal').addClass('off-page');

				Meteor.setTimeout(function(){
					$('.modal').remove();
				}, 500);
				
				throwError('Block added!', 'success');
			}
		});
	}
});