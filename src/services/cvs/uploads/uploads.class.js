/* eslint-disable no-unused-vars */
const { NotFound, Forbidden } = require('@feathersjs/errors');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

/* eslint-disable no-unused-vars */
exports.Uploads = class Uploads {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    // The logged in user
    const { user } = params;
    if (user.role !== 'member') {
      throw new Forbidden('Not permission');
    }
    const mem = (await this.app.service('members').find({
      query: {
        userId: user._id
      }
    })).data[0];
    if (!mem) {
      throw new NotFound('Member is not exist');
    }

    let link = null;

    if (params.file) {
      const { id } = await this.app.service('cvs/upload-cv').create(data, params);
      link = id;
    }
    let linkHidden = 'hidden-' + link;
    getHideInfoFile(link, linkHidden);
    let type = 'upload';
    let dataCv = {
      // Set the user id
      content: data.content,
      name: data.name,
      userId: user._id,
      link,
      linkHidden,
      listViewer: [],
      listInterester: [],
      listReview: [],
      type,
      field: data.field,
      exp: data.exp,
      position: data.position,
      location: data.location,
      timeType: data.timeType,
      createdAt: new Date().getTime(),
      updatedAt: null
    };

    return this.app.service('cvs').create(dataCv, params);

  }
};


function getHideInfoFile(pathFile, pathHiddenFile) {
  const cvUploadFolder = process.cwd() + '/uploads/cv/';
  const sendFilePath = path.join(cvUploadFolder, pathFile);
  const saveFilePath = path.join(cvUploadFolder, pathHiddenFile);
  let data = new FormData();
  data.append('file', fs.createReadStream(sendFilePath));

  let config = {
    method: 'post',
    url: 'http://localhost:5000/parser',
    headers: {
      ...data.getHeaders()
    },
    responseType: 'stream',
    data : data
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      response.data.pipe(fs.createWriteStream(saveFilePath));
    })
    .catch(function (error) {
      console.log(error);
    });
}
