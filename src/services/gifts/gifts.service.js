// Initializes the `gifts` service on path `/gifts`
const { Gifts } = require('./gifts.class');
const hooks = require('./gifts.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gifts', new Gifts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gifts');

  service.hooks(hooks);
};
