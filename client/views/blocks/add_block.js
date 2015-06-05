Template.addBlock.rendered = function(){
	var $item = $(this.find('.add-block-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}


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

		var blockName = $('#block-name').val();
		var blockTemplate = $('#block-template-type').val();
		var blockPage = Pages.findOne({ title: $('#block-page').val() })._id;

		Meteor.call('addBlock', blockName, blockTemplate, blockPage, function(error, id){
			if(error)
				throwError(error.reason, 'error');
			else{
				$('.modal').addClass('off-page');

				Meteor.setTimeout(function(){
					$('.modal').remove();
				}, 500);
				
				throwError('Block added!', 'success');
			}
		})
	}
})

Template.insertExistingBlock.helpers({
	'blocks': function(){
		return Blocks.find();
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
})

Template.insertBlockRow.helpers({
	blockPages: function(){
		var blockPages = _.toArray(this.blockPages);
		return blockPages;
	},
	pageName: function(){
		return Pages.findOne(this.toString()).title;
	}
})