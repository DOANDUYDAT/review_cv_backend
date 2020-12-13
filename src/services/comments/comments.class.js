const { Service } = require('feathers-mongodb');
const { NotFound } = require('@feathersjs/errors');

exports.Comments = class Comments extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('comments');
    });
  }

  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    const { answerId } = data;
    const answer = await this.app.service('answers').get(answerId);
    if (!answer) {
      throw new NotFound('Answer is not exist');
    } else {
      const newComment = await super.create(data, params);
      let listComments = [...answer.listComments, newComment._id];
      await this.app.service('answers').patch(answerId, {
        listComments
      });
      return newComment;
    }
  }
};
