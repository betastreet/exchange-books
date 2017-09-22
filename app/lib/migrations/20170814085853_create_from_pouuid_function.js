
exports.up = function (knex, Promise) {
    return knex.schema.raw("CREATE FUNCTION `FROM_POUUID`(pouuid BINARY(18)) RETURNS CHAR(38) DETERMINISTIC RETURN CONCAT(SUBSTR(pouuid, 1, 2), LOWER(HEX(SUBSTR(pouuid, 3))));")
}

exports.down = function (knex, Promise) {
    return knex.schema.raw("DROP FUNCTION FROM_POUUID")
};
