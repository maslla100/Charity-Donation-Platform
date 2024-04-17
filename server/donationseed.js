const db = require('./config/connection');
const { User, Charity, Donation } = require('./models');

// Function to seed donations for an existing user
async function seedDonationsForUser(email) {
  try {
    // Ensure database is connected
    await db;

    // Find the existing user
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log(`No user found with the email: ${email}`);
      return;
    }

    // Get charities and make donations
    const charities = await Charity.find({});
    const donationAmounts = [20, 30, 15, 50, 25, 45]; // Example amounts for each donation

    for (let i = 0; i < Math.min(charities.length, 6); i++) {
      const donation = new Donation({
        amount: donationAmounts[i],
        charity: charities[i]._id,
        user: user._id
      });
      await donation.save();
      console.log(`Donation of $${donation.amount} made to ${charities[i].name} at ${donation.createdAt}`);

    }
  } catch (err) {
    console.error('Error while seeding donations:', err);
  }
}

// Call the function with the specific user's email
seedDonationsForUser('luis.llamas@maslla.com').then(() => {
  console.log('Seeding donations for Luis Llamas complete');
  process.exit(0);
}).catch(err => {
  console.error('Failed to seed donations for Luis Llamas:', err);
  process.exit(1);
});
