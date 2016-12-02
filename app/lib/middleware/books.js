const Book = require('models/book');

// Contents ===================
module.exports = {
    getBooks,
    getBook,
    getBooksByAuthor,
    createBook,
    updateBook,
    importBooks,
    deleteBook,
};

function getBooks(req, res, next) {
    Book.fetchPage({ page: req.query.page || 1, pageSize: req.query.limit || 10 })
        .then((books) => {
            res.data = books.models;
            res.pagination = books.pagination;
            return next();
        }).catch(next);
}

function getBook(req, res, next) {
    Book.findById(req.params.id)
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}

function getBooksByAuthor(req, res, next) {
    Book.findAll({ author_id: req.params.author_id })
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}

function updateBook(req, res, next) {
    const params = req.body;
    Book.update(params, { id: req.params.id || params.id })
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}

function createBook(req, res, next) {
    Book.create(req.body)
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}

function importBooks(req, res, next) {
    const p = [];
    req.body.forEach((book) => {
        p.push(Book.upsert({
            author_id: book.author_id,
            title: book.title,
        }, book));
    });
    Promise.all(p).then((books) => {
        res.data = books;
        return next();
    }).catch(next);
}

function deleteBook(req, res, next) {
    Book.destroy({ id: req.params.id })
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}
