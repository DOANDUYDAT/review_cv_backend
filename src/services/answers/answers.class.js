const { Service } = require('feathers-mongodb');

exports.Answers = class Answers extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('answers');
    });
  }
};
