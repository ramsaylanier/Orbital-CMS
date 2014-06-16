Template.header.helpers({
	pages: function(){
		return Pages.find();
	},
	landingPage: function(){
		if (Settings.findOne()){
			landingPage = Settings.findOne().landingPage;
			return Pages.findOne({title: landingPage}).slug;
		}
	}
})

Template.header.events({
	'click .page-toggle': function(e){
		if ($('.page-container').length > 0){
			$('.page-container').addClass('off-page');
			setTimeout(function(){
				$('.page-container').remove();
				var data = Pages.findOne({slug: $(e.target).data('slug')});
				UI.insert(UI.renderWithData(Template.showPage, data), $('.main').get(0));
			}, 450);
		}
	},
	'click .home-toggle': function(e){

	}	
})