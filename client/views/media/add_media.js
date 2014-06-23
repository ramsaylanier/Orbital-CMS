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
  'click .delete-file': function(e) {
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