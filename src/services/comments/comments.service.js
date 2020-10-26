// Initializes the `comments` service on path `/comments`
const { Comments } = require('./comments.class');
const hooks = require('./comments.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/comments', new Comments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('comments');

  service.hooks(hooks);
};
