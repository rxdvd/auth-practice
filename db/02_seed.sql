DROP TABLE IF EXISTS tmp;

-- create temporary table to store json string as single entry
CREATE TABLE tmp(
    json_data text
);
COPY tmp FROM '/seed.json';

-- insert data from json into users table
INSERT INTO users (id, username, password)
SELECT p.* FROM tmp 
CROSS JOIN json_populate_recordset(NULL::users, json_data::json) p;

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

DROP TABLE tmp;
