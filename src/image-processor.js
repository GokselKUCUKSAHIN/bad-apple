const hideCursor = require('hide-terminal-cursor');
const readFile = require('./io').readFile;
const uncompress = require('./compress').uncompress;

(() => {
  hideCursor();
  // const file = readFile("low.txt").split('~');
  const compressed = readFile("./new_compress.txt");
  const file = uncompress(compressed).split('~');
  let index = 0;
  let iterator = setInterval(() => {
    console.clear();
    if (index >= file.length) {
      clearInterval(iterator);
    }
    console.log(file[index++]);
  }, 80);
})();