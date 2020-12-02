const app = require('../../src/app');

describe('\'close\' service', () => {
  it('registered the service', () => {
    const service = app.service('questions/:questionId/close');
    expect(service).toBeTruthy();
  });
});
