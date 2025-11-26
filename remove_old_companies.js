const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function removeOldCompanies() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('companies');

        // Delete companies from 2019 and 2020
        const result = await collection.deleteMany({
            type: 'visited',
            visitDate: {
                $gte: new Date('2019-01-01'),
                $lt: new Date('2021-01-01')
            }
        });

        console.log(`✓ Deleted ${result.deletedCount} companies from 2019-2020`);

        await client.close();
        process.exit(0);
    } catch (err) {
        console.error('Script failed:', err);
        process.exit(1);
    }
}

removeOldCompanies();
