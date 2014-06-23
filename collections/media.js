Media = new FS.Collection("media", {
    stores: [
      new FS.Store.FileSystem("images"),
      new FS.Store.FileSystem("thumbs", {
        transformWrite: function(fileObj, readStream, writeStream) {
          // Transform the image into a 10x10px thumbnail
          gm(readStream, fileObj.name()).resize('150', '150').stream().pipe(writeStream);
        }
      }),
      new FS.Store.FileSystem("medium", {
        transformWrite: function(fileObj, readStream, writeStream) {
          // Transform the image into a 10x10px thumbnail
          gm(readStream, fileObj.name()).resize('500', '500').stream().pipe(writeStream);
        }
      }),
      new FS.Store.FileSystem("large", {
        transformWrite: function(fileObj, readStream, writeStream) {
          // Transform the image into a 10x10px thumbnail
          gm(readStream, fileObj.name()).resize('1000', '1000').stream().pipe(writeStream);
        }
      })

    ],
    filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});