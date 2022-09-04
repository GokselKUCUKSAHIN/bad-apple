import {mkdir, rm, writeFile} from "fs/promises";
import {join} from "path";
import {nanoid} from 'nanoid'
import Jimp = require("jimp");

export async function uint8ToJimpArray(frames: Uint8Array[], saveLocation = ".cache") {
    await mkdir(saveLocation, {recursive: true});
    const images = await Promise.all(frames.map(async frame => {
        const savePath = join(saveLocation, `${nanoid(8)}.png`);
        await writeFile(savePath, frame);
        return Jimp.read(savePath);
    }));
    await rm(saveLocation, {recursive: true});
    return images;
}