
const db = require('./config/connection');
const { Charity } = require('./models');

const charityData = [
    {
        name: 'Global Health Initiative',
        description: 'Dedicated to improving global health through innovative and sustainable health care solutions.',
        telephone: '800-123-4567',
        address: '1502 Health Ave, Global City, GC 98765',
        ein: '23-4567890',
        website: 'https://globalhealthinitiative.org',
        image: '/images/health.webp',  // Use relative path to image folder served by your server
        mission: 'To save lives, reduce disease, and help communities thrive across the globe.',
        rating: 'A'
    },
    {
        name: 'Education for All',
        description: 'Committed to providing quality education to underprivileged children worldwide.',
        telephone: '800-234-5678',
        address: '7202 Education Blvd, Learning Town, LT 87654',
        ein: '34-5678901',
        website: 'https://educationforall.org',
        image: '/images/education.webp',  // Use relative path
        mission: 'Empowering future generations through education.',
        rating: 'A+'
    },
    {
        name: 'Clean Water Access',
        description: 'Focusing on providing clean, safe drinking water to communities in need around the world.',
        telephone: '800-345-6789',
        address: '404 Water Way, Aqua City, AC 76543',
        ein: '45-6789012',
        website: 'https://cleanwateraccess.org',
        image: '/images/cleanplanet.webp',  // Use relative path
        mission: 'Ensuring every human has access to safe drinking water.',
        rating: 'A-'
    },
    {
        name: 'Wildlife Conservation Network',
        description: 'Protecting endangered species and their natural habitats through global conservation efforts.',
        telephone: '800-456-7890',
        address: '9085 Forest Ln, Jungle Town, JT 65432',
        ein: '56-7890123',
        website: 'https://wildlifeconservationnetwork.org',
        image: '/images/animal.webp',  // Use relative path
        mission: 'To conserve nature and its biodiversity by protecting wildlife and habitats.',
        rating: 'B+'
    }
];

db.once('open', async () => {
    // Perform seeding operations
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
