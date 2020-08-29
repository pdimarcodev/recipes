import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { PingResolver } from './resolvers/ping';
import { UserResolver } from './resolvers/userResolver';


export async function startServer() {
    const app = express();

    const server = new ApolloServer({
    schema: await buildSchema({
        resolvers: [
            PingResolver,
            UserResolver
        ]
        }),
        context: ({req, res}) => ({req, res})
    })

    server.applyMiddleware({app, path: '/graphql'});

    return app;

}



