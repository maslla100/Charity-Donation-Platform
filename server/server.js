require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const path = require('path');
const { getUserFromToken } = require('./utils/auth');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

// Serve static images from the client/src/images directory
app.use('/images', express.static(path.join(__dirname, '../client/src/images')));

// Instantiate ApolloServer with asynchronous context setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        // Get the user token from the headers
        const token = req.headers.authorization || '';

        // Use await to retrieve a user with the token
        const user = await getUserFromToken(token);

        // Add the user to the context
        return { user };
    },
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Serve up static assets if in production
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }

    db.once('open', () => {
        app.listen(PORT, () => console.log(`🚀 API server running on port ${PORT}`));
    });
}

startServer();
