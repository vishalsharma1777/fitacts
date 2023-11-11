const pool = require('../config/configDB')

const createActivitiesTable = async() => {
    console.log("creating activity table");
    const activityCreateQuery = `CREATE TABLE IF NOT EXISTS public.activites
    (
        activity_id integer NOT NULL DEFAULT nextval('activites_activity_id_seq'::regclass),
        "activityName" character varying COLLATE pg_catalog."default",
        calories integer,
        "benifitFor" character varying[] COLLATE pg_catalog."default",
        image character varying COLLATE pg_catalog."default",
        mts boolean,
        CONSTRAINT activites_pkey PRIMARY KEY (activity_id)
    )
    
    TABLESPACE pg_default;
    
    ALTER TABLE IF EXISTS public.activites
        OWNER to postgres;`

    pool.query(activityCreateQuery)
        .then((res) => {
            console.log("activity table created");
        })
        .catch((err) => {
            console.log(err,"activity table creation failed");
        })
}



module.exports = { createActivitiesTable }