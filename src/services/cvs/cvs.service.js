// Initializes the `cvs` service on path `/cvs`
const { Cvs } = require('./cvs.class');
const hooks = require('./cvs.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
    whitelist: ['$text', '$search']
  };

  // Initialize our service with any options it requires
  app.use('/cvs', new Cvs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cvs');

  service.hooks(hooks);
};
