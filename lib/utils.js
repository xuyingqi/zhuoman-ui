export const isStrEmpty = (str) => {
    return !str || str === null || str === undefined || str === '';
}
export const isArrayEmpty = (array) => {
    return null === array || undefined === array || array.length <= 0;
}