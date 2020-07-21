export interface ICreditCard {
    number: number;
    month: number;
    year: number;
    cvc: number;
}

export enum ICreditCardType {
    Electron = 'electron',
    Maestro = 'maestro',
    UnionPay = 'unionPay',
    Visa = 'visa',
    Mastercard = 'mastercard',
}

export const getCreditCardType = (number: number | string): ICreditCardType => {
    let stringNumber = String(number).trim();

    if (stringNumber.length < 16) {
        const diff = 16 - stringNumber.length;
        stringNumber = `${stringNumber}${new Array(diff).fill(0).join('')}`;
    }
    
    if (/^(4026|417500|4405|4508|4844|4913|4917)\d+$/.test(stringNumber)) {
        return ICreditCardType.Electron;
    }
    if (/^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/.test(stringNumber)) {
        return ICreditCardType.Maestro
    }
    if (/^(62|88)\d+$/.test(stringNumber)) {
        return ICreditCardType.UnionPay;
    }
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(stringNumber)) {
        return ICreditCardType.Visa;
    }
    if (/^5[1-5][0-9]{14}$/.test(stringNumber)) {
        return ICreditCardType.Mastercard;
    }

    return ICreditCardType.Mastercard;
};

/**
 * convert string to xxxx xxxx xxxx xxxx
 * @param number | string
 */
export const formatCreditCardNumber = (number: number | string): string => {
    const stringNumber = String(number).trim().replace(/\s+/g, '');
    const arrayOfDigits = stringNumber.split('');

    [4, 9, 14, 19].forEach((startPoint) => {
        arrayOfDigits.splice(startPoint, 0, ' ');
    });

    return arrayOfDigits.slice(0, 19).join('').trim();
};

export const formatNumber = (number: number | undefined, digits = 2, min = 1, max = 12): string => {
    if (!number) {
        return '';
    }

    if (number > max) {
        return formatNumber(max, digits, min, max);
    }

    if (number < min) {
        return formatNumber(min, digits, min, max);
    }

    const str = String(number);
    const leadingZeros = Array(digits - str.length).fill(0).join('');

    return `${leadingZeros}${str}`;
};