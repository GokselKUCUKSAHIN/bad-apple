import {createFFmpeg} from "@ffmpeg/ffmpeg";
import {writeFile} from "fs/promises";
import {extactFrames} from "./extact-frames";
import {uint8ToJimpArray} from "./uint8-to-jimp";
import {compress} from "./compress";
import {collectFrame} from "./collect-frame";
import {gzip} from "node-gzip";

export async function badApple(videoPath: string, outputFilePath: string, fps = 10): Promise<void> {
    const ffmpegInstance = createFFmpeg({log: true});
    const frames = await extactFrames(ffmpegInstance, videoPath, fps);
    const jimpArray = await uint8ToJimpArray(frames);
    const pages = await collectFrame(jimpArray);
    const joined = pages.join().split('\n');
    const compressed = compress(joined);
    const gziped = await gzip(compressed);
    await writeFile(outputFilePath, gziped);
}

(async _ => {
    await badApple("vid/bad-apple.mp4", "./bad-apple.rx");
})();