// Initializes the `answers` service on path `/answers`
const { Answers } = require('./answers.class');
const hooks = require('./answers.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/answers', new Answers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('answers');

  service.hooks(hooks);
};
