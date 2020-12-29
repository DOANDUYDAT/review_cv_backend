const { Service } = require('feathers-mongodb');

exports.Cvs = class Cvs extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(async db => {
      const cvsCollection = db.collection('cvs');
      await cvsCollection.createIndex({ content: 'text', name: 'text', position: 'text', location: 'text', exp: 'text', timeType: 'text', field: 'text' });
      this.Model = cvsCollection;
    });
  }
};
