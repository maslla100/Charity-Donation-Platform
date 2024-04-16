const db = require('./config/connection');
const { Charity } = require('./models');
const mongoose = require('mongoose');

const charityData = [
  {
    name: 'global health initiative',
    description: 'Dedicated to improving global health through innovative and sustainable health care solutions.',
    email: 'contact@globalhealth.org',
    telephone: '800-123-4567',
    logo: '/images/health.webp',
    address: {
      number: '1502',
      street: 'Health Ave',
      city: 'Global City',
      state: 'GC',
      zipCode: '98765'
    },
    ein: '23-4567890',
    missionStatement: 'To save lives, reduce disease, and help communities thrive across the globe.',
    website: 'https://globalhealthinitiative.org',
    rating: 'A'
  },
  {
    name: 'education for all',
    description: 'Committed to providing quality education to underprivileged children worldwide.',
    email: 'support@educationforall.org',
    telephone: '800-234-5678',
    logo: '/images/education.webp',
    address: {
      number: '7202',
      street: 'Education Blvd',
      city: 'Learning Town',
      state: 'LT',
      zipCode: '87654'
    },
    ein: '34-5678901',
    missionStatement: 'Empowering future generations through education.',
    website: 'https://educationforall.org',
    rating: 'A+'
  },
  {
    name: 'clean water access',
    description: 'Focusing on providing clean, safe drinking water to communities in need around the world.',
    email: 'info@cleanwateraccess.org',
    telephone: '800-345-6789',
    logo: '/images/cleanwater.webp',
    address: {
      number: '404',
      street: 'Water Way',
      city: 'Aqua City',
      state: 'AC',
      zipCode: '76543'
    },
    ein: '45-6789012',
    missionStatement: 'Ensuring every human has access to safe drinking water.',
    website: 'https://cleanwateraccess.org',
    rating: 'A-'
  },
  {
    name: 'wildlife conservation network',
    description: 'Protecting endangered species and their natural habitats through global conservation efforts.',
    email: 'contact@wildlifeconservation.org',
    telephone: '800-456-7890',
    logo: '/images/wildlife.webp',
    address: {
      number: '9085',
      street: 'Forest Ln',
      city: 'Jungle Town',
      state: 'JT',
      zipCode: '65432'
    },
    ein: '56-7890123',
    missionStatement: 'To conserve nature and its biodiversity by protecting wildlife and habitats.',
    website: 'https://wildlifeconservationnetwork.org',
    rating: 'B+'
  }
];
// Function to seed database
async function seedDatabase() {
  try {
    // Deletes all existing entries and reinserts new sample data
    await Charity.deleteMany({});
    const charities = await Charity.insertMany(charityData);
    console.log('Data seeded successfully:', charities);
  } catch (err) {
    console.error('Error seeding data:', err);
    throw err; // Rethrow to be caught by the calling function
  }
}

// Connect to the database and seed data
db.once('open', async () => {
  console.log('Database connection open, starting seed operation...');
  try {
    await seedDatabase();
    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
});
