import {defineConfig} from 'drizzle-kit';
import "./src/db"
export default defineConfig({
    dialect: 'postgresql',
    schema: "./src/db/schema",
    out: './src/db',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    strict: true
})