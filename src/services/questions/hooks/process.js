// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    // The logged in user
    const { user } = context.params;
    // The actual message text
    // Make sure that messages are no longer than 400 characters
    const title = data.title.substring(0, 400);

    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      // Set the user id
      userId: user._id,
      // Add the current date
      title,
      content: data.content,
      isClose: false,
      likes: [],
      listAnswers: [],
      createdAt: new Date().getTime()
    };

    return context;
  };
};
