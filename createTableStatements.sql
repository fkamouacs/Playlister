create table users(
    id serial,
    email varchar(30) unique,
    username varchar(30) unique,
    password varchar(30),
    primary key(id)

);

create table playlists(
    id serial,
    title varchar(30),
    user_id int,
    primary key(id),
    foreign key(user_id) references users(id)
);

create table artists(
    id serial,
    name varchar(30),
    primary key(id)
);

create table songs(
    id serial,
    title varchar(30),
    length decimal(2,2),
    artist_id int,
    primary key(id),
    foreign key(artist_id) references artists(id)
);

create table playlist_songs(
    playlist_id int,
    song_id int,
    foreign key (playlist_id) references playlists(id),
    foreign key (song_id) references songs(id)
);