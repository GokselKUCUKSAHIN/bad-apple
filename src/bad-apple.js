const io = require('./io');
const jimp = require('jimp');
const compress = require('./compress');


const block = "██";
const blank = "  ";

/**
 * @author Göksel KÜÇÜKŞAHİN
 * @Date 10/04/2021
 * @param {jimp}image file for convertion
 * @return {Promise<String>} single frame/page of video converted to ASCII
 */
const convertFrame = async (image) => {
  // I'll return a result, I Promise!
  return new Promise((res, rej) => {
    let row = '';
    try {
      // Factory Pattern
      image
        .rgba(false)
        .resize(100, 100)
        .quality(60) // jpeg
        .grayscale()
        .contrast(1)
        .posterize(2);
      for (let y = 0; y < image.bitmap.height; y++) {
        for (let x = 0; x < image.bitmap.width; x++) {
          const pix = jimp.intToRGBA(image.getPixelColor(x, y));
          row += pix.r > 127 ? block : blank;
        }
        row += '\n';
      }
      res(row);
    } catch (err) {
      rej(err);
    }
  });
}

/**
 * @author Göksel KÜÇÜKŞAHİN
 * @Date 10/04/2021
 * @param {Array<String>}paths array of image paths
 * @return {Promise<Array<String>>} page Array ready for printing.
 */
const collectFrame = async (paths) => {
  const pages = []
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const image = await jimp.read(path);
    const page = await convertFrame(image);
    pages.push(page + "~");
  }
  return pages;
}

const fetchFrames = (path, count) => {
  const paths = [];
  for (let i = 1; i < count; i++) { // 2192
    paths.push(`${path}/frame-${i}.png`);
  }
}

/**
 * @author Göksel KÜÇÜKŞAHİN
 * @Date 10/04/2021
 * @return {Promise<void>}
 */
const badapple = async () => {
  const paths = fetchFrames('../frames', 200);
  const pages = await collectFrame(paths);
  const joined = pages.join().split('\n');
  const compressed = compress.compress(joined);
  io.writeFile('new_compress.txt', compressed);
}

module.exports = badapple;