
exports.up = function (knex, Promise) {
    return knex.schema.raw("CREATE FUNCTION `TO_POUUID`(pouuid CHAR(38)) RETURNS BINARY(18) DETERMINISTIC RETURN CONCAT(SUBSTR(pouuid, 1, 2), UNHEX(SUBSTR(pouuid, 3)));")
}

exports.down = function (knex, Promise) {
    return knex.schema.raw("DROP FUNCTION TO_POUUID")
};
