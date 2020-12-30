const { NotFound, BadRequest, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Accept = class Accept {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    // if (Array.isArray(data)) {
    //   return Promise.all(data.map(current => this.create(current, params)));
    // }
    const { _id } = data;
    const { user } = params;
    if (!_id) {
      throw new BadRequest('A _id is required');
    }
    const answer = await this.app.service('answers').get(_id);
    if (!answer) {
      throw new NotFound('Answer is not exist');
    }
    const question = await this.app.service('questions').get(answer.questionId);
    if (!question) {
      throw new NotFound('Question is not exist');
    }
    const userAnswer = await this.app.service('users').get(answer.userId);

    // chỉ admin hoặc chủ câu hỏi mới dc chọn câu trả lời đúng
    if (user._id.toString() == question.userId.toString() || user.role === 'admin') {
      await this.app.service('questions').patch(answer.questionId, {
        isClose: true
      });
      await this.app.service('answers').patch(_id,{
        isAccept: true
      });

      // cộng điểm uy tín nếu là member hoặc specialist
      if (userAnswer.role === 'member' || userAnswer.role === 'specialist') {
        const { reputationPoint } = userAnswer;
        let newPoint = reputationPoint + 5;
        this.app.service('users').patch(userAnswer._id, {
          reputationPoint: newPoint
        });
      }
      // cộng điểm tích lũy nếu là volunteer
      if (userAnswer.role === 'volunteer') {
        const volun = (await this.app.service('volunteers').find({
          query: {
            userId: userAnswer._id
          }
        })).data[0];
        const { accumulationPoint } = volun;
        let newPoint = accumulationPoint + 5;
        this.app.service('voluntteers').patch(volun._id, {
          accumulationPoint: newPoint
        });
      }

      return this.app.service('answers').get(_id, params);
    } else {
      throw new Forbidden('Not permission');
    }
  }
};
