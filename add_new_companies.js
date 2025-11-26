const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function addNewCompanies() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('companies');

        // Read 2024 companies file
        const filePath = path.join(__dirname, 'server', 'data', 'companies_2024.json');
        const companies = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        console.log(`Found ${companies.length} companies in 2024 file\n`);

        for (const company of companies) {
            // Check if company already exists
            const existing = await collection.findOne({
                name: { $regex: new RegExp(`^${company.name}$`, 'i') },
                type: 'visited'
            });

            if (existing) {
                console.log(`⚠ ${company.name} already exists, skipping...`);
            } else {
                // Insert new company
                await collection.insertOne(company);
                console.log(`✓ Added new company: ${company.name} (${company.questions?.length || 0} questions)`);
            }
        }

        await client.close();
        console.log('\n✓ Done adding new companies!');
        process.exit(0);
    } catch (err) {
        console.error('Script failed:', err);
        process.exit(1);
    }
}

addNewCompanies();
