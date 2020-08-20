DROP TABLE IF EXISTS bookmarks_list;

CREATE TABLE IF NOT EXISTS bookmarks_list (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    rating INT NOT NULL,
    url TEXT NOT NULL,
    description TEXT
);