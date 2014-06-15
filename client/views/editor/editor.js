Template.editor.events({
	'click a':function(e){
		console.log(e);
		console.log($(e.target).data('role'));
		switch($(e.target).data('role')) {
	    case 'h1':
	    case 'h2':
	    case 'p':
	      document.execCommand('formatBlock', false, $(e.target).data('role'));
	      break;
	    default:
	      document.execCommand($(e.target).data('role'), false, null);
	      break;
	    }
	    $('#body-output').val($('.output').html());
	}
})