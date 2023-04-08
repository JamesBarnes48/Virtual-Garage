const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

//db authentication config from .env file
const dbOptions = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  };

//initialise new db pool for use throughout file
const pool = new Pool(dbOptions);

//event listener for pool error catching
pool.on('error', function(err, client){
    console.error(new Date(), ' pool error ' + err + ' on client ' + client);
})

//exported function used for a standard query
module.exports = {
    asyncQuery: async (query, params) => {
        try{
            console.log('inthe query')
            const client = await pool.connect();
            console.log('connected')
            const response = await client.query(query, params);
            console.log('queried:');
            await client.release();
            console.log('ended');
            return response;
        }catch(err){
            console.error(new Date(), ' asyncQuery error ', err);
            return;
        }
    }
}  