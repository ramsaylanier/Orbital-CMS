Template.blog_template.rendered = function(){
	var item = $(this.findAll('.post'));

	Meteor.defer(function() {
		for (var i = 0; i < item.length; i++){
			delayTransition(i, $(item[i]));
		}

		function delayTransition(i, item){
			Meteor.setTimeout(function(){
				item.removeClass('off-page');
			}, (i+1) * 100);
		}
	});
}

// Template.postViewExcerpt.rendered = function(){
// 	var item = $(this.find('.post'));
// 	Meteor.defer(function() {
// 		Meteor.setTimeout(function(){
// 			item.removeClass('off-page');
// 		}, 1000);
// 	})
// }