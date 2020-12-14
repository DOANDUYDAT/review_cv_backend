const { Service } = require('feathers-mongodb');

exports.Gifts = class Gifts extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('gifts');
    });
  }
};
