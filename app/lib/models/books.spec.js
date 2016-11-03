describe('testing books query', () => {
	const Book = require('./book');

	it('should return an array of books', () => {
		Book.fetchAll()
			.then(books => {
				expect(books).toBeInstanceOf(Array);
			})
	});
});
