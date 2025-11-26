const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

const companiesData = `Robosoft Technologies|Mobile Developer|5.0|Android,iOS,MVVM,Kotlin
GainInsights Solutions|BI Developer|4.5|SQL,BI Tools,OLAP,Data Warehousing
SAP|Associate Developer|8.0|Java,ABAP,ERP,ACID
ABH India Pvt Ltd|Software Developer|3.8|Java,SQL,API Testing,Healthcare IT
Novigo Solutions Pvt. Ltd.|Software Developer|4.5|Microservices,SQL,API Testing,Version Control
Semnox Solutions Pvt. Ltd.|Embedded Engineer|4.2|C,Embedded Systems,OSI,Pointers
Wipro Limited|Project Engineer|3.5|Java,Python,SDLC,OOP
Maventic Innovative Solutions Pvt. Ltd.|SAP Consultant|5.0|SAP,SQL,DBMS,Java
Juego Studios Pvt. Ltd.|Game Developer|4.5|C++,Unity,OOP,Game Development
Lixil Window Systems Pvt. Ltd.|Automation Engineer|4.0|PLC,IoT,Sensors,Manufacturing
Tech Mahindra|Associate Software Engineer|3.25|Java,C++,SQL,OOP
Infosys Limited|System Engineer|3.6|Java,Python,DBMS,Cloud
Kanini Software Solutions|Software Developer|4.5|REST API,Microservices,SQL,NoSQL
SLK Software Services Pvt. Ltd.|Software Engineer|4.0|Java,OOP,DBMS,SDLC
Mangalore Infotech Solutions Pvt. Ltd.|Software Developer|3.5|Cloud,C,Database,Client-Server
Riktam Technologies|Full Stack Developer|5.5|JavaScript,React,REST API,Git
UST IN|Software Engineer|5.0|Java,OOP,SQL,SDLC
CodeCraft Technologies Pvt. Ltd.|Software Developer|4.2|Java,C,REST API,MVC
Winman Software|Software Engineer|3.8|Java,Python,SDLC,DBMS
Cimpress India|DevOps Engineer|6.0|Cloud,Docker,CI/CD,Microservices`;

async function addCompanies() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('companies');

        const lines = companiesData.trim().split('\n');
        let addedCount = 0;
        let skippedCount = 0;

        for (const line of lines) {
            const [name, role, pkg, skillsStr] = line.split('|');
            const skills = skillsStr.split(',');
            
            const existing = await collection.findOne({ 
                name: { $regex: new RegExp(`^${name}$`, 'i') }, 
                type: 'visited' 
            });

            if (existing) {
                console.log(`⚠ ${name} already exists, skipping...`);
                skippedCount++;
            } else {
                const company = {
                    name,
                    roles: [role],
                    role,
                    packageLPA: parseFloat(pkg),
                    jobDescription: `${name} - ${role} position`,
                    visitDate: new Date('2021-09-01'),
                    requiredSkills: skills,
                    rounds: 3,
                    questions: [
                        { round: 1, question: "Solve aptitude questions involving percentages and ratios." },
                        { round: 1, question: "Analyze logical reasoning puzzles." },
                        { round: 1, question: "Answer programming fundamentals MCQs." },
                        { round: 1, question: "Interpret data from charts and graphs." },
                        { round: 1, question: "Solve English comprehension questions." },
                        { round: 1, question: "Identify patterns in number series." },
                        { round: 1, question: "Solve medium-difficulty reasoning problems." },
                        { round: 2, question: "Explain core technical concepts with examples." },
                        { round: 2, question: "Write programs for common algorithms." },
                        { round: 2, question: "Describe architecture and design patterns." },
                        { round: 2, question: "Explain database and SQL concepts." },
                        { round: 2, question: "Write code for data structure operations." },
                        { round: 2, question: "Discuss system design principles." },
                        { round: 2, question: "Explain framework-specific concepts." },
                        { round: 3, question: `Why do you want to join ${name}?` },
                        { round: 3, question: "Describe your technical strengths with examples." },
                        { round: 3, question: "Explain a challenging project you worked on." },
                        { round: 3, question: "Discuss how you handle pressure and deadlines." },
                        { round: 3, question: "Describe your teamwork experience." },
                        { round: 3, question: "Explain how you stay updated with technology." },
                        { round: 3, question: "Share your long-term career goals." }
                    ],
                    type: "visited",
                    createdAt: new Date()
                };

                await collection.insertOne(company);
                console.log(`✓ Added ${name} (21 questions, ${pkg} LPA)`);
                addedCount++;
            }
        }

        await client.close();
        console.log(`\n✓ Done! Added ${addedCount} companies to 2021, skipped ${skippedCount} existing.`);
        process.exit(0);
    } catch (err) {
        console.error('Script failed:', err);
        process.exit(1);
    }
}

addCompanies();
