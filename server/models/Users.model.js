const pool = require('../config/configDB')

const createUserTable = async() => {
    console.log("creating user table");
    const userCreateQuery = `
    CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default",
    email character NOT NULL UNIQUE varying COLLATE pg_catalog."default",
    "mobileNumber" integer,
    height integer,
    password character varying COLLATE pg_catalog."default",
    aadhar character varying COLLATE pg_catalog."default",
    timeline integer[],
    "favActivities" integer[],
    weight integer,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;`

    pool.query(userCreateQuery)
        .then((res) => {
            console.log("user table created");
        })
        .catch((err) => {
            console.log(err,"user table creation failed");
        })
}


module.exports = { createUserTable }