// Initializes the `close` service on path `/questions/:questionId/close`
const { UpdateInfo } = require('./update-info.class');
const hooks = require('./update-info.hooks');

const multer = require('multer');
const multipartMiddleware = multer();

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gifts/update-info',
    multipartMiddleware.any(),
    function(req,res,next){
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
    new UpdateInfo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gifts/update-info');

  service.hooks(hooks);
};
