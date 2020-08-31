import "dotenv/config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { PingResolver } from './resolvers/ping';
import { UserResolver } from './resolvers/userResolver';
import { RecipeResolver } from "./resolvers/RecipeResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";


export async function startServer() {
    const app = express();

    const server = new ApolloServer({
    schema: await buildSchema({
        resolvers: [
            PingResolver,
            UserResolver,
            RecipeResolver,
            CategoryResolver
        ]
        }),
        context: ({req, res}) => ({req, res})
    })

    server.applyMiddleware({app, path: '/graphql'});

    return app;

}



