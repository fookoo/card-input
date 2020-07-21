import { formatCreditCardNumber, formatNumber, getCreditCardType, ICreditCardType } from './card.service';

interface stringToEnumMap {
    [key: string]: ICreditCardType;
}

const cards: stringToEnumMap = {
    '88': ICreditCardType.UnionPay,

    '4026': ICreditCardType.Electron,
    '4175': ICreditCardType.Electron,
    '4405': ICreditCardType.Electron,
    '4508': ICreditCardType.Electron,
    '4844': ICreditCardType.Electron,
    '4913': ICreditCardType.Electron,
    '4917': ICreditCardType.Electron,

    '5018': ICreditCardType.Maestro,
    '5020': ICreditCardType.Maestro,
    '5038': ICreditCardType.Maestro,
    '5612': ICreditCardType.Maestro,
    '5893': ICreditCardType.Maestro,
    '6304': ICreditCardType.Maestro,
    '6759': ICreditCardType.Maestro,
    '6761': ICreditCardType.Maestro,
    '6762': ICreditCardType.Maestro,
    '6763': ICreditCardType.Maestro,
    '0604': ICreditCardType.Maestro,
    '6390': ICreditCardType.Maestro,

    '4916338506082832': ICreditCardType.Visa,
    '4556015886206505': ICreditCardType.Visa,
    '4539048040151731': ICreditCardType.Visa,
    '4024007198964305': ICreditCardType.Visa,
    '4716175187624512': ICreditCardType.Visa,

    '5280934283171080': ICreditCardType.Mastercard,
    '5456060454627409': ICreditCardType.Mastercard,
    '5331113404316994': ICreditCardType.Mastercard,
    '5259474113320034': ICreditCardType.Mastercard,
    '5442179619690834': ICreditCardType.Mastercard,
};

describe('CreditCardService', () => {
    describe('getCreditCardType', () => {

        Object.keys(cards).forEach((number) => {
            it(`should detect card ${number}  as ${cards[number]}`, () => {
                expect(getCreditCardType(number)).toBe(cards[number]);
            });
        });
    });
    describe('formatCreditCardNumber', () => {
        it('should format correctly when number of digits is less or equal maximum', () => {
            expect(formatCreditCardNumber('1234')).toBe('1234');
            expect(formatCreditCardNumber('12345')).toBe('1234 5');
            expect(formatCreditCardNumber('123456')).toBe('1234 56');
            expect(formatCreditCardNumber('1234567')).toBe('1234 567');
            expect(formatCreditCardNumber('12345678')).toBe('1234 5678');
            expect(formatCreditCardNumber('123456789')).toBe('1234 5678 9');
            expect(formatCreditCardNumber('1234567890')).toBe('1234 5678 90');
            expect(formatCreditCardNumber('12345678901')).toBe('1234 5678 901');
            expect(formatCreditCardNumber('123456789012')).toBe('1234 5678 9012');
            expect(formatCreditCardNumber('1234567890123')).toBe('1234 5678 9012 3');
            expect(formatCreditCardNumber('12345678901234')).toBe('1234 5678 9012 34');
            expect(formatCreditCardNumber('123456789012345')).toBe('1234 5678 9012 345');
            expect(formatCreditCardNumber('1234567890123456')).toBe('1234 5678 9012 3456');
        });

        it('should format correctly when number of digits is more then maximum', () => {
            expect(formatCreditCardNumber('1234567890123456123123621')).toBe('1234 5678 9012 3456');
        });

        it('should format correctly when extra white characters are added', () => {
            expect(formatCreditCardNumber('   1    2   3  4 5 6 7 8 9 0 1 2 3    4   5 6 1 2 3 12 3 6 21'))
                .toBe('1234 5678 9012 3456');
        });
    })
    describe('formatNumber', () => {
        it('should format correctly when number of digits is less or equal maximum', () => {
            expect(formatNumber(1, 2, 1, 12)).toBe('01');
            expect(formatNumber(2, 2, 1, 12)).toBe('02');
            expect(formatNumber(3, 2, 1, 12)).toBe('03');
            expect(formatNumber(4, 2, 1, 12)).toBe('04');
            expect(formatNumber(5, 2, 1, 12)).toBe('05');
            expect(formatNumber(6, 2, 1, 12)).toBe('06');
            expect(formatNumber(7, 2, 1, 12)).toBe('07');
            expect(formatNumber(8, 2, 1, 12)).toBe('08');
            expect(formatNumber(9, 2, 1, 12)).toBe('09');
            expect(formatNumber(10, 2, 1, 12)).toBe('10');
            expect(formatNumber(11, 2, 1, 12)).toBe('11');
            expect(formatNumber(12, 2, 1, 12)).toBe('12');
        });

        it('should format correctly when input is out of range', () => {
            expect(formatNumber(-1, 2, 1, 12)).toBe('01');
        });

        it('should format correctly when input is undefined', () => {
            expect(formatNumber(undefined, 2, 1, 12)).toBe('');
        });
    })
});