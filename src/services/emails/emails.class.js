const { Service } = require('feathers-mongodb');

exports.Emails = class Emails extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('emails');
    });
  }
};
