/* eslint-disable no-unused-vars */
// Initializes the `upload-cv` service on path `/upload-cv`
const hooks = require('./upload-review.hooks');

// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');


// File storage location. Folder must be created before upload.
// Example: './uploads' will be located under feathers app top level.
const blobStorage = fs('./uploads/review');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reviews/upload-review',
    blobService({ Model: blobStorage })
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('reviews/upload-review');

  service.hooks(hooks);
};
