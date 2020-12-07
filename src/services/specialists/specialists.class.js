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
      isActive: true,
      getEmailNotification: true,
      createdAt: new Date().getTime()
    };
    const { _id } = await userService.create(dataAccount, {
      ...params,
      provider: undefined
    });
    const dataSpecialist = {
      userId: _id,
      isAccept: false,
      fields: data.fields,
      reputationPoint: 50,
      websiteCompany: data.websiteCompany,
      company: data.company,
      createdAt: new Date().getTime()
    };
    return super.create(dataSpecialist, params);
  }

  async patch(id, data, params) {
    let { fields, user: { _id, userName, phone, getEmailNotification }} = data;

    await this.app.service('users').patch(_id, {
      userName,
      phone,
      getEmailNotification
    },
    {
      ...params,
      provider: undefined
    });
    return super.patch(id, {
      fields
    }, params);
  }
};


