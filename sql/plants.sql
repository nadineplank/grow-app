DROP TABLE IF EXISTS plants;

CREATE TABLE plants(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR,
    description VARCHAR
);
