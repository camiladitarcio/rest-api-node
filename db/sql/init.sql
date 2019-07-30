create table cars
(    id       serial not null
        constraint cars_pkey
            primary key,
    make     text,
    year     integer,
    model    text,
    fueltype text,
    trim     text,
    colors   text
);

create table client
(
    id       serial not null
        constraint client_pk
            primary key,
    email    text,
    password text
);
create unique index client_id_uindex
    on client (id);


