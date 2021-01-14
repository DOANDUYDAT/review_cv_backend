const { Service } = require('feathers-mongodb');

exports.Questions = class Questions extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(async db => {
      const questionsCollection = db.collection('questions');
      await questionsCollection.createIndex({ title: 'text' });
      this.Model = questionsCollection;
    });
  }
};
