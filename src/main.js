const fs = require('fs');
const jimp = require('jimp');
const ef = require('ffmpeg-extract-frames');
const block = "██";
const blank = "  ";


const convertFrame = async (path) => {
  const image = await jimp.read(path);
  let row = "";
  return new Promise((res, rej) => {
    try {
      image
        .rgba(false)
        .resize(100, 100)
        .quality(60)
        .grayscale()
        .contrast(1)
        .posterize(2);
      for (let x = 0; y < image.bitmap.height; y++) {
        for (let y = 0; x < image.bitmap.width; x++) {
          const pix = jimp.intToRGBA(image.getPixelColor(x, y));
          row += pix.r > 127 ? block : blank;
        }
        row += "\n";
      }
      res(row);
    } catch (err) {
      rej(err);
    }
  });
}

const collectFrame = async (paths) => {
  const pages = []
  for (let i = 0; i < paths.length; i++) {
    const page = await convertFrame(paths[i]);
    pages.push(page + "~");
  }
  return pages;
}

const badapple = async () => {
  const paths = [];
  for (let i = 1; i < 2192; i++) { // 2192
    paths.push(`../frames/frame-${i}.png`);
  }
  const pages = await collectFrame(paths);
  const file = fs.createWriteStream('low.txt');
  file.on('error', function (err) { /* error handling */
  });
  pages.forEach(v => file.write(v));
  file.end();
}


(async () => {
  try {
    await badapple();
  } catch (exception) {
    console.log(exception);
  }
})();


// const binary = image.bitmap.data[idx] > 127 ? 255 : 0;
// image.bitmap.data[idx + 0] = binary;
// image.bitmap.data[idx + 1] = binary;
// image.bitmap.data[idx + 2] = binary;