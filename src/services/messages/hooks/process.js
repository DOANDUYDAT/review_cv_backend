/* eslint-disable no-unused-vars */
const { BadRequest, NotFound } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // eslint-disable-next-line no-unused-vars
    const { data, params, app } = context;
    const { user } = params;
    const { content, roomId } = data;
    if (!content) {
      throw new BadRequest('Message must have content');
    }
    if (!roomId) {
      throw new BadRequest('RoomId is required');
    }

    const room = await app.service('rooms').get(roomId);
    if (!room) {
      throw new NotFound('Room is not exist');
    }
    const isInRoom = room.listMember.find(e => e.toString() === user._id.toString());
    if (!isInRoom) {
      throw new NotFound('Not permission. You are not in the room');
    }
    context.data = {
      content: data.content,
      userId: user._id,
      roomId: room._id,
      // Add the current date
      createdAt: Date.now()
    };

    return context;
  };
};
