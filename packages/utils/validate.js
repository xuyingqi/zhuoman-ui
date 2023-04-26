/**
 * 是否字符串为空
 * @param str
 * @returns {boolean}
 */
 export function isStrEmpty(str) {
    return !str || str === null || str === undefined || str === '';

}

/**
 * 是否字符串不为空
 * @param str
 * @returns {boolean}
 */
export function isStrNotEmpty(str) {
    return !isStrEmpty(str);
}

/**
 * 是否数组为空
 * @param array
 * @returns {boolean}
 */
export function isArrayEmpty(array) {
    return null === array || undefined === array || array.length <= 0;

}

/**
 * 是否数组不为空
 * @param array
 * @returns {boolean}
 */
export function isArrayNotEmpty(array) {
    return !isArrayEmpty(array);
}
