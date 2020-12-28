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
      fullName: data.fullName,
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: 'member',
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
    const dataMember = {
      userId: _id,
      isActive: true,
      listCv: [],
      createdAt: new Date().getTime(),
      updatedAt: null,
      fields: []
    };
    return super.create(dataMember, params);
  }
};
