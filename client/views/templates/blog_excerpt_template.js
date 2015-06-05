Template.blog_excerpt_template.rendered = function(){
	var item = $(this.findAll('.post'));

	Meteor.defer(function() {
		for (var i = 0; i < item.length; i++){
			delayTransition(i, $(item[i]));
		}

		function delayTransition(i, item){
			Meteor.setTimeout(function(){
				item.removeClass('off-page');
			}, (i+1) * 50);
		}
	});
}