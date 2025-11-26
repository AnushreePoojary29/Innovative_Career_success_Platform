const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const AllowedWallet = require('../models/AllowedWallet');

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/placement-dashboard';

const WALLETS_TO_ADD = [
    // User provided address
    "0xf4a1d74285fbfaeeafb3f2733199dfad71aac672",

    // 10 Dummy addresses
    "0x1111111111111111111111111111111111111111",
    "0x2222222222222222222222222222222222222222",
    "0x3333333333333333333333333333333333333333",
    "0x4444444444444444444444444444444444444444",
    "0x5555555555555555555555555555555555555555",
    "0x6666666666666666666666666666666666666666",
    "0x7777777777777777777777777777777777777777",
    "0x8888888888888888888888888888888888888888",
    "0x9999999999999999999999999999999999999999",
    "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
];

async function seedWallets() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        for (const address of WALLETS_TO_ADD) {
            await AllowedWallet.findOneAndUpdate(
                { address: address.toLowerCase() },
                { address: address.toLowerCase() },
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${address}`);
        }

        console.log('All wallets seeded successfully.');
    } catch (err) {
        console.error('Error seeding wallets:', err);
    } finally {
        await mongoose.disconnect();
    }
}

seedWallets();
