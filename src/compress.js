const io = require('./IO');

const util = require('util');

const compress = (array) => {
  const compressed = [];
  array.forEach(row => {
    compressed.push(compressLine(row));
  });
  return compressed;
}

const compressLine = (line) => {
  let lastChar = line.charAt(0), result = "", count = 1;
  for (let i = 1; i <= line.length; i++) {
    const char = line.charAt(i);
    if (char === lastChar) {
      count++;
    } else {
      result += `${lastChar},${count};`
      lastChar = char;
      count = 1;
    }
  }
  return result;
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

(async () => {
  const file = io.readFile('./low.txt');
  const joined = compress(file.split('\n').map(row => row+"\n"))
  console.log(joined)
  io.writeFile("compressed2.txt", joined);
  // const compressed = io.readFile('./compressed.txt');
  // console.log(uncompress(compressed));
  // io.writeFile("uncompresed.txt", uncompress(compressed));
})();