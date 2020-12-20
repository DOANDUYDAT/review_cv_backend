const app = require('../../src/app');

describe('\'upload-cv\' service', () => {
  it('registered the service', () => {
    const service = app.service('upload-cv');
    expect(service).toBeTruthy();
  });
});
