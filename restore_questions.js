const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function restoreQuestions() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('companies');

        // Read all company JSON files
        const dataDir = path.join(__dirname, 'server', 'data');
        const files = fs.readdirSync(dataDir).filter(f => f.startsWith('companies_') && f.endsWith('.json'));

        console.log(`Found ${files.length} data files`);

        for (const file of files) {
            const filePath = path.join(dataDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8').trim();

            // Skip empty files
            if (!fileContent) {
                console.log(`Skipping empty file: ${file}`);
                continue;
            }

            let data;
            try {
                data = JSON.parse(fileContent);
            } catch (e) {
                console.error(`Failed to parse ${file}:`, e.message);
                continue;
            }

            // Handle both array format and object with companies field
            const companies = Array.isArray(data) ? data : (data.companies || []);

            console.log(`\nProcessing ${file} with ${companies.length} companies...`);

            for (const company of companies) {
                const filter = {
                    name: { $regex: new RegExp(`^${company.name}$`, 'i') },
                    type: 'visited'
                };

                // Only update the questions field, preserve other data
                const update = {
                    $set: {
                        questions: company.questions || []
                    }
                };

                try {
                    const result = await collection.updateOne(filter, update);
                    if (result.matchedCount > 0) {
                        console.log(`✓ Restored questions for ${company.name} (${company.questions?.length || 0} questions)`);
                    } else {
                        console.log(`⚠ No match found for ${company.name}`);
                    }
                } catch (e) {
                    console.error(`✗ Failed to restore ${company.name}:`, e.message);
                }
            }
        }

        await client.close();
        console.log('\n✓ Done restoring questions!');
        process.exit(0);
    } catch (err) {
        console.error('Script failed:', err);
        process.exit(1);
    }
}

restoreQuestions();
