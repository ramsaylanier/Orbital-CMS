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
	}
});