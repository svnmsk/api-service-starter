/**
 * @namespace Utils
 **/

const R = require('ramda');

/**
 * Returns normalized number
 * @param value {Number}
 * @param def {Number} default value
 * @param min {Number} min number
 * @param max {Number} max number
 * @returns {number}
 */
module.exports.normalizeNumber = (value, {def = 0, min = 1, max = 100}) => {
    const rules = [R.isNil, R.isEmpty, isNaN, R.lt(R.__, min), R.gt(R.__, max)];
    return R.anyPass(rules)(value) ? def : Number(value);
};
