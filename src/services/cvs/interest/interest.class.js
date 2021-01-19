/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Interest = class Interest {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    const { cvId } = data;
    const { user } = params;
    if (user.role === 'specialist') {
      const cv = await this.app.service('cvs').get(cvId);
      const spec = (await this.app.service('specialists').find({
        query: {
          userId: user._id
        }
      })).data[0];
      if (!cv) {
        throw new NotFound('Cv is not exist');
      }
      if (!spec) {
        throw new NotFound('Specialist is not exist');
      }
      // thêm/xóa người dùng trong danh sách quan tâm cv
      let listInterester = [...cv.listInterester];
      const index = listInterester.findIndex(e => e.toString() == user._id.toString());
      if (index == -1) {
        listInterester.push(user._id);
      } else {
        listInterester.splice(index, 1);
      }
      await this.app.service('cvs').patch(cvId, {
        listInterester
      });
      const recruitmentId = spec.listRecruitmentNews.length ? spec.listRecruitmentNews[0] : null;
      // tạo thông báo sau khi có người mới quan tâm cv
      if (index == -1) {
        this.app.service('notifications').create({
          type: 'interestCv',
          from: user._id,
          to: cv.userId,
          cvId: cv._id,
          recruitmentId,
          createdAt: Date.now()
        });
      }

      // thêm/xóa cv trong danh sách cv đã quan tâm của người dùng
      let listInterestedCv = [...spec.listInterestedCv];
      const indexCv = listInterestedCv.findIndex(e => e.toString() == cvId.toString());

      if (indexCv == -1) {
        listInterestedCv.push(cvId);
      } else {
        listInterestedCv.splice(index, 1);
      }
      this.app.service('specialists').patch(spec._id, {
        listInterestedCv
      });



      return this.app.service('cvs').get(cvId, params);

    } else {
      throw new Forbidden('Not Forbidden');
    }
  }
};
