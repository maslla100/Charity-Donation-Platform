require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
//const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { getUserFromToken } = require('./utils/auth');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas/index');
const Stripe = require('stripe');
const stripe = Stripe(process.env.REACT_APP_STRIPE_API_KEY);  



// Charity schema definition
const charitySchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true, lowercase: true },
  description: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  telephone: { type: String, required: true, trim: true },
  logo: { type: String, required: false, trim: true },
  address: {
    number: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true }
  },
  ein: { type: String, required: true, trim: true },
  missionStatement: { type: String, required: true, trim: true },
  website: { type: String, required: false, trim: true },
  rating: { type: String, required: false }
});
const Charity = mongoose.models.Charity || mongoose.model('Charity', charitySchema);

const User = require('./models/User');
const Donation = require('./models/Donation');
const Feedback = require('./models/Feedback');

const PORT = process.env.PORT || 4000
const app = express();
// Remaining setup...


app.use(cors({
  origin: ["https://charity-donation-platform-l9s2.onrender.com", "http://localhost"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; 
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).send({ error: err.message });
  }
});



/*app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "https://charity-donation-platform-l9s2.onrender.com", "wss://charity-donation-platform-l9s2.onrender.com/graphql"]
    }
  },
  xssFilter: true,
  hidePoweredBy: true,
  hsts: {
    maxAge: 63072000, // 2 years
    includeSubDomains: true,
    preload: false
  }
}));*/



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
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
  persistedQueries: false,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await getUserFromToken(token);
    return { user, User, Charity, Donation, Feedback };
  },
  formatError: (error) => {
    console.error(error);
    return error;
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  db.on('error', (error) => console.error('Connection error:', error));
  db.once('open', () => {
    console.log('Database connected');
    const serverInstance = app.listen(PORT, () => {
      console.log(`🚀 API server running on port ${PORT}`);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP server');
      serverInstance.close(() => {
        console.log('HTTP server closed');
        db.close(() => {
          console.log('Database connection closed');
          process.exit(0);
        });
      });
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      serverInstance.close(() => {
        console.log('HTTP server closed');
        db.close(() => {
          console.log('Database connection closed');
          process.exit(0);
        });
      });
    });
  });
}

startServer();

app.get('/health', (req, res) => res.send('OK'));
