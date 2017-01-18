const ConsulPilot = require('consul-pilot');
const fs = require('fs');
const knexfile = require('../../knexfile').development;

if (process.env.NODE_ENV !== 'test') {
    ConsulPilot.watch(process.env.MYSQL_SERVICE, (err, service) => {
        if (err) console.error(err);

        console.log('New database connection reported', service, knexfile.connection.host);

        if (service.address && service.address !== knexfile.connection.host) {
            fs.appendFile(`${process.env.NODE_PATH}/../.env`, `\nMYSQL_HOST=${service.address}`, (err) => {
                process.exit(1);
            });
        }
    }).catch(console.error);
}

const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-multi-mask'));
bookshelf.plugin(require('bookshelf-prefixed-ordered-uuid'));
bookshelf.plugin(require('bookshelf-paranoia'));
bookshelf.plugin('pagination');
bookshelf.plugin(require('bookshelf-signals')());
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

module.exports = {
    bookshelf,
    knex,
};
