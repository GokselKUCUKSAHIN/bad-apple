const io = require('./IO');
const util = require('util');

const compress = (array) => {
  const compressed = [];
  array.forEach(row => {
    compressed.push(compressLine(row));
  });
  return compressed.join('&');
}

const compressLine = (line) => {
  let lastChar = line.charAt(0), result = [], count = 1;
  for (let i = 1; i <= line.length; i++) {
    const char = line.charAt(i);
    if (char === lastChar) {
      count++;
    } else {
      result.push(`${lastChar},${count}`)
      lastChar = char;
      count = 1;
    }
  }
  return result.join(';');
};

const uncompress = (compressedFile) => {
  let uncompressedString = '';
  let uncompressedSplit = compressedFile.split('&').filter(x => x);
  uncompressedSplit.forEach(row => {
    row.split(';').filter(x => x).forEach(item => {
      const [chr, count] = item.split(',');
      // console.log(`chr: ${chr}, count: ${count}`);
      uncompressedString += chr.repeat(count);
    });
    uncompressedString += '\n';
  });
  // console.log(uncompressedFile);
  return uncompressedString;
}

const equals = (a, b) => a.valueOf().normalize() === b.valueOf().normalize();

/* (async () => {
  // const file = io.readFile('../text/min.txt')
  // const lines = file.split('\n');
  // const joined = compress(lines);
  // const uncompressed = uncompress(joined);
  // console.log(equals(file, uncompressed))

  // console.dir(uncompressed, {'maxArrayLength': null});
  // console.log(joined);
  // console.log(joined)
  // io.writeFile("compressed4.txt", uncompressed);
  // const compressed = io.readFile('./compressed3.txt');
  // console.log(uncompress(compressed));
  // io.writeFile("uncompresed.txt", uncompress(compressed));
})();
*/

module.exports.uncompress = uncompress;