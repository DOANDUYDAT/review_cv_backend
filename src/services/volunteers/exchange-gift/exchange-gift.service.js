// Initializes the `close` service on path `/questions/:questionId/close`
const { ExchangeGift } = require('./exchange-gift.class');
const hooks = require('./exchange-gift.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/volunteers/exchange-gift', new ExchangeGift(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('volunteers/exchange-gift');

  service.hooks(hooks);
};
