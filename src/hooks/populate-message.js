/* eslint-disable no-unused-vars */
const { ObjectID } = require('mongodb');

/* eslint-disable require-atomic-updates */
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;
    // Function that adds the user to a single message object
    const addMessage = async user => {
      // Get the user based on their id, pass the `params` along so
      // that we get a safe version of the user data
      // console.log(user);
      // const messages = await app.service('messages').find({
      //   query: {
      //     // userId: new ObjectID(user._id)
      //     // read: true
      //   }
      // });
      // Merge the message content to include the `user` object
      return {
        ...user,
        // messages
      };
    };

    // In a find method we need to process the entire page
    if (method === 'find') {
      // Map all data to include the `user` information
      context.result.data = await Promise.all(result.data.map(addMessage));
    } else {
      // Otherwise just update the single result
      context.result = await addMessage(result);
    }

    return context;
  };
};
