Menus = new Meteor.Collection('menus');

Meteor.methods({
	addMenu: function(title){
		var user = Meteor.user();
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to add posts");

		if (!title.title)
			throw new Meteor.Error(422, 'Please enter a menu title');

		var menu = _.extend(_.pick(title, 'title'));

		var menuId = Menus.insert(menu)

		return menuId;
	},
	updateMenu: function(menuId, menuAttributes, links){
		var user = Meteor.user();
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to edit menus");

		if (!menuAttributes.title)
			throw new Meteor.Error(422, 'Please enter a menu title');

		if (!menuAttributes.location)
			throw new Meteor.Error(422, 'Please enter a menu location');

		var menu = _.extend(_.pick(menuAttributes, 'title', 'location'));

		var menuId = Menus.update({_id: menuId}, {$set: {title: menu.title, location: menu.location, links: links}});

		return menuId;
	},
	// updateMenuTitle: function(menuId, menuTitle){
	// 	var user = Meteor.user();
	
	// 	//make sure used is logged in before adding pages
	// 	if (!user)
	// 		throw new Meteor.Error(401, "You need to login to add posts");

	// 	if (!menuTitle)
	// 		throw new Meteor.Error(422, 'Please enter a menu title');

	// 	var menuId = Menus.update({_id: menuId}, {$set: {title: menuTitle}});

	// 	return menuId;
	// },
	// updateMenuLocation: function(menuId, menuLocation){
	// 	var user = Meteor.user();
	
	// 	//make sure used is logged in before adding pages
	// 	if (!user)
	// 		throw new Meteor.Error(401, "You need to login to add posts");

	// 	var menuId = Menus.update({_id: menuId}, {$set: {location: menuLocation}});

	// 	return menuId;
	// },
	addLinksToMenu: function(menuId, link){
		var user = Meteor.user(),
			menuLinks = Menus.findOne(menuId).links,
			linkExists = false;

		_.each(menuLinks, function(menuLink){
			if (menuLink.linkTitle == link.link){
				throw new Meteor.Error(401, "Link Already Exists in Menu");
			}
		})
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to perform this action");

		var menuId = Menus.update({_id: menuId}, {$addToSet: {links: {linkTitle: link.link, linkURL: link.linkURL, linkType: link.linkType}}});

		return menuId;
	},
	removeLinksFromMenu: function(menuId, linkTitle){
		var user = Meteor.user();
	
		//make sure used is logged in before adding pages
		if (!user)
			throw new Meteor.Error(401, "You need to login to perform this action");

		var menuId = Menus.update( {_id: menuId}, {$pull: {links: {linkTitle: linkTitle} } } );

		return menuId;
	}
})