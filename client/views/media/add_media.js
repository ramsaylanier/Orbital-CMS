Template.addMedia.rendered = function(){
	var $item = $(this.find('.add-media-modal'));
	Meteor.defer(function() {
		$item.removeClass('off-page');
	});
}

Template.addMedia.events({
  'change .fileUploader': function (e) {
    FS.Utility.eachFile(e, function (file) {
      Media.insert(file, function(err, fileObj){
  		if (err){
  			throwError(err.reason, 'error')
  		}
      });
    });
  },
  'click #add-media-btn': function(e) {
    e.preventDefault();
    $('.fileUploader').click();
  },
  'click .delete-file-btn': function(e) {
    Media.remove(this._id);
  },
  'click .media-modal-btn': function(e){
    e.preventDefault();
    data = Media.findOne({_id: this._id});
    UI.insert(UI.renderWithData(Template.mediaSingle, data), $('.container').get(0));
  }
});

Template.imageList.helpers({
	files: function(){
		return Media.find();
	}
})

Template.setFeaturedImage.rendered = function(){
  var $item = $(this.find('.insert-image-modal'));
  Meteor.defer(function() {
    $item.removeClass('off-page');
  });
}

Template.setFeaturedImage.events({
  'click .set-featured-image-btn': function(e, template){
    e.preventDefault();

     var url = $(e.target).closest('img').attr('src');
    $('body').find('[name=featured-image]').val(url);
    $('.media-image').attr('src', url);
    $('.modal').remove();

  }
})