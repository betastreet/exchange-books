
exports.seed = function(knex, Promise) {
    return Promise.all([
        knex('books').insert({id: 1, name: 'The Fox and the Hound'}),
        knex('books').insert({id: 2, name: '1983'}),
        knex('books').insert({id: 3, name: 'Twilight'})
    ]);
};
