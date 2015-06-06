var adminRoutes = FlowRouter.group({
	prefix: "/admin"
});

adminRoutes.route('/', {
	action: function(){
		Session.set('adminActive', true);
		FlowLayout.render('layout', {main: 'showPage'})
	}
});

adminRoutes.route('/settings', {
	action: function(){
		var data = {
			type: 'admin',
			modalTemplate: 'settings'
		}
		Blaze.renderWithData(Template.modal, data, $('body').get(0))
	}
});

adminRoutes.route('/pages', {
	action: function(){
		var data = {
			type: 'admin',
			modalTemplate: 'pagesList'
		}
		Blaze.renderWithData(Template.modal, data, $('body').get(0))
	}
});

adminRoutes.route('/pages/add', {
	action: function(){
		var data = {
			type: 'admin',
			modalTemplate: 'addPage'
		}
		Blaze.renderWithData(Template.modal, data, $('body').get(0))
	}
});

adminRoutes.route('/blocks', {
	action: function(){
		var data = {
			type: 'admin',
			modalTemplate: 'blockList'
		}
		Blaze.renderWithData(Template.modal, data, $('body').get(0))
	}
});

adminRoutes.route('/blocks/add', {
	action: function(){
		var data = {
			type: 'admin',
			modalTemplate: 'addBlock'
		}
		Blaze.renderWithData(Template.modal, data, $('body').get(0))
	}
});

FlowRouter.route('/', {
	action: function(){
		FlowLayout.render('layout', {main: 'showPage'});
	}
});

FlowRouter.route('/:slug', {
	action: function(){
		Session.set('editMode', false);
		FlowLayout.render('layout', {main: 'showPage'})
	}
});

FlowRouter.route('/:slug/edit', {
	action: function(){
		Session.set('editMode', true);
		FlowLayout.render('layout', {main: 'showPage'})
	}
});

FlowRouter.route('/:slug/edit/addBlock', {
	action: function(){
		Session.set('editMode', true);
		FlowLayout.render('layout', {main: 'showPage'});

		var data = {
			type: 'page',
			modalTemplate: 'addBlock'
		};

		Blaze.renderWithData(Template.modal, data, $('body').get(0));
	}
});

FlowRouter.route('/posts/:slug', {
	action: function(){
		Session.set('editMode', false);
		var post = Posts.findOne({slug: this.params.slug})
		FlowLayout.render('layout', {main: 'showPost'})
	}
});