exports.up = function (knex, Promise) {
    return knex.schema.createTable('books', (table) => {
        table.binary('id', 18).primary();
        table.binary('author_id', 18).notNullable();
        table.string('title', 100).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').nullable().defaultTo(null);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('books');
};
