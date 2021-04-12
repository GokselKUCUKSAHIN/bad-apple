// const io = require('./io');
// const util = require('util');

const compress = (array) => {
  const compressed = [];
  array.forEach(row => {
    const line = compressLine(row);
    compressed.push(line);
  });
  return compressed.join('\n');
}

const compressLine = (line) => {
  let lastChar = line.charAt(0), result = [], count = 1;
  for (let i = 1; i <= line.length; i++) {
    const char = line.charAt(i);
    if (char === lastChar) {
      count++;
    } else {
      const row = `${lastChar},${count}`;
      // if (row.normalize() !== '\n,1')
      result.push(row);
      lastChar = char;
      count = 1;
    }
  }
  return result.join(';');
};

const uncompress = (compressedFile) => {
  let uncompressedString = '';
  const uncompressedSplit = compressedFile.split('\n').filter(x => x);
  uncompressedSplit.forEach(row => {
    row.split(';').filter(x => x).forEach(item => {
      const [chr, count] = item.split(',');
      // console.log(`chr: ${chr}, count: ${count}`);
      uncompressedString += chr.repeat(count);
    });
    uncompressedString += '\n';
  });
  // console.log(uncompressedFile);
  return uncompressedString.slice(0, -1);
}

// const equals = (a, b) => a.valueOf().normalize() === b.valueOf().normalize();

/*
(async () => {

  console.log("hello_")
  const file = io.readFile('./low.txt');
  const compressedFile = io.readFile('./compressedAll.txt');
  const uncompressedFile = uncompress(compressedFile);
  // io.writeFile('./decompressedFile.txt', uncompressedFile);
  // console.log(uncompressedFile);
  console.log(equals(file, uncompressedFile));

  // const lines = file.split('\n');
  // const joined = compress(lines);
  // io.writeFile("compressedAll.txt",joined);
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

module.exports.compress = compress;
module.exports.uncompress = uncompress;