const { Service } = require('feathers-mongodb');

exports.Reviews = class Reviews extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('reviews');
    });
  }
};
