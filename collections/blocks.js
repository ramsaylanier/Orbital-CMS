Blocks = new Meteor.Collection('blocks');

Meteor.methods({
	'addBlock': function(blockName, blockTemplate, blockPage){
		var loggedInUser = Meteor.user();

		if (Roles.userIsInRole(loggedInUser, ['admin'])){

			var existingBlock;

			if (!blockName){
				throw new Meteor.Error(422, 'Please enter a name for your block.');
			}

			if (Blocks.findOne({blockName: blockName})){
				throw new Meteor.Error(422, 'A block with this name already exists.');
			}

			if (!blockTemplate){
				throw new Meteor.Error(422, 'Please select a block template.');
			}

			var blockId = Blocks.insert({blockName: blockName, blockTemplate: blockTemplate, blockPages: [blockPage]});

			return blockId;

		}
	},
	'insertBlock': function(blockId, pageId){
		var loggedInUser = Meteor.user();

		if (Roles.userIsInRole(loggedInUser, ['admin'])){
			Blocks.update({_id: blockId}, {$push: {blockPages: pageId}});
		}
	},
	'deleteBlock': function(blockId){
		var loggedInUser = Meteor.user();

		if (Roles.userIsInRole(loggedInUser, ['admin'])){
			Blocks.remove(blockId);
		}
	},
	'removeBlockFromPage': function(blockId, pageId){
		var loggedInUser = Meteor.user();

		if (Roles.userIsInRole(loggedInUser, ['admin'])){
			Blocks.update({_id: blockId}, {$pull: {blockPages: pageId}});
		}
	}
})