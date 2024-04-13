require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const path = require('path');
const { getUserFromToken } = require('./utils/auth');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 100 requests per windowMs
});
app.use(apiLimiter);

app.use('/images', express.static(path.join(__dirname, '../client/src/images'), {
    maxAge: '1d', // Cache for 1 day
    immutable: true,
}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        return { user: await getUserFromToken(token) };
    },
    formatError: error => error,
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    db.on('error', error => console.error('Connection error:', error));
    db.once('open', () => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`🚀 API server running on port ${PORT}`));
    });
}

app.get('/health', (req, res) => res.send('OK'));

startServer();
