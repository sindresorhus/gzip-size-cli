const execa = require('execa');

execa('./cli.js', ['test.js', '-b']).then(console.log);
