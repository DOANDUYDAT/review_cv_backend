const app = require('../../src/app');

describe('\'specialists\' service', () => {
  it('registered the service', () => {
    const service = app.service('specialists');
    expect(service).toBeTruthy();
  });
});
