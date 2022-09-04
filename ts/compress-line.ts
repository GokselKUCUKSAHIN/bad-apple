export function compressLine(line: string): string {
    let lastChar = line.charAt(0), result = [], count = 1;
    for (let i = 1; i <= line.length; i++) {
        const char = line.charAt(i);
        if (char === lastChar) {
            count++;
        } else {
            const row = `${lastChar},${count}`;
            result.push(row);
            lastChar = char;
            count = 1;
        }
    }
    return result.join(';');
}