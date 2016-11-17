const Book = require('models/book');
const bookshelf = require('database');

// Contents ===================
module.exports = {
    getBooks,
    getBook,
    getBookByAuthor,
    createBook,
    updateBook,
    importBooks,
    deleteBook,
};

function getBooks(req, res, next) {
    Book.fetchAll().then((books) => {
        res.data = books;
        return next();
    });
}

function getBook(req, res, next) {
    new Book({ id: req.params.id })
        .fetch()
        .then((book) => {
            res.data = book;
            return next();
        });
}

function getBookByAuthor(req, res, next) {
    new Book({ author_id: req.params.author_id })
        .fetch()
        .then((book) => {
            res.data = book;
            return next();
        });
}

function updateBook(req, res, next) {
    const params = req.body;
    if (req.params.id) params.id = req.params.id;
    new Book(params)
        .save()
        .then((book) => {
            res.data = book;
            return next();
        });
}

function createBook(req, res, next) {
    new Book(req.body)
        .save()
        .then((book) => {
            res.data = book;
            return next();
        });
}

function importBooks(req, res, next) {
    const p = [];
    req.body.forEach((book) => {
        p.push(new Book(book).save());
    });
    Promise.all(p).then((books) => {
        res.data = books;
        return next();
    });
}

function deleteBook(req, res, next) {
    new Book({ id: req.params.id })
        .destroy()
        .then((book) => {
            res.data = book;
            return next();
        });
}
