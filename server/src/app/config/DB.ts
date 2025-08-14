import { neon } from "@neondatabase/serverless";
import config from ".";
const sql = neon(`${config.database_url}`);
export default sql;
