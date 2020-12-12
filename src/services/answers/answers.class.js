const { NotFound } = require('@feathersjs/errors');
const { Service } = require('feathers-mongodb');

exports.Answers = class Answers extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('answers');
    });
  }

  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    const { questionId } = data;
    const question = await this.app.service('questions').get(questionId);
    if (!question) {
      throw new NotFound('Question is not exist');
    } else {
      const newAnswer = await super.create(data, params);
      let listAnswers = [...question.listAnswers, newAnswer._id];
      await this.app.service('questions').patch(questionId, {
        listAnswers
      });
      return newAnswer;
    }
  }
};
