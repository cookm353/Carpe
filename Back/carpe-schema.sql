DROP DATABASE IF EXISTS carpe;
CREATE DATABASE carpe;

\c carpe

DROP TABLE IF EXISTS entry;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    is_admin BOOLEAN,
    get_emails BOOLEAN
);

CREATE TABLE entry (
    entry_id SERIAL PRIMARY KEY,
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    took_am_meds BOOLEAN,
    took_pm_meds BOOLEAN,
    stress_level DECIMAL,
    activity_level DECIMAL,
    num_drinks INTEGER,
    sleep_quality DECIMAL,
    comment VARCHAR,
    num_auras INTEGER NOT NULL,
    num_seizures INTEGER NOT NULL,
    user_id INTEGER NOT NULL
        REFERENCES users ON DELETE CASCADE
);

DROP DATABASE IF EXISTS carpe_test;
CREATE DATABASE carpe_test;

\c carpe_test

DROP TABLE IF EXISTS entry;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    password VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    is_admin BOOLEAN,
    get_emails BOOLEAN
);

CREATE TABLE entry (
    entry_id SERIAL PRIMARY KEY,
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    took_am_meds BOOLEAN,
    took_pm_meds BOOLEAN,
    stress_level DECIMAL,
    activity_level DECIMAL,
    num_drinks INTEGER,
    sleep_quality DECIMAL,
    comment VARCHAR,
    num_auras INTEGER NOT NULL,
    num_seizures INTEGER NOT NULL,
    user_id INTEGER NOT NULL
        REFERENCES users ON DELETE CASCADE
);