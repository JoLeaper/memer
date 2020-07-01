const chance = require('chance').Chance();
const Meme = require('../lib/models/Meme');

module.exports = async({ memes = 100 } = {}) => {
  await Promise.all([...Array(memes)].map(async() => {
    return Meme.create({
      top: chance.sentence({ words: 4 }),
      image: chance.url(),
      bottom: chance.sentence({ words: 4 })
    });
  }));
};
