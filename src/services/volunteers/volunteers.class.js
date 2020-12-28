const { Service } = require('feathers-mongodb');
const { NotFound, Forbidden } = require('@feathersjs/errors');

exports.Volunteers = class Volunteers extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('volunteers');
    });
  }

  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    const userService = this.app.service('users');
    const dataAccount = {
      fullName: data.fullName,
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      fields: data.fields,
      role: 'volunteer',
      rooms: [],
      listNotifications: [],
      isActive: true,
      reputationPoint: 50,
      getEmailNotification: true,
      createdAt: new Date().getTime(),
      updatedAt: null
    };
    const { _id } = await userService.create(dataAccount, {
      ...params,
      provider: undefined
    });
    const dataSpecialist = {
      userId: _id,
      isAccept: false,
      rewardPoint: 0,
      accumulationPoint: 0,
      listReceivedCv: [],
      listReview: [],
      createdAt: new Date().getTime(),
      updatedAt: null
    };
    return super.create(dataSpecialist, params);
  }

  async remove(id, params) {
    // logged user
    const { user } = params;
    if (user.role === 'admin') {
      const userRemove = await this.app.service('volunteers').get(id);

      if (!userRemove) {
        throw new NotFound('User is not exist');
      } else {
        const { userId } = userRemove;
        await this.app.service('users').remove(userId);
        return super.remove(id, params);
      }
    } else {
      throw new Forbidden('Not permission');
    }
  }

};
