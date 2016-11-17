// This is just an example of how Jest works, the mpst useful things to test
// in this micro-service would be the middleware and any custom model methods
// that may exist.

describe('testing books query', () => {
    const Book = require('./book');

    it('should return an array of books', () => {
        Book.fetchAll()
            .then((books) => {
                expect(books).toBeInstanceOf(Array);
            });
    });
});
