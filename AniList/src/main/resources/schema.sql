CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS shows (
    show_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Foreign key referencing the users table
    name VARCHAR(255) NOT NULL,
    showType VARCHAR(255),
    episodesWatched INT,
    lastSeenDescription TEXT,
    imageUrl VARCHAR(255),
    customUrl VARCHAR(255),
    malUrl VARCHAR(255),
    `timeStamp` TIME DEFAULT "00:00:00",
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS stream_info (
    stream_info_id INT AUTO_INCREMENT PRIMARY KEY,
    show_id INT,  -- Foreign key referencing the shows table
    stream VARCHAR(255),
    url VARCHAR(255),
    FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE
);

