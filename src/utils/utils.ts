/**
 * Parse 'x, y' string to coordinates array
 * @param {string} coords - 'x, y' string
 * @return {number[]} - coords array
 */
export function parseCoords(coords: string): number[] {
    return coords.split(/\s?,\s?/).map((c: string) => parseFloat(c ?? 0))
}

export function equalOrIncludes(value: string | string[], argument: string) {
    return Array.isArray(value)
        ? value.includes(argument)
        : value === argument;
}

export async function throwTimeoutError(fn: Function, message: string) {
    try {
        await fn()
    } catch (err: any) {
        if (err.message.includes('exceeded while waiting on the predicate')) {
            throw new Error(message);
        }
        throw err
    }

}
