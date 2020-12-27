/* eslint-disable no-unused-vars */
module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  // Join a channel given a user and connection
  const joinChannels = (user, connection) => {
    app.channel('authenticated').join(connection);
    // Channels can be named anything and joined on any condition

    // If the user has joined e.g. chat rooms
    if(Array.isArray(user.rooms) && user.rooms.length) user.rooms.forEach(room => app.channel(`rooms/${room.toString()}`).join(connection));

    // Easily organize users by email and userid for things like messaging
    // app.channel(`emails/${user.email}`).join(connection);
    app.channel(`userIds/${user._id.toString()}`).join(connection);
    // E.g. to send real-time events only to admins use
    if(user.role === 'admin') { app.channel('admins').join(connection); }
    if (user.role === 'member') {
      app.channel('memebers').join(connection);

    }
    if (user.role === 'specialist') {
      app.channel('specialists').join(connection);
      // console.log(user);
      if (Array.isArray(user.fields) && user.fields.length) {
        user.fields.forEach(element => {
          app.channel(`fields/${element}`).join(connection);
        });
      }
    }
    if (user.role === 'volunteer') {
      app.channel('volunteers').join(connection);
      if (Array.isArray(user.fields) && user.fields.length) {
        user.fields.forEach(element => {
          app.channel(`fields/${element}`).join(connection);
        });
      }
    }
  };

  // Get a user to leave all channels
  const leaveChannels = user => {
    app.channel(app.channels).leave(connection =>
      connection.user._id.toString() === user._id.toString()
    );
  };

  // Leave and re-join all channels with new user information
  const updateChannels = user => {
  // Find all connections for this user
    const { connections } = app.channel(app.channels).filter(connection =>
      connection.user._id.toString() === user._id.toString()
    );

    // Leave all channels
    leaveChannels(user);

    // Re-join all channels with the updated user information
    connections.forEach(connection => joinChannels(user, connection));
  };

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if(connection) {
      // Obtain the logged in user from the connection
      const user = connection.user;
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);
      joinChannels(user, connection);

    }
  });

  app.on('logout', (payload, { connection }) => {
    if(connection) {
      // Join the channels a logged out connection should be in
      app.channel('anonymous').join(connection);
    }
  });

  // On `updated` and `patched`, leave and re-join with new room assignments
  app.service('users').on('updated', updateChannels);
  app.service('users').on('patched', updateChannels);
  // On `removed`, remove the connection from all channels
  app.service('users').on('removed', leaveChannels);


  // app.publish((data, hook) => {
  //   // Here you can add event publishers to channels set up in `channels.js`
  //   // To publish only for a specific event use `app.publish(eventname, () => {})`

  //   console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

  //   // e.g. to publish all service events to all authenticated users use
  //   return app.channel('authenticated');
  // });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  app.service('messages').publish('created', (data, context) => {
    return app.channel(`rooms/${data.roomId.toString()}`);
  });
  app.service('notifications').publish('created', (data, context) => {
    // console.log(data);
    if (data.type === 'message') {
      return app.channel(`userIds/${data.to.toString()}`);
    } else if (data.type === 'newCv') {
      let fieldsChannel = data.fields.map(element => app.channel(`fields/${element}`));
      let listChannels = [...fieldsChannel, app.channel(`userIds/${data.to.toString()}`)];
      // console.log(listChannels);
      return listChannels;
    } else if (data.type === 'interestCv') {
      return app.channel(`userIds/${data.to.toString()}`);
    }
  });
};
