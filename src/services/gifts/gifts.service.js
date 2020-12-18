/* eslint-disable no-unused-vars */
// Initializes the `gifts` service on path `/gifts`
const { Gifts } = require('./gifts.class');
const hooks = require('./gifts.hooks');

const multer = require('multer');
const multipartMiddleware = multer();

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gifts',
    multipartMiddleware.any(),
    function(req,res,next){
      // console.log(req.body);
      if (req.files && req.files.length) {
        // console.log(req.files);
        req.feathers.file = req.files[0];
      }
      if (req.file) {
        // console.log(req.file);
        req.feathers.file = req.file;
      }
      // req.feathers.data = req.body;
      next();
    },
    new Gifts(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('gifts');

  service.hooks(hooks);
};
