import {uncompress} from "./uncompress";
import {readFile} from "fs/promises";
import {ungzip} from "node-gzip";
import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';
import {printFloppy} from "./floppy";

const rl = readline.createInterface({input, output});
const hideCursor = require("hide-terminal-cursor");

export async function player(filePath: string, ms = 80) {
    hideCursor();
    const gzRead = await readFile(filePath);
    const compressed = await ungzip(gzRead);
    const file = uncompress(compressed.toString()).split('~');
    printFloppy();
    await rl.question('Press Enter to Continue...');
    rl.close();
    let index = 0;
    let iterator = setInterval(() => {
        console.clear();
        if (index >= file.length) {
            clearInterval(iterator);
        }
        console.log(file[index++]);
    }, ms);
}

player("/Users/gokselkucuksahin/.files/bad-apple.rx");