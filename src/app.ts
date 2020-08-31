import "dotenv/config";
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { PingResolver } from './resolvers/ping';
import { UserResolver } from './resolvers/userResolver';
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";
import { RecipeResolver } from "./resolvers/RecipeResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";


export async function startServer() {
    const app = express();
    app.use(cookieParser());
    app.post('/refresh_token', async (req, res) => {
        const token = req.cookies.jid
        if (!token) {
            return res.send({ ok: false, accessToken: ''});
        }
        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        } catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: ''});
        }

        // token is valid and we can send back an access
        const user = await User.findOne({ id: payload.userId });

        if (!user) {
            return res.send({ ok: false, accessToken: ''});
        };

        // for continuous refreshing
        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user)});
    })

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



