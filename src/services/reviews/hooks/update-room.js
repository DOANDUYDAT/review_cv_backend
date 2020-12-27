/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, result, app, params } = context;
    // logged user
    const { user } = params;
    const { cvId } = data;

    // update rooms cho chủ review
    const { rooms } = user;
    rooms.push(result.roomId);
    await app.service('users').patch(user._id, {
      rooms
    });
    // update rooms cho chủ cv
    const cv = await app.service('cvs').get(cvId);
    const ownerCv = await app.service('users').get(cv.userId);
    const rooms2 = ownerCv.rooms;
    rooms2.push(result.roomId);
    await app.service('users').patch(ownerCv._id, {
      rooms: rooms2
    });
    return context;
  };
};
