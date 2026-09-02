require("dotenv").config();


const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.PG_URI);

async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result[0]);
}

getPgVersion();