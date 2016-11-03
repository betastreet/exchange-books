const books = require('./../middleware/books-middleware');

module.exports = function(server) {

	server.get('/',
	    books.getBooks,
	    (req, res, next) => {
	        res.send({
	        	status: 200,
	        	data: res.data
	        });
	        // return next();
	    });

};
