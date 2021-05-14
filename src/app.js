import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middleware";

const PORT = 4000;

const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({
        request,
        isAuthenticated,
    }),
});

server.express.use(authenticateJwt);

// run
server.start({ port: PORT }, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
);
