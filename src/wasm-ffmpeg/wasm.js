const fs = require('fs');
const {createFFmpeg, fetchFile} = require('@ffmpeg/ffmpeg');
const ffmpeg = createFFmpeg();

const name = "test.mp4";
// console.log(fs.createReadStream('vid/badapple.mp4'))

console.log("FFmpeg started to Loading...");
ffmpeg.load().then(async _ => {
  console.log("FFmpeg Loaded");
  ffmpeg.FS('writeFile', name, await fetchFile('../../vid/badapple.mp4'))
  let frameArray
  await ffmpeg.run('-i', name, '-vf', `select='between(t\,0\,99)`, '-vsync', '0', frakmeArray)
  // console.log(frameArray)
  // const len = frameArray.length // 100
  // const ten = frameArray[10] // a image obj or a image blob
})


/*
(async _ => {
  console.log("FFmpeg Loading...");
  await ffmpeg.load();
  console.log("Loaded!");

})();
*/