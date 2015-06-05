Template.blog_template.onCreated(function(){
	var instance = this;

	instance.autorun(function(){
		var subscription = instance.subscribe('postList');
	})

	instance.posts = function(){
		return Posts.find();
	}
})



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

Template.blog_template.helpers({
	posts: function(){
		return Template.instance().posts();
	}
});