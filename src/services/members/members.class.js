const { Service } = require('feathers-mongodb');

exports.Members = class Members extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('members');
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
      role: 'member',
      isActive: true,
      getEmailNotification: true,
      createdAt: new Date().getTime(),
      updatedAt: null
    };
    const { _id } = await userService.create(dataAccount, {
      ...params,
      provider: undefined
    });
    const dataMember = {
      userId: _id,
      isActive: true,
      listCv: [],
      reputationPoint: 50,
      createdAt: new Date().getTime(),
      updatedAt: null
    };
    return super.create(dataMember, params);
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
