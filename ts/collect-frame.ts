import {convertFrameBuffer} from "./convert-frame";
import Jimp = require("jimp");

export async function collectFrame(jimpArray: Jimp[]) {
    return Promise.all(jimpArray.map(async image => `${await convertFrameBuffer(image)}~`));
}