Template.blog_template.rendered = function(){
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

Template.postViewExcerpt.events({
	'click .post-link': function(e, template){
		e.preventDefault();

		var posts = $('.post');

		for (var i = 0; i <= posts.length; i++){
			delayRemoval(i, $(posts[i]));
		} 

		function delayRemoval(i, post){
			Meteor.setTimeout(function(){
				post.addClass('off-page');
			}, (i+1) * 50);
		}

		Meteor.setTimeout(function(){
			Router.go('showPost', {slug: template.data.slug});
		}, posts.length * 150);
	}
});