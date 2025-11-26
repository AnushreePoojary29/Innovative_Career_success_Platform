const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AllowedWallet = require('../models/AllowedWallet');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/placement-dashboard';

async function addWallet() {
    const address = process.argv[2];
    if (!address) {
        console.error('Please provide a wallet address as an argument.');
        console.log('Usage: node add_allowed_wallet.js <0xAddress>');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        const result = await AllowedWallet.findOneAndUpdate(
            { address: address.toLowerCase() },
            { address: address.toLowerCase() },
            { upsert: true, new: true }
        );

        console.log(`Successfully added/updated wallet: ${result.address}`);
    } catch (err) {
        console.error('Error adding wallet:', err);
    } finally {
        await mongoose.disconnect();
    }
}

addWallet();
