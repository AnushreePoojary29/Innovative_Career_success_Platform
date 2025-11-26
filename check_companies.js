const mongoose = require('mongoose');
const Company = require('./server/models/company');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected');
        const companies = await Company.find({ type: 'upcoming' }).sort({ visitDate: 1 });
        console.log('Upcoming Companies:', companies.map(c => c.name));
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
