/* eslint-disable no-unused-vars */
const dauria = require('dauria');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      // before-create Hook to get the file (if there is any)
      // and turn it into a datauri,
      // transparently getting feathers-blob
      // to work with multipart file uploads
      function(context) {
        // console.log('params', context.params);
        // console.log(context.data);
        if (!context.data.uri && context.params.file){
          const file = context.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          context.data = {uri: uri};
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};


