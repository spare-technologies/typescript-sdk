/**
 * check if object is null or undefined
 * @param object
 */
export function isNullOrUndefined(object: any): boolean {
    return object == null || object == 'undefined'
}

/**
 * Check if string is empty or white space
 * @param str
 */
export function isEmptyOrWhiteSpace(str: string | null | undefined): boolean {
    return str == null || str == 'undefined' || str.trim() == ''
}

/**
 * Get random number
 * @param min
 * @param max
 */
export function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
