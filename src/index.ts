import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import 'dotenv/config';
import { connectToDB } from './data-source';
// import { ApolloServer } from 'apollo-server-express';
// import { schema } from './models';

(async () => {
    try {
        await connectToDB();

        // const server = new ApolloServer({
        //     schema: schema
        // });

        const app = express();
        const port = process.env.PORT || 4200;

        // Apply Apollo GraphQL middleware
        // await server.start();
        // server.applyMiddleware({
        //     app
        // });

        app.use(bodyParser.json());

        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS"
            );
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            next();
        });

        app.use('/', routes);

        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
})();
