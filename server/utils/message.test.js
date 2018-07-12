let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Bob';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct geolocation object', () => {
        let from = 'Bob';
        let lat = 14;
        let lng = 54;
        let url = `https://www.google.com/maps?q=$14,54`;
        let message = generateLocationMessage(from, lat, lng);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});