DROP TABLE IF EXISTS plants;

CREATE TABLE plants(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    image VARCHAR,
    
);
