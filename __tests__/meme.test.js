const { prepare, agent } = require('../db/data-helpers');
const Meme = require('../lib/models/Meme');

describe('memes routes', () => {
  it('POSTs a new meme', async() => {
    return agent
      .post('/api/v1/memes')
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
    const memes = prepare(await Meme.find());

    return agent
      .get('/api/v1/memes')
      .then(res => {
        expect(res.body).toEqual(memes);
      });
  });

  it('GETs a meme by id', async() => {
    const meme = prepare(await Meme.findOne());

    return agent
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual(meme);
      });
  });

  it('PUTs a meme by updating it', async() => {
    const meme = prepare(await Meme.findOne());
    const update = {
      top: 'here is the new setup',
      image: 'newlink@url.com',
      bottom: 'and the new punchline'
    };

    return agent
      .put(`/api/v1/memes/${meme._id}`)
      .send(update)
      .then(res => {
        expect(res.body).toEqual({
          _id: meme._id,
          top: update.top,
          image: update.image,
          bottom: update.bottom,
          __v: 0
        });
      });
  });

  it.only('DELETEs a meme', async() => {
    const newMeme = await Meme.create({
      top: 'this meme is',
      image: 'link.com',
      bottom: 'about to be deleted'
    });

    return agent
      .delete(`/api/v1/memes/${newMeme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: newMeme.id,
          top: newMeme.top,
          image: newMeme.image,
          bottom: newMeme.bottom,
          __v: 0
        });
      });
  });
});
