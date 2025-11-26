const mongoose = require('mongoose');

const allowedWalletSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        type: String, // e.g., 'admin' or officer email
        default: 'admin'
    }
});

module.exports = mongoose.model('AllowedWallet', allowedWalletSchema);
