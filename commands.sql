CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Georges Bruges', 'http://georges.com', 'Georges blog', 1);
insert into blogs (author, url, title) values ('Antoine StEx', 'http://antoine.com', 'The Prince Story');
insert into blogs (author, url, title, likes) values ('Andrei Nicolae Besleaga', 'http://facebook.com', 'Painting Poetry',101);