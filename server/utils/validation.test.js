const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('Should reject non-string values', (done) => {
        let nonStingValue = 123456;
        expect(isRealString(nonStingValue)).toBeFalsy()
        done();
    });

    it('Should reject string with only spaces', (done) => {
        let nonStingValue = '          ';
        expect(isRealString(nonStingValue)).toBeFalsy()
        done();
    });

    it('Should alow string with non-space characters', (done) => {
        let nonStingValue = 'D';
        expect(isRealString(nonStingValue)).not.toBeFalsy();
        done();
    });

});