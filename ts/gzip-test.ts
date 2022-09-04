import {gzip, ungzip} from "node-gzip";
import {readFile, writeFile} from "fs/promises";

(async _ => {
    const raw = await readFile("./new_comp.txt", 'utf-8');
    const gziped = await gzip(raw);
    await writeFile("comp.gz", gziped);
    const gzRead = await readFile("./comp.gz");
    const uncomp = await ungzip(gzRead);
    console.log(uncomp.toString());
})();