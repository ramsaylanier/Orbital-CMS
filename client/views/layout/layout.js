UI.registerHelper('setTitle', function(title){
	if (title){
		document.title = title;
	} else {
		document.title = "Orbital CMS | Your Blank Canvas"
	}
});