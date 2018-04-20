const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        let from = 'Vadim';
        let text = 'Hello';

        let result = generateMessage(from,text);
        expect(result).toHaveProperty('from');
        expect(result).toHaveProperty('text');
        expect(typeof result.createAt).toBe('number');
        done();
    });

    it('should generate correct location object', (done) => {
        let from = 'Vadim';
        let latitude = 30;
        let longitude = 40;

        let expectUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let location = generateLocationMessage(from,latitude,longitude);

        expect(location.from).toBe(from);
        expect(location.url).toBe(expectUrl);
        done();
    });
});