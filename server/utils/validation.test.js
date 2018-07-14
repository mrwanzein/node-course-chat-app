const expect = require('expect');

let {isRealString} = require('./validation');

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        let res = isRealString(84);
        expect(res).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        let res = isRealString('      ');
        expect(res).toBe(false);
    });

    it('Should allow string with non-space characters', () => {
        let res = isRealString('  f ee   ');
        expect(res).toBe(false);
    });
});