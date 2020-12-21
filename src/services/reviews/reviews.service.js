// Initializes the `reviews` service on path `/reviews`
const { Reviews } = require('./reviews.class');
const hooks = require('./reviews.hooks');
const multer = require('multer');
const multipartMiddleware = multer();

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reviews',
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
    new Reviews(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reviews');

  service.hooks(hooks);
};
