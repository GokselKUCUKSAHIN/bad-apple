export function uncompress(compressedFile: string): string {
    const uncompressedSplit = compressedFile.split('\n').filter(x => !!x);
    let uncompressedString = '';
    uncompressedSplit.forEach(row => {
        row.split(';').filter(x => x).forEach(item => {
            const [chr, count] = item.split(',');
            uncompressedString += chr.repeat(parseInt(count));
        });
        uncompressedString += '\n';
    });
    return uncompressedString.slice(0, -1);
}