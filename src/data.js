/**
 * Convert the JSON table (array of [code, key] tuples) into a typed array.
 */
export function parseTable(raw) {
    return raw.map(([code, key]) => ({ code, key }));
}
