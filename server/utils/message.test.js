const expect = require('expect');
var {generateMessage} = require('./message');

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

});