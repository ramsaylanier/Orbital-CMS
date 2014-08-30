Template.editor.events({
	'click a':function(e){
		switch($(e.target).data('role')) {
	    case 'h1':
	    case 'h2':
	    case 'h3':
	    case 'h4':
	    case 'h5':
	    case 'h6':
	    case 'p':
	      document.execCommand('formatBlock', false, $(e.target).data('role'));
	      break;
	    default:
	      document.execCommand($(e.target).data('role'), false, null);
	      break;
	    }
	    $('#body-output').val($('.output').html());
	},
	'click .add-media-btn':function(){
		 UI.insert(UI.render(Template.imageList), $('.container').get(0));
	}
})