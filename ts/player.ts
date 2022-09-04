import {uncompress} from "./uncompress";
import {readFile} from "fs/promises";

const hideCursor = require("hide-terminal-cursor");

export async function player(filePath: string, ms = 80) {
    hideCursor();
    const compressed = await readFile(filePath, "utf-8");
    const file = uncompress(compressed).split('~');
    let index = 0;
    let iterator = setInterval(() => {
        console.clear();
        if (index >= file.length) {
            clearInterval(iterator);
        }
        console.log(file[index++]);
    }, ms);
}

player("./new_compress.txt");