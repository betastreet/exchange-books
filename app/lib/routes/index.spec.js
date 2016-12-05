const server = require('../index.js');
const request = require('supertest')(server);
const bookshelf = require('database');
const Book = require('models/book');

const bookId = 'BO455d7811ee785884b43f693fda7a17e2';
const authorId = 'AU42c611595f9da62c99f7e061f8df1ff2';

describe('API Endpoints', () =>{
    afterAll(server.close());

    describe('[GET] /', () => {

        it('should return a paginated list of books', (done) => {
            return request.get('/')
                .end((req, res) => {
                    expect(res.body.data).toBeInstanceOf(Array);
                    expect(res.body.pagination.page).toBe(1);
                    expect(res.body.pagination.pageSize).toBeDefined();
                    expect(res.body.pagination.rowCount).toBeDefined();
                    expect(res.body.pagination.pageCount).toBeDefined();
                    done();
                });
        });

    });

    describe('[GET] /:id', () => {
        it('should return a specific book entry based on id', (done) => {
            return request.get(`/${bookId}`)
                .end((req, res) => {
                    expect(res.body.data.id).toBe(bookId);
                    expect(res.body.data.author_id).toMatch(bookshelf.Model.prefixedUuidRegex('AU'));
                    expect(res.body.data.title).toBeDefined();
                    done();
                });
        });
    });

    describe('[GET] /author/:author_id', () => {
        it('should return all books for a specific author', (done) => {
            return request.get(`/author/${authorId}`)
                .end((req, res) => {
                    expect(res.body.data).toBeInstanceOf(Array);
                    expect(res.body.data[0].author_id).toBe(authorId);
                    expect(res.body.data[0].id).toMatch(bookshelf.Model.prefixedUuidRegex('BO'));
                    expect(res.body.data[0].title).toBeDefined();
                    done();
                });
        });
    });

    describe('[POST] /', () => {
        it('should create a new book object and return it', (done) => {
            const payload = {
                author_id: authorId,
                title: 'The Big Comfy Couch',
            };
            return request
                .post('/')
                .send(payload)
                .end((req, res) => {
                    const data = res.body.data;

                    expect(data.id).toMatch(bookshelf.Model.prefixedUuidRegex('BO'));
                    expect(data.author_id).toBe(authorId);
                    expect(data.title).toBeDefined();
                    done();
                });
        });
    });

    // this should be before the test for /import. The import will recreate the row deleted here.
    describe('[DELETE] /:id', () => {
        it ('should delete an existing book and return', (done) => {
            return request
                .delete(`/${bookId}`)
                .end((req, res) => {
                    expect(res.body.data).toBeInstanceOf(Object);
                    done();
                });
        });
    });

    describe('[POST] /import', () => {
        it ('should create bulk books and return them', (done) => {
            const payload = [{
                id: bookId,
                author_id: authorId,
                title: 'The Big Comfy Couch 2',
                deleted_at: null,
            }, {
                author_id: authorId,
                title: 'The Big Comfy Couch 3',
            }];
            return request
                .post('/import')
                .send(payload)
                .end((req, res) => {
                    const data = res.body.data;
                    expect(data[0].id).toMatch(bookshelf.Model.prefixedUuidRegex('BO'));
                    expect(data[0].author_id).toBe(authorId);
                    expect(data[0].title).toBeDefined();
                    done();
                });
        });
    });

    describe('[PUT] /:id', () => {
        it ('should update an existing book and return them', (done) => {
            const payload = {
                author_id: authorId,
                title: 'The Big Comfy Couch: Return of the Couch',
            };
            return request
                .put(`/${bookId}`)
                .send(payload)
                .end((req, res) => {
                    const data = res.body.data;

                    expect(data.id).toMatch(bookshelf.Model.prefixedUuidRegex('BO'));
                    expect(data.author_id).toBe(authorId);
                    expect(data.title).toBeDefined();
                    done();
                });
        });
    });
});
