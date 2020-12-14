// Initializes the `close` service on path `/questions/:questionId/close`
const { Like } = require('./like.class');
const hooks = require('./like.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/comments/like', new Like(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('comments/like');

  service.hooks(hooks);
};
