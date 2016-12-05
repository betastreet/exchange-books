const server = require('server');

describe('Module: Server', () => {

   describe('#onError', () => {
       it('should throw an error', () => {
           expect(server.onError).toThrowError();
       });
   });

    describe('#onListening', () => {
        it('should return true', () => {
            expect(server.onListening()).toBe(true);
        });
    });

});
