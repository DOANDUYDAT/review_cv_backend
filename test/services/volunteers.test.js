const app = require('../../src/app');

describe('\'volunteers\' service', () => {
  it('registered the service', () => {
    const service = app.service('volunteers');
    expect(service).toBeTruthy();
  });
});
