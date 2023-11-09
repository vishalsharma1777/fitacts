const pool = require('../config/configDB')

const createPerformanceTable = async() => {
    console.log("creating performance table");
    const performanceCreateQuery = `CREATE TABLE IF NOT EXISTS public.performances
    (
        performance_id integer NOT NULL DEFAULT nextval('performances_performance_id_seq'::regclass),
        "performanceName" character varying COLLATE pg_catalog."default",
        duration integer,
        distance integer,
        speed integer,
        mts boolean,
        user_id integer,
        activity_id integer,
        created_at timestamp without time zone,
        CONSTRAINT performances_pkey PRIMARY KEY (performance_id),
        CONSTRAINT performances_activity_id_fkey FOREIGN KEY (activity_id)
            REFERENCES public.activites (activity_id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION,
        CONSTRAINT performances_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES public.users (user_id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )
    
    TABLESPACE pg_default;
    
    ALTER TABLE IF EXISTS public.performances
        OWNER to postgres;`

    pool.query(performanceCreateQuery)
        .then((res) => {
            console.log("performance table created");
        })
        .catch((err) => {
            console.log(err,"performance table creation failed");
        })
}


module.exports = { createPerformanceTable }