import {compressLine} from "./compress-line";

export function compress(rows: string[]): string {
    return rows.map(row => compressLine(row)).join('\n');
}