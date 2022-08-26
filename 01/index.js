const fs = require('fs');

fs.writeFile('message.txt', 'Hello World', 'utf8', (e) => {
  if (e) throw e;
  console.log('The file has been saved!');
});