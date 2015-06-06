Template.blockList.onRendered(function(){
	var instance = this;

	instance.autorun(function(){
		var blockSub = instance.subscribe('blocks');
	})
});

Template.blockRow.events({
	'click .delete-block-btn': function(){
		Meteor.call('deleteBlock', this._id, function(error){
			if (error)
				throwError(error.reason, 'error')
		})
	}
});