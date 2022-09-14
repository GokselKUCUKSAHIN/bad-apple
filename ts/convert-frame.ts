import Jimp = require("jimp");

const block = "██";
const blank = "  ";

export async function convertFrame(image: Jimp): Promise<string> {
    // I'll return a result, I Promise!
    return new Promise((resolve, reject) => {
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
                    const pix = Jimp.intToRGBA(image.getPixelColor(x, y));
                    row += pix.r > 127 ? block : blank;
                }
                row += '\n';
            }
            resolve(row);
        } catch (err) {
            reject(err);
        }
    });
}


export async function convertFrameBuffer(image: Jimp): Promise<string> {
    // I'll return a result, I Promise!
    return new Promise((resolve, reject) => {
        let row = [];
        try {
            // Factory Pattern
            image
                .rgba(false)
                .resize(100, 100)
                .quality(60) // jpeg
                .grayscale()
                .contrast(1)
                .posterize(2);
            const len = image.bitmap.data.length
            const w = image.bitmap.width;
            // const h = image.bitmap.height;
            for (let i = 0, idx = 0; i < len; i += 4, idx++) {
                const dataR = image.bitmap.data[i];
                row.push(dataR > 127 ? block : blank);
                if (idx >= w) {
                    idx = 0;
                    row.push('\n');
                }
            }
            resolve(row.join(''));
        } catch (err) {
            reject(err);
        }
    });
}
