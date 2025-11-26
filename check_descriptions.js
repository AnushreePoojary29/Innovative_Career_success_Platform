const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function check() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const companies = await db.collection('companies').find({ type: 'upcoming' }).toArray();
        console.log(`Found ${companies.length} upcoming companies.`);

        for (const c of companies) {
            console.log(`Company: ${c.name}`);
            console.log(`Job Description Length: ${c.jobDescription ? c.jobDescription.length : 'MISSING'}`);
            console.log(`Job Description Start: ${c.jobDescription ? c.jobDescription.substring(0, 50) : 'N/A'}`);
            console.log('---');
        }

        await client.close();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
