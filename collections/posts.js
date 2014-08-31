Posts = new Meteor.Collection('posts');

Meteor.methods({
	'addPost': function(postAttributes){
		var loggedInUser = Meteor.user();

		if (Roles.userIsInRole(loggedInUser, ['admin'])){

			if (!postAttributes.title){
				throw new Meteor.Error(422, 'Please enter a post title');
			}

			// if (!pageAttributes.slug){
			// 	throw new Meteor.Error(422, 'Please enter a page slug');
			// }

			var post = _.extend(_.pick(postAttributes, 'title', 'slug', 'content'), {
				submitted: new Date().getTime()
			});

			var postId = Posts.insert(post);

			return postId;
		}
	},
	updatePost: function(postId, postAttributes){

		var loggedInUser = Meteor.user();

		if (Roles.userIsInRole(loggedInUser, ['admin'])){

			if (!postAttributes.title){
				throw new Meteor.Error(422, 'Please enter a post title');
			}

			var post = _.extend(_.pick(postAttributes, 'title', 'content'), {
				edited: new Date().getTime()
			});

			Posts.update({_id: postId}, {$set: {
											title: post.title, 
											content: post.content,
											edited: post.edited
										}
			});
		}
	},
	'deletePost': function(postId){
		var loggedInUser = Meteor.user();

		if (Roles.userIsInRole(loggedInUser, ['admin'])){
			Posts.remove(postId);
		}
	}
});