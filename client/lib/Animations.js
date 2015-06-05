Animations = {
	defaultEasing: [.49,.14,.31,1.25]
}

DefaultModalIn = {
	properties: {
		opacity: 1,
		scale: [1, 1.1]
	},
	options: {
		duration: 300, 
		easing: Animations.defaultEasing
	}
}

DefaultModalOut = {
	properties: {
		opacity: 0,
		scale: [1.05, 1]
	},
	options: {
		duration: 300, 
		easing: Animations.defaultEasing
	}
}

DefaultPageAnimateIn = {
	properties: {
		opacity: 1,
		scale: [1, 1.1]
	},
	options: {
		duration: 500, 
		easing: [.5, .1, .1, 1]
	}
}

DefaultPageAnimateOut = {
	properties: {
		opacity: 0,
		scale: [1.1, 1]
	},
	options: {
		duration: 1000, 
		easing: [.5, .1, .1, 1]
	}
}

PageAnimationSequences = {
	landingPage: {
		pageTitle: {
			item: '.page-title',
			animation: {
				properties: {
					opacity: 0,
					scale: 1.2
				},
				options: {
					duration: 300, 
					easing: [.5, .1, .1, 1]
				},
			},
		},
		page: {
			item: '.page',
			animation: {
				properties: {
					opacity: 0,
					scale: [1.1, 1]
				},
				options: {
					duration: 500, 
					easing: [.5, .1, .1, 1],
					delay: 200
				}
			}
		},
		sectionTitle:  {
			item: '.first-section',
			animation: {
				properties: {
					opacity: 0,
					scale: [1.1,1]
				},
				options: {
					duration: 500, 
					easing: [.5, .1, .1, 1],
					delay: 100
				}
			}
		}
	},
	loginPage: {
		page: {
			item: '.page',
			animation: {
				properties: {
					opacity: 0,
					scale: [1.1, 1]
				},
				options: {
					duration: 500, 
					easing: [.5, .1, .1, 1],
					delay: 0
				}
			}
		}
	}
}

AnimatePageOut = function(page){
	var sequence = PageAnimationSequences[page];

	_.each(sequence, function(element){
		AnimateItem($(element.item), element.animation);
	});
}

AnimateItem = function(item, animation){
	item.velocity(animation.properties, animation.options);
}