const books = require('middleware/books');

module.exports = function routes(server) {
    /**
     * @api {get} / List books
     * @apiName GetBooks
     * @apiGroup Books
     *
     * @apiSuccess {Object} response Response data
     */
    server.get({ url: '/' },
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
    server.get({ url: '/:id',
        validation: {
            resources: {
                id: { isRequired: true },
            },
        } },
        books.getBook,
        genericResponse);

    /**
     * @api {get} / Get one book by author
     * @apiName GetBookByAuthor
     * @apiGroup Books
     *
     * @apiParam {String} author Book author address
     *
     * @apiSuccess {Object} response Response data
     */
    server.get({ url: '/author/:author_id',
        validation: {
            resources: {
                author_id: { isRequired: true },
            },
        } },
        books.getBookByAuthor,
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
    server.post({ url: '/',
        validation: {
            content: {
                title: { isRequired: true },
                author_id: { isRequired: true },
            },
        } },
        books.createBook,
        genericResponse);

    /**
     * @api {post} / Create books
     * @apiName PostImportBooks
     * @apiGroup Books
     *
     * @apiSuccess {Object} response Response data
     */
    server.post({ url: '/import',
        validation: {
            content: {
                title: { isRequired: true },
                author_id: { isRequired: true },
            },
        } },
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
    server.put({ url: '/:id',
        validation: {
            resources: {
                id: { isRequired: true },
            },
            content: {
                title: { isRequired: true },
                author_id: { isRequired: true },
            },
        } },
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
    server.del({ url: '/:id',
        validation: {
            resources: {
                id: { isRequired: true },
            },
        } },
        books.deleteBook,
        genericResponse);
};

function genericResponse(req, res) {
    res.send({
        data: res.data,
    });
}
