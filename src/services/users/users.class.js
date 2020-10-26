const { Service } = require('feathers-mongodb');

exports.Users = class Users extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(async db => {
      const usersCollection = db.collection('users');
      await usersCollection.createIndex({ email: 1 }, { unique: true });
      this.Model = usersCollection;
    });
  }
};
