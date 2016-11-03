const Book = require('./../models/book');

// Logging ====================
const log = require('debug');
const logStream = log('APP:HTTP:MIDDLEWARE:BOOKS');

// Contents ===================
module.exports = {
    getBooks,
};

function getBooks(req, res, next) {
    Book.fetchAll().then((books) => {
    	res.data = books;
    	return next();
    });
}
