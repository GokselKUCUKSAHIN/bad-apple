const hideCursor = require('hide-terminal-cursor');
const readFile = require('./IO').readFile;

const main = () => {
  hideCursor();
  const file = readFile("low.txt").split('~');
  
  /*
  let index = 0;
  let si = setInterval(() => {
    console.clear();
    if (index >= file.length) {
      clearInterval(si);
    }
    console.log(file[index++]);
  }, 100);
  */
};

main();