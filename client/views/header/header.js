Template.header.helpers({
	pages: function(){
		return Pages.find();
	}
})

Template.header.events({
	'click .page-toggle': function(){
		$('.page-container').remove();
		UI.insert(UI.render(Template.showPage), $('.container').get(0));
	}
})