const { prepare, agent } = require('../db/data-helpers');

describe('memes routes', () => {
  it.only('POSTs a new meme', async() => {
    return agent
      .post('/api/v1/actors/')
      .send({
        top: 'here is the setup',
        image: 'memeurl.com',
        bottom: 'and the punchline',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          top: 'here is the setup',
          image: 'memeurl.com',
          bottom: 'and the punchline',
          __v: 0
        });
      });
  });

  it('GETs all the memes', async() => {
    const actors = prepare(await Actor.find().select({ name: true }));

    return agent
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });

  it('GETs a meme by id', async() => {
    const actors = prepare(await Actor.find().select({ name: true }));

    return agent
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });

  it('PUTs a meme by updating it', async() => {
    const actors = prepare(await Actor.find().select({ name: true }));

    return agent
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });

  it('DELETEs a meme', async() => {
    const actors = prepare(await Actor.find().select({ name: true }));

    return agent
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });
});
