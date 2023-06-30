import * as dotenv from "dotenv";

dotenv.config();

export interface IOdooConfig {
  host: string;
  db: string;
  username: string;
  apikey: string;
}
