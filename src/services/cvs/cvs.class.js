const { Service } = require('feathers-mongodb');

exports.Cvs = class Cvs extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('cvs');
    });
  }
};
