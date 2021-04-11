const hideCursor = require('hide-terminal-cursor');
const readFile = require('./IO').readFile;
const uncompress = require('./compress').uncompress;

(() => {
  hideCursor();
  // const file = readFile("low.txt").split('~');
  const compressed = readFile("compressedAll.txt");
  const file = uncompress(compressed).split('~');

  let index = 0;
  let si = setInterval(() => {
    console.clear();
    if (index >= file.length) {
      clearInterval(si);
    }
    console.log(file[index++]);
  }, 100);
})();