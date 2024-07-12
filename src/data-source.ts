import "reflect-metadata"
import { DataSource } from "typeorm"
import entities from './entity/index';
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: entities,
    migrations: [
        './src/migration/*'
    ],
    subscribers: [],
});

export const connectToDB = async () => {
    try {
        const connection = await AppDataSource.initialize();
        console.log("Connected to PostgreSQL database");
        return connection;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
}