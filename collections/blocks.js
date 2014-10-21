Blocks = new Meteor.Collection('blocks');

Meteor.methods({
	'addBlock': function(blockName, blockTemplate){
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

			var blockId = Blocks.insert({blockName: blockName, blockTemplate: blockTemplate});

			return blockId;

		}
	}
})