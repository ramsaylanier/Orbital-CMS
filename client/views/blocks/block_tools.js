Template.blockTools.events({
	'click .trash-block-btn': function(e){
		var blockId = this.toString();
		var pageId = Session.get('pageId');
		Meteor.call('removeBlockFromPage', blockId, pageId, function(error){
			if (error)
				throwError(error.reason, 'error')
		})
	}
})