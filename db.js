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

exports.login = function(email) {
    return db
        .query(
            `SELECT *
            FROM users
            WHERE email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
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

exports.addPlant = function(
    name,
    type,
    location,
    user_id,
    date,
    last_watered,
    image
) {
    return db.query(
        `INSERT INTO plants (name, type, location, user_id, added_at, last_watered, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`,
        [name, type, location, user_id, date, last_watered, image]
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

exports.updatePlant = function(name, type, location, date, id) {
    return db
        .query(
            `UPDATE plants
        SET name = $1, type = $2, location = $3, added_at = $4
        WHERE id = $5
        RETURNING *`,
            [name, type, location, date, id]
        )
        .then(({ rows }) => rows);
};

exports.updatePlantImage = function(image, id) {
    return db
        .query(
            `UPDATE plants
        SET image = $1
        WHERE id = $2
        RETURNING *`,
            [image, id]
        )
        .then(({ rows }) => rows);
};

exports.deletePlant = function(id) {
    return db.query(
        `DELETE FROM plants
        WHERE id = $1
         RETURNING *`,
        [id]
    );
};

/////// WaterSchedule //////

exports.setReminder = function(id, reminder) {
    return db.query(
        `UPDATE plants
        SET reminder = $2
        WHERE id = $1
        RETURNING *
        `,
        [id, reminder]
    );
};

exports.setTimeDiff = (id, timeDiff) => {
    return db.query(
        `UPDATE plants
        SET time_diff = $2
        WHERE id = $1`,
        [id, timeDiff]
    );
};

exports.setAsWatered = (id, last_watered) => {
    return db.query(
        `UPDATE plants
        SET last_watered = $2, needs_water = false
        WHERE id = $1
        RETURNING *`,
        [id, last_watered]
    );
};

exports.setWaterNeed = (id, needs_water) => {
    return db.query(
        `UPDATE plants
        SET needs_water = $2
        WHERE id = $1`,
        [id, needs_water]
    );
};
