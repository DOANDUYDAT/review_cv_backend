/* eslint-disable no-unused-vars */
const { BadRequest } = require('@feathersjs/errors');
const { Service } = require('feathers-mongodb');

exports.Rooms = class Rooms extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('rooms');
    });
  }

  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    const { listMember } = data;
    if (!listMember || listMember.length != 2) {
      throw new BadRequest('List Member is incorrect');
    }
    return super.create(data, params);
  }
};
