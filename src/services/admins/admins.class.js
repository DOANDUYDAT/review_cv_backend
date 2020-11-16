const { Service } = require('feathers-mongodb');

exports.Admins = class Admins extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('admins');
    });
  }
};
