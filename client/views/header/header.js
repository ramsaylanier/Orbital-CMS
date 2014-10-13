Template.header.helpers({
	pages: function(){
		return Pages.find();
	},
	landingPage: function(){
		if (Settings.findOne()){
			landingPage = Settings.findOne().landingPage;
			return Pages.findOne({title: landingPage}).slug;
		}
	},
	siteTitle: function(){
		if (Settings.findOne())
			return Settings.findOne().siteTitle;
	},
	headerMenu: function(){
		var headerMenu = Menus.findOne({location: 'header'});

		if (headerMenu){
			Session.set('headerMenu', headerMenu);
			return true;
		}
		else
			return false;
	},
	menuLinks: function(){
		var menu = Session.get('headerMenu');
		return menu.links;

	}
})