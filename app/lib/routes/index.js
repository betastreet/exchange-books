const books = require('middleware/books');

module.exports = function routes(server) {
    /**
     * @api {get} / List books
     * @apiName GetBooks
     * @apiGroup Books
     *
     * @apiSuccess {Object} response Response data
     */
    server.get('/',
        books.getBooks,
        genericResponse);

    /**
     * @api {get} / Get one book
     * @apiName GetBook
     * @apiGroup Books
     *
     * @apiParam {String} id Book ID
     *
     * @apiSuccess {Object} response Response data
     */
    server.get('/:id',
        books.getBook,
        genericResponse);

    /**
     * @api {get} / Get books by author
     * @apiName GetBooksByAuthor
     * @apiGroup Books
     *
     * @apiParam {String} author Book author ID
     *
     * @apiSuccess {Object} response Response data
     */
    server.get('/author/:author_id',
        books.getBooksByAuthor,
        genericResponse);

    /**
     * @api {post} / Create one book
     * @apiName PostBook
     * @apiGroup Books
     *
     * @apiParam {String} [title] Title of the book
     * @apiParam {String} [author_id] ID of the author
     *
     * @apiSuccess {Object} response Response data
     */
    server.post('/',
        books.createBook,
        genericResponse);

    /**
     * @api {post} / Create books
     * @apiName PostImportBooks
     * @apiGroup Books
     *
     * @apiSuccess {Object} response Response data
     */
    server.post('/import',
        books.importBooks,
        genericResponse);

    /**
     * @api {put} / Update one book
     * @apiName PutBook
     * @apiGroup Books
     *
     * @apiParam {String} id ID of the book
     * @apiParam {String} [title] Title of the book
     * @apiParam {String} [author_id] ID of the author
     *
     * @apiSuccess {Object} response Response data
     */
    server.put('/:id',
        books.updateBook,
        genericResponse);

    /**
     * @api {delete} / Delete one book
     * @apiName DeleteBook
     * @apiGroup Books
     *
     * @apiParam {String} id ID of the book
     *
     * @apiSuccess {Object} response Response data
     */
    server.del('/:id',
        books.deleteBook,
        genericResponse);
};

function genericResponse(req, res) {
    const response = {
        data: res.data,
        pagination: res.pagination,
    };
    res.send(response);
}
