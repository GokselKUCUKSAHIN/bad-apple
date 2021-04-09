const fs = require('fs');
const hideCursor = require('hide-terminal-cursor');
const main = () => {
  hideCursor();
  const file = readFile("low.txt").split('~');

  let index = 0;
  let si = setInterval(() => {
    console.clear();
    if (index >= file.length) {
      clearInterval(si);
    }
    console.log(file[index++]);
  }, 100);
};

const readFile = (path) => {
  let data = ""; // null/not defined safe
  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    console.error('An Error occurred!\n', err);
  }
  return data;
}
main();