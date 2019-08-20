const fs = require('fs');
const { Lifetime } = require('awilix');

// stores all the repositories to be exported.
const repositories = {};

// get the contents of the folder
fs.readdirSync('src/infrastructures/repositories')
  .filter(file => {
    // do not include the index.js and the BaseRepository.js files
    return (
      file.indexOf('.') !== 0 &&
      file !== 'index.js' &&
      file !== 'BaseRepository.js' &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    // get the name of the repository
    const repositoryName = file.split('.')[0];
    // require it
    const repository = require(`./${file}`);

    // store it
    repositories[repositoryName.replace(/^./, f => f.toLowerCase())] = [
      repository,
      { lifetime: Lifetime.SINGLETON },
    ];
  });

module.exports = repositories;
