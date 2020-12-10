// Initializes the `close` service on path `/questions/:questionId/close`
const { Dislike } = require('./dislike.class');
const hooks = require('./dislike.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/answers/dislike', new Dislike(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('answers/dislike');

  service.hooks(hooks);
};
