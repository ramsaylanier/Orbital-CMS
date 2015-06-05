Template.viewBlocks.rendered = function(){
	var $item = $(this.find('.view-blocks-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.blockRow.events({
	'click .delete-block-btn': function(){
		Meteor.call('deleteBlock', this._id, function(error){
			if (error)
				throwError(error.reason, 'error')
		})
	}
})

Template.blockRow.helpers({
	blockPages: function(){
		var blockPages = _.toArray(this.blockPages);
		return blockPages;
	},
	pageName: function(){
		return Pages.findOne(this.toString()).title;
	}
})