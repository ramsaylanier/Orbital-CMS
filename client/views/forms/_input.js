Template.formInput.events({
	'focus input':function(e){
		var label = Template.instance().$('label');
		var input = $(e.target);
		input.addClass('expanded');

		label.velocity({
			translateY: -input.outerHeight() + label.outerHeight()
		}, 300, [0, .9, .6, 1.1]);
	},
	'blur input':function(e){
		var label = Template.instance().$('label');
		var input = $(e.target);

		if (input.val().length === 0){
			input.removeClass('expanded');
			label.velocity({
			translateY: 0
			}, 300, [0, .9, .6, 1.1]);
		}
	}
})