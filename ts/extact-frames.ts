import {FFmpeg, fetchFile} from "@ffmpeg/ffmpeg";

const vName = "sample.mp4";

export async function extactFrames(ffmpeg: FFmpeg, videoPath: string, fps = 10) {
    await ffmpeg.load();
    ffmpeg.FS('writeFile', vName, await fetchFile(videoPath));
    await ffmpeg.run(
        "-i", //? Input file
        vName, //? name of = Input file
        "-s", //? resize
        "240x135", //? new resolution
        "-vf", //? set filter
        `fps=${fps}`, //? set frame per sec
        "f-%05d.png" //? Output file
    );
    const listDir = ffmpeg.FS("readdir", "/");
    const fileData = (data: string[]) => data.filter(fileName => /^f-.*\.png$/.test(fileName));
    const frames = fileData(listDir).map(fileName => ffmpeg.FS('readFile', fileName));
    ffmpeg.exit()
    return frames;
}