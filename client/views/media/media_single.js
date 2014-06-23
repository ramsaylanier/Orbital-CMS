Template.mediaSingle.rendered = function(){
	var item = $(this.find('.media-modal'));
	Meteor.defer(function(){
		item.removeClass('off-page-below');
	})
}

Template.mediaSingle.events({
	'click .close-media-btn': function(e){
		e.preventDefault();
		$('.media-modal').addClass('off-page-below');

		setTimeout(function(){
			$('.media-modal').remove();
		}, 500);
	}
});