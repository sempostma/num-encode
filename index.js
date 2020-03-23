
/**
 * Converts input value with base to a number
 * @param {string} value - the input
 * @param {number} fromBase - the base of the input value
(Be carefull with values above 65535 as this might cause problems with character encoding)
 */

const isBigIntNeeded = (value, fromBase) => {
    const hi = (value.charCodeAt(0) + 1) * fromBase
    const hiIndex = value.length - 1
    return value.length
        && hi ** hiIndex > Number.MAX_SAFE_INTEGER
}

const convertBase = (value, fromBase) => {
    const characters = value.toString().split('')
    const c = isBigIntNeeded(value, fromBase)
        ? BigInt
        : Number
    return characters.reverse().reduce(function (carry, digit, index) {
        const digitVal = digit.charCodeAt(0);
        if (digitVal >= fromBase) throw new Error('Invalid digit `' + digit + '` for base ' + fromBase + '.');
        return carry += c(digitVal) * c(fromBase) ** c(index);
    }, c(0));
};

/**
 * Converts input value to a string value with the specified base
 * @param {number} value - the input value
 * @param {number} toBase - the base of the output value 
(Be carefull with values above 65535 as this might cause problems with character encoding)
 */
const encode = (value, toBase = 65535 /* safe range */) => {
    var utf8 = value.toString().split('').map(function (x) {
        return String.fromCharCode(x);
    }).join('');
    var decValue = convertBase(utf8, 10);
    var newValue = '';
    var zero = 0
    if (typeof decValue === 'bigint') {
        zero = BigInt(zero)
        toBase = BigInt(toBase)
    }
    while (decValue > zero) {
        newValue = String.fromCharCode(Number(decValue % toBase)) + newValue;
        decValue = (decValue - (decValue % toBase)) / toBase;
    }
    return newValue || '0';
};

/**
 * Converts input value with base to a number
 * @param {string} value - the input
 * @param {number} fromBase - the base of the input value
(Be carefull with values above 65535 as this might cause problems with character encoding)
 */
const decode = (value, fromBase = 65535 /* safe range */) => {
    return convertBase(value, fromBase);
};

module.exports = {
    encode: encode,
    decode: decode
};


console.log(decode(encode('2222222222222')))
