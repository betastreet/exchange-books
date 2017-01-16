const BookshelfConsulPilot = require('bookshelf-consul-pilot');
const knexfile = require('../../knexfile').development;
const path = require('path');

module.exports = new BookshelfConsulPilot(knexfile, process.env.MYSQL_HOST, path.join(__dirname, '/../models'), (bookshelf) => {
    bookshelf.plugin(require('bookshelf-multi-mask'));
    bookshelf.plugin(require('bookshelf-prefixed-ordered-uuid'));
    bookshelf.plugin(require('bookshelf-paranoia'));
    bookshelf.plugin('pagination');
    bookshelf.plugin(require('bookshelf-signals')());
    bookshelf.plugin(require('bookshelf-modelbase').pluggable);
}, process.env.NODE_ENV === 'test');
