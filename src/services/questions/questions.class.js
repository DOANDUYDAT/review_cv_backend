const { Service } = require('feathers-mongodb');

exports.Questions = class Questions extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('questions');
    });
  }
};
