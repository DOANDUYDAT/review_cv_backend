const { Service } = require('feathers-mongodb');

exports.Specialists = class Specialists extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('specialists');
    });
  }

  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    const userService = this.app.service('users');
    const dataAccount = {
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: 'specialist',
      isActive: 1,
      createdAt: new Date().getTime()
    };
    const { _id } = await userService.create(dataAccount, {
      ...params,
      provider: undefined
    });
    const dataSpecialist = {
      userId: _id,
      isActive: 1,
      field: data.field,
      reputationPoint: 50,
      websiteCompany: data.websiteCompany,
      getEmailNotification: true,
      company: data.company,
      createdAt: new Date().getTime()
    };
    return super.create(dataSpecialist, params);
  }
};


