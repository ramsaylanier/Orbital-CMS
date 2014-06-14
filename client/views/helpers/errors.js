//create local Meteor collection (client-only) to store errors
Errors = new Meteor.Collection(null);

throwError = function(message, type){
	Errors.insert({message: message, type: type, seen: false})
}

clearErrors = function(){
	Errors.remove({seen:true});
}

Template.errors.helpers({
	errors: function(){
		return Errors.find();
	}
});

Template.error.rendered = function(){
	var error = this.data;
	Meteor.defer(function(){
		Errors.update(error._id, {$set: {seen: true}});
	});
}

Template.error.events({
	'click .close-btn': function(e){
		$(e.target).parent('.alert').remove();
	}
});