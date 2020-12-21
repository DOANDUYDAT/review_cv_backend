/* eslint-disable no-unused-vars */
// Initializes the `cv` service on path `/cv`
// const { Cv } = require('./cv.class');
// const hooks = require('./cv.hooks');
const fs = require('fs');
const path = require('path');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/review/:reviewId', function(req, res) {
    let options = {
      root: path.join(__dirname, '../../../uploads/review')
    };
    let fileName = req.params.cvId;
    res.sendFile(fileName, options);
  });
};
