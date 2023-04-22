CREATE KEYSPACE IF NOT EXISTS tutorialkeyspace
    WITH replication = {'class': 'SingleRegionStrategy'};

CREATE TABLE IF NOT EXISTS tutorialkeyspace.tutorialtable (
    name text,
    email text,
    age int,
    PRIMARY KEY (email)
);

INSERT INTO tutorialkeyspace.tutorialtable (name, email, age)
VALUES ('John', 'john@example.com', 21);
-- VALUES ('Pako', 'pakojhon@example.com', 2);
-- VALUES ('Ale', 'alejohn@example.com', 30);
-- VALUES ('Nallelly', 'frailejon@example.com', 60);