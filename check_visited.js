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
        const companies = await db.collection('companies').find({ type: 'visited' }).toArray();
        console.log(`Found ${companies.length} visited companies.`);

        for (const c of companies) {
            console.log(`Company: ${c.name}`);
            console.log(`Roles: ${c.roles || c.role}`);
            console.log(`Package: ${c.packageLPA}`);
            console.log(`Skills: ${c.requiredSkills}`);
            console.log(`Questions: ${c.questions ? c.questions.length : 0}`);
            if (c.questions && c.questions.length > 0) {
                console.log(`Sample Q: ${c.questions[0].question}`);
            }
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
