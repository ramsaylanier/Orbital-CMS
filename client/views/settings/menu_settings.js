var typingTimer;
var doneTypingInterval = 3000;

Template.menuSettings.created = function(){
	var title = Menus.findOne().title;
	Session.set("currentMenuTitle", title);
}

Template.menuSettings.rendered = function(){
	var $item = $(this.find('.settings-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.menuSettings.helpers({
	menus: function(){
		return Menus.find();
	},
	isSelected: function(title){
		var currentTitle = Session.get("currentMenuTitle");
		if (currentTitle == title){
			return "selected";
		}
	}

});

Template.menuSettings.events({
	'change .menu-select': function(){
		var title = $('.menu-select').val();
		Session.set("currentMenuTitle",title);
	},
	'click .page-menu-option': function(e){
		e.preventDefault();

		var link = $(e.target).html();
		var existingLinks = $('.menu-link-item');
		var linkExists = false;

		_.each(existingLinks, function(existingLink){
			if ($(existingLink).data('link-title') == link)
				linkExists = true;
		})

		if (!linkExists){
			var linkAttributes = {
				link: link,
				linkURL: "/" + encodeURI(link.replace(/\s+/g, '-')).toLowerCase()
			}

			var newLink = $("<li class='menu-link-item temporary-link-item full-width m-b-1 light-grey-bg'>" +
					"<span class='new-link-title'>" + 
						linkAttributes.link +
						"<button class='remove-menu-link small-btn red-btn pull-right'>remove</button>" +
						"<span class='pull-right small m-r-1'>Page</span>" +
					"</span>" + 
				"</li>");

			newLink.attr({
				"data-link-title": linkAttributes.link,
				"data-link-type": "Page",
				"data-link-url": linkAttributes.linkURL
			})

			$('.menu-links-list').children('ul').append(newLink);
		} else {
			throwError('This Link Already Exists', 'error');
		}

		// var menuId = Menus.findOne({title: Session.get("currentMenuTitle")})._id;

		// // Meteor.call('addLinksToMenu', menuId, linkAttributes, function(error, result){
		// // 	if (error){
		// // 		throwError(error.reason, 'error');
		// // 	}
		// // } );
	},
	'click .categories-menu-option': function(e){
		e.preventDefault();
		var link = $(e.target).html();
		var linkURL = "/category/" + encodeURI(link.replace(/\s+/g, '-')).toLowerCase();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		Menus.update({_id: menu._id}, {$addToSet: {links: {linkTitle: link, linkURL: linkURL, linkType: "Category"}}});
	},
	'click .remove-menu-link': function(e){
		$(e.target).parents('.menu-link-item').remove();
	},
	'click .add-link-button': function(e){
		e.preventDefault();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		var link = $('.link-name').val();
		var linkURL = encodeURI($('.link-url').val().replace(/\s+/g, '-')).toLowerCase();
		var linkAttributes = {
			linkTitle: $('.link-name').val(),
			linkURL: encodeURI($('.link-url').val().replace(/\s+/g, '-')).toLowerCase(),
			linkType: "Custom"
		}		

		Meteor.call('addLink', menu, linkAttributes, function(error, id){
			if(error){
				throwError(error.reason, 'error');
			} 
		});
	},
	'click .update-link-button': function(e){
		e.preventDefault();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		var originalTitle = $(e.target).attr('data-title');
		var linkAttributes = {
			linkTitle: $(e.target).parent().find('.update-link-title').val(),
			linkURL: encodeURI($(e.target).parent().find('.update-link-url').val().replace(/\s+/g, '-')).toLowerCase(),
			linkType: $(e.target).parent().find('.update-link-type').val()
		}

		Meteor.call('updateLink', menu, originalTitle, linkAttributes, function(error, id){
			if(error){
				throwError(error.reason, 'error');
			} else{
				throwError('Updated!', 'success');
			}
		});
	},
	'click .create-new-menu': function(e){
		$('.new-menu').removeClass('hidden');
	},
	'click .add-menu-button': function(e){
		e.preventDefault();
		var title = {title: $('.new-menu-title').val()};
		Meteor.call('addMenu', title, function(error, id){
			if(error){
				throwError(error.reason, 'error');
			} else {
				throwError('Menu Added!', 'success');
			}
		});
	},
	'click .toggle': function(e){
		$('.menu-choices').children().children('.settings-content').slideUp(300).addClass('off-page');
		if (!$(e.target).parent().hasClass('active')){
			$('.settings-header').removeClass('active');
			$(e.target).parent().addClass('active');
			$(e.target).parent().next('.settings-content').slideDown(300).removeClass('off-page');
		} else {
			$('.settings-header').removeClass('active');
		}
	}
});

Template.menuChoices.helpers({
	categories: function(){
		return Categories.find();
	},
	pages: function(){
		return Pages.find();
	}
});

Template.menuLayout.helpers({
	menuLinks: function(){
		var title = Session.get("currentMenuTitle");
		return Menus.findOne({title: title}, {fields: {'links': 1}}); 
	},
	currentMenuTitle: function(){
		return Session.get("currentMenuTitle");
	},
	isSelected: function(location){
		console.log(Session.get("currentMenuTitle"));
		var menuLocation = Menus.findOne({title: Session.get("currentMenuTitle")}).location;
		if (location == menuLocation){
			return "selected";
		}
	}
});

Template.menuLayout.events({
	'click .delete-menu-button': function(e){
		e.preventDefault();
		var menu = Menus.findOne({title: Session.get("currentMenuTitle")});
		Menus.remove(menu._id);
	},
	'click .save-menu-button': function(e){
		var menuId = Menus.findOne({title: Session.get("currentMenuTitle")})._id;
		var links = $('.menu-link-item');

		console.log(links);

		var linksArr = [];

		_.each(links, function(link, index){
			linksArr.push($(link).data());
		});

		var menuAttributes = {
			title: $('.menu-name').val(),
			location: $('.menu-location').val()
		}

		Meteor.call('updateMenu', menuId, menuAttributes, linksArr, function(error, id){
			if (error)
				throwError(error.reason, 'error')
			else{
				$('.temporary-link-item').remove();
				throwError('Menu Updated!', 'success')
			}
		});
	}
})