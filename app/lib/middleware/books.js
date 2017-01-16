const db = require('database');

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
    db.model('book').fetchPage({ page: req.query.page || 1, pageSize: req.query.limit || 10 })
        .then((books) => {
            res.data = books;
            return next();
        }).catch(next);
}

function getBook(req, res, next) {
    db.model('book').findById(req.params.id)
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}

function getBooksByAuthor(req, res, next) {
    db.model('book').findAll({ author_id: req.params.author_id })
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}

function updateBook(req, res, next) {
    const params = req.body;
    db.model('book').update(params, { id: req.params.id || params.id })
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}

function createBook(req, res, next) {
    db.model('book').create(req.body)
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}

function importBooks(req, res, next) {
    const p = [];
    req.body.forEach((book) => {
        p.push(db.model('book').upsert({
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
    db.model('book').destroy({ id: req.params.id })
        .then((book) => {
            res.data = book;
            return next();
        }).catch(next);
}
