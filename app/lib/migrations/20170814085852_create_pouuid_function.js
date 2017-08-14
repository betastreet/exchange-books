
exports.up = function (knex, Promise) {
    return knex.schema.raw("CREATE FUNCTION `POUUID`(prefix CHAR(2), uuid BINARY(36)) RETURNS BINARY(18) DETERMINISTIC RETURN CONCAT(CONVERT(prefix, BINARY), UNHEX(CONCAT(SUBSTR(uuid, 15, 4),SUBSTR(uuid, 10, 4),SUBSTR(uuid, 1, 8),SUBSTR(uuid, 20, 4),SUBSTR(uuid, 25))));")
}

exports.down = function (knex, Promise) {
    return knex.schema.raw("DROP FUNCTION POUUID")
};
