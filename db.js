const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/growapp"
);

exports.addUser = function(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email`,
        [first, last, email, password]
    );
};

exports.getUser = function(id) {
    return db
        .query(
            `SELECT *
            FROM users
            WHERE id = $1`,
            [id]
        )
        .then(({ rows }) => rows);
};

exports.storeCode = function(email, secretCode) {
    return db.query(
        `INSERT INTO reset (email, code)
            VALUES ($1, $2)
            ON CONFLICT (email)
            DO UPDATE SET code = $2
            created_at = now()
            RETURNING code`,
        [email, secretCode]
    );
};

exports.verify = function(email) {
    return db
        .query(
            `SELECT code
            FROM reset
            WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
            AND email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
};

exports.updatePassword = function(password, email) {
    return db.query(
        `UPDATE users
    SET password = $1
    WHERE email = $2`,
        [password, email]
    );
};

exports.updateProfileImage = function(image, id) {
    return db
        .query(
            `UPDATE users
        SET image = $1
        WHERE id = $2
        RETURNING image`,
            [image, id]
        )
        .then(({ rows }) => rows);
};

// PLANTS

exports.addPlant = function(name, type, location, user_id) {
    return db.query(
        `INSERT INTO plants (name, type, location, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [name, type, location, user_id]
    );
};

exports.getPlants = function(user_id) {
    return db
        .query(
            `SELECT *
        FROM plants
        WHERE user_id = $1`,
            [user_id]
        )
        .then(({ rows }) => rows);
};

exports.updatePlantImage = function(image, id) {
    return db
        .query(
            `UPDATE plants
        SET image = $1
        WHERE id = $2
        RETURNING image`,
            [image, id]
        )
        .then(({ rows }) => rows);
};

exports.deletePlant = function(id) {
    return db.query(
        `DELETE FROM plants
        WHERE id = $1
         `,
        [id]
    );
};

exports.getIndividualPlant = function(id) {
    return db
        .query(
            `SELECT * FROM plants
        WHERE id = $1`,
            [id]
        )
        .then(({ rows }) => rows);
};
