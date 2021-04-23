import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";

const PORT = 4000;

const server = new GraphQLServer({schema, context:({request})=>({
    request
  })
});

// run
server.start({ port: PORT}, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

