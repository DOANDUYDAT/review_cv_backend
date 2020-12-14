// Initializes the `close` service on path `/questions/:questionId/close`
const { ExchangePoint } = require('./exchange-point.class');
const hooks = require('./exchange-point.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/volunteers/exchange-point', new ExchangePoint(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('volunteers/exchange-point');

  service.hooks(hooks);
};
