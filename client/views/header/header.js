Template.header.onCreated(function(){
	var instance = this;

	instance.autorun(function(){
		var settingsSub = instance.subscribe('settings');
	 	var menusSub = instance.subscribe('menus');
	});
})

Template.header.helpers({
	headerImage: function(){
		return Settings.findOne().headerImage;
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