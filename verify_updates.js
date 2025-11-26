const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function verify() {
    const c = new MongoClient(process.env.MONGO_URI.replace('localhost', '127.0.0.1'));
    await c.connect();
    const db = c.db();
    const companies = await db.collection('companies').find({
        name: { $in: ['JEMS Inc', 'Hitachi KE Systems'] },
        type: 'visited'
    }).toArray();

    companies.forEach(co => {
        console.log(`${co.name}: ${co.packageLPA} LPA, ${co.questions.length} questions`);
    });

    await c.close();
    process.exit(0);
}

verify();
