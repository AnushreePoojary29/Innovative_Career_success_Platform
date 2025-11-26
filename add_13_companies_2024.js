const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function addNewCompanies2024() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('companies');

        const newCompanies = [
            {
                name: "Cohesity",
                roles: ["Software Engineer"],
                role: "Software Engineer",
                packageLPA: 12.0,
                jobDescription: "Cohesity is a leader in next-gen data management, providing backup, recovery, and data protection solutions.",
                visitDate: new Date('2024-10-05'),
                requiredSkills: ["Data Structures", "Distributed Systems", "Java", "Python"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Aptitude questions on profit & loss and percentages" },
                    { round: 1, question: "Logical reasoning puzzles and seating arrangements" },
                    { round: 1, question: "Basic programming MCQs in Java and Python" },
                    { round: 1, question: "Data interpretation graphs and charts" },
                    { round: 1, question: "Number series and missing patterns" },
                    { round: 1, question: "Basic networking MCQs" },
                    { round: 2, question: "Explain data structures used in backup systems" },
                    { round: 2, question: "What is a distributed file system?" },
                    { round: 2, question: "Write a program to reverse a linked list" },
                    { round: 2, question: "Difference between concurrency and parallelism" },
                    { round: 2, question: "Explain REST API architecture" },
                    { round: 2, question: "What is RAID? Explain different RAID levels" },
                    { round: 3, question: "Introduce yourself" },
                    { round: 3, question: "Why do you want to join Cohesity?" },
                    { round: 3, question: "Strengths and weaknesses" },
                    { round: 3, question: "Tell me about a time you solved a technical problem" },
                    { round: 3, question: "Where do you see your career in data engineering/storage domain?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "Cisco",
                roles: ["Network Engineer"],
                role: "Network Engineer",
                packageLPA: 10.0,
                jobDescription: "Cisco is a worldwide leader in networking and cybersecurity solutions.",
                visitDate: new Date('2024-09-18'),
                requiredSkills: ["Networking", "TCP/IP", "Routing", "Switching"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Networking fundamentals MCQs" },
                    { round: 1, question: "Aptitude problems on speed & distance" },
                    { round: 1, question: "Logical reasoning: directions and blood relations" },
                    { round: 1, question: "Data interpretation tables" },
                    { round: 1, question: "English comprehension" },
                    { round: 1, question: "Number system and IP addressing basics" },
                    { round: 2, question: "Explain OSI vs TCP/IP models" },
                    { round: 2, question: "What is subnetting? Explain with an example" },
                    { round: 2, question: "Difference between switch and router" },
                    { round: 2, question: "Write a program to find the largest of 3 numbers" },
                    { round: 2, question: "Explain VLANs and trunking" },
                    { round: 2, question: "What is DNS and how does it work?" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why Cisco?" },
                    { round: 3, question: "Describe a situation where you showed leadership" },
                    { round: 3, question: "How do you stay updated with new technologies?" },
                    { round: 3, question: "What motivates you?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "Mindtree",
                roles: ["Software Engineer"],
                role: "Software Engineer",
                packageLPA: 3.5,
                jobDescription: "Mindtree is a global technology consulting and services company helping enterprises transform.",
                visitDate: new Date('2024-08-25'),
                requiredSkills: ["Java", "OOP", "DBMS", "Agile"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Aptitude questions on time & work" },
                    { round: 1, question: "Logical reasoning puzzles" },
                    { round: 1, question: "Basic C/Java MCQs" },
                    { round: 1, question: "English passage comprehension" },
                    { round: 1, question: "Data interpretation & bar charts" },
                    { round: 1, question: "Number patterns" },
                    { round: 2, question: "Explain OOP concepts" },
                    { round: 2, question: "Write a program to check prime numbers" },
                    { round: 2, question: "Explain Agile methodology" },
                    { round: 2, question: "Difference between class and object" },
                    { round: 2, question: "Explain database normalization" },
                    { round: 2, question: "What is polymorphism? Give example" },
                    { round: 3, question: "Introduce yourself" },
                    { round: 3, question: "Why Mindtree?" },
                    { round: 3, question: "Tell me your key strengths" },
                    { round: 3, question: "Describe a difficult team project" },
                    { round: 3, question: "Where do you see yourself 5 years from now?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "TCS",
                roles: ["Assistant System Engineer"],
                role: "Assistant System Engineer",
                packageLPA: 3.36,
                jobDescription: "TCS is a global leader in IT services, consulting, and business solutions.",
                visitDate: new Date('2024-08-30'),
                requiredSkills: ["Java", "SQL", "Aptitude", "Communication"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Quant aptitude (MI, SI, probability)" },
                    { round: 1, question: "Logical reasoning MCQs" },
                    { round: 1, question: "English grammar and paragraph ordering" },
                    { round: 1, question: "Basic coding output-based questions" },
                    { round: 1, question: "Data interpretation" },
                    { round: 1, question: "Alphabet and number series" },
                    { round: 2, question: "Explain SDLC" },
                    { round: 2, question: "Write a program to find factorial" },
                    { round: 2, question: "What is DBMS? Explain keys" },
                    { round: 2, question: "Difference between array and linked list" },
                    { round: 2, question: "What is cloud computing?" },
                    { round: 2, question: "Explain virtual memory" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why TCS?" },
                    { round: 3, question: "What is your biggest achievement?" },
                    { round: 3, question: "Describe a failure and what you learned" },
                    { round: 3, question: "Are you willing to relocate?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "Accolite",
                roles: ["Software Engineer"],
                role: "Software Engineer",
                packageLPA: 6.0,
                jobDescription: "Accolite is a product engineering and digital transformation company.",
                visitDate: new Date('2024-09-12'),
                requiredSkills: ["JavaScript", "Microservices", "SQL", "OOP"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Aptitude on permutations & combinations" },
                    { round: 1, question: "Logical reasoning and flow charts" },
                    { round: 1, question: "Basic coding MCQs in JavaScript" },
                    { round: 1, question: "English error detection" },
                    { round: 1, question: "Data interpretation tables" },
                    { round: 1, question: "Pattern identification" },
                    { round: 2, question: "Explain microservices architecture" },
                    { round: 2, question: "Write a program to sort an array" },
                    { round: 2, question: "Difference between REST and SOAP" },
                    { round: 2, question: "What is asynchronous programming?" },
                    { round: 2, question: "Explain OOP with real-life examples" },
                    { round: 2, question: "What are SQL joins?" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why Accolite?" },
                    { round: 3, question: "How do you handle pressure?" },
                    { round: 3, question: "Describe a project where you contributed significantly" },
                    { round: 3, question: "What are your career goals?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "Capgemini",
                roles: ["Software Engineer"],
                role: "Software Engineer",
                packageLPA: 4.0,
                jobDescription: "Capgemini is a global leader in consulting, technology services, and digital transformation.",
                visitDate: new Date('2024-09-25'),
                requiredSkills: ["Java", "SQL", "Communication", "SDLC"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Aptitude: percentages and averages" },
                    { round: 1, question: "Logical reasoning puzzles" },
                    { round: 1, question: "Basic C/Java programming output" },
                    { round: 1, question: "Reading comprehension" },
                    { round: 1, question: "Pattern recognition" },
                    { round: 1, question: "Data analysis" },
                    { round: 2, question: "Explain inheritance and its types" },
                    { round: 2, question: "Write a program to find GCD of two numbers" },
                    { round: 2, question: "What is encapsulation?" },
                    { round: 2, question: "Explain SDLC and Agile" },
                    { round: 2, question: "Difference between stack & queue" },
                    { round: 2, question: "What is deadlock in OS?" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why Capgemini?" },
                    { round: 3, question: "What are your strengths?" },
                    { round: 3, question: "Tell me about a conflict you solved" },
                    { round: 3, question: "Where do you see yourself in 3 years?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "Eurofins",
                roles: ["QA Engineer"],
                role: "QA Engineer",
                packageLPA: 3.5,
                jobDescription: "Eurofins is a global leader in bio-analytical testing and quality assurance services.",
                visitDate: new Date('2024-10-10'),
                requiredSkills: ["Testing", "Selenium", "SQL", "Python"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Basic quant aptitude" },
                    { round: 1, question: "Analytical reasoning" },
                    { round: 1, question: "MCQs on C and Python" },
                    { round: 1, question: "English grammar" },
                    { round: 1, question: "Data interpretation questions" },
                    { round: 1, question: "Number puzzles" },
                    { round: 2, question: "Explain automation testing" },
                    { round: 2, question: "What is Selenium?" },
                    { round: 2, question: "Write code to print Fibonacci series" },
                    { round: 2, question: "Difference between API testing and UI testing" },
                    { round: 2, question: "What is regression testing?" },
                    { round: 2, question: "Explain SQL constraints" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why Eurofins?" },
                    { round: 3, question: "What motivates you?" },
                    { round: 3, question: "Describe a time you overcame a difficult task" },
                    { round: 3, question: "What are your future goals?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "IBM",
                roles: ["Associate Systems Engineer"],
                role: "Associate Systems Engineer",
                packageLPA: 4.5,
                jobDescription: "IBM is a global technology and innovation company providing cloud, AI, and consulting services.",
                visitDate: new Date('2024-10-28'),
                requiredSkills: ["Java", "Python", "SQL", "Cloud"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Aptitude: algebra & probability" },
                    { round: 1, question: "Logical reasoning" },
                    { round: 1, question: "Basic coding MCQs" },
                    { round: 1, question: "Verbal ability" },
                    { round: 1, question: "Data interpretation with bar graphs" },
                    { round: 1, question: "Pattern recognition questions" },
                    { round: 2, question: "Explain OOP" },
                    { round: 2, question: "Write a program to check palindrome" },
                    { round: 2, question: "What is multithreading?" },
                    { round: 2, question: "Explain cloud service models (IaaS, PaaS, SaaS)" },
                    { round: 2, question: "Difference between SQL and NoSQL" },
                    { round: 2, question: "What is API gateway?" },
                    { round: 3, question: "Introduce yourself" },
                    { round: 3, question: "Why IBM?" },
                    { round: 3, question: "Strengths & weaknesses" },
                    { round: 3, question: "Tell me about a challenging academic task" },
                    { round: 3, question: "Where do you see your career in 5 years?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "MRI Software",
                roles: ["Software Developer"],
                role: "Software Developer",
                packageLPA: 5.0,
                jobDescription: "MRI Software provides real estate software solutions for property management and investment.",
                visitDate: new Date('2024-11-08'),
                requiredSkills: ["MVC", "REST API", "SQL", "OOP"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Logical reasoning questions" },
                    { round: 1, question: "Aptitude: ratios and percentages" },
                    { round: 1, question: "Basic coding MCQs" },
                    { round: 1, question: "English error detection" },
                    { round: 1, question: "Graph interpretation" },
                    { round: 1, question: "Number puzzles" },
                    { round: 2, question: "Explain MVC architecture" },
                    { round: 2, question: "Write a program to swap 2 numbers without a third variable" },
                    { round: 2, question: "What is REST API?" },
                    { round: 2, question: "What is database indexing?" },
                    { round: 2, question: "Explain OOP with examples" },
                    { round: 2, question: "What is unit testing?" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why MRI Software?" },
                    { round: 3, question: "What are your strengths?" },
                    { round: 3, question: "Describe a project you worked on" },
                    { round: 3, question: "How do you adapt to new technologies?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "GalaxE Solutions",
                roles: ["Software Engineer Trainee"],
                role: "Software Engineer Trainee",
                packageLPA: 4.0,
                jobDescription: "GalaxE Solutions focuses on IT consulting and business transformation with innovative technology solutions.",
                visitDate: new Date('2024-08-20'),
                requiredSkills: [".NET", "SQL", "C#", "SDLC"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Aptitude: time and distance" },
                    { round: 1, question: "Logical reasoning questions" },
                    { round: 1, question: "Programming MCQs (Java & C#)" },
                    { round: 1, question: "Reading comprehension" },
                    { round: 1, question: "Data interpretation" },
                    { round: 1, question: "Number series" },
                    { round: 2, question: "Explain SDLC" },
                    { round: 2, question: "Write a program to find factorial" },
                    { round: 2, question: "What is polymorphism?" },
                    { round: 2, question: "Difference between interface & class" },
                    { round: 2, question: "What is SQL join?" },
                    { round: 2, question: "Explain exception handling" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why GalaxE Solutions?" },
                    { round: 3, question: "What is your biggest strength?" },
                    { round: 3, question: "Tell me about a challenge you solved" },
                    { round: 3, question: "Where do you see yourself in future?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "Novigo Solutions",
                roles: ["Software Developer"],
                role: "Software Developer",
                packageLPA: 4.5,
                jobDescription: "Novigo Solutions provides IT consulting and software development services.",
                visitDate: new Date('2024-09-28'),
                requiredSkills: ["Microservices", "SQL", "Agile", "API Testing"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Aptitude on averages & percentages" },
                    { round: 1, question: "Logical thinking questions" },
                    { round: 1, question: "Basic SQL MCQs" },
                    { round: 1, question: "English comprehension" },
                    { round: 1, question: "Number series" },
                    { round: 1, question: "Reasoning puzzles" },
                    { round: 2, question: "Explain microservices" },
                    { round: 2, question: "What is API testing?" },
                    { round: 2, question: "Write a program to find prime numbers" },
                    { round: 2, question: "What is version control?" },
                    { round: 2, question: "Explain Agile" },
                    { round: 2, question: "What is normalization?" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why Novigo Solutions?" },
                    { round: 3, question: "Describe a difficult project you handled" },
                    { round: 3, question: "What are your strengths?" },
                    { round: 3, question: "Long-term career goals?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "Rapture Innovation Labs",
                roles: ["Embedded Engineer"],
                role: "Embedded Engineer",
                packageLPA: 4.0,
                jobDescription: "Rapture Innovation Labs specializes in embedded systems and IoT solutions.",
                visitDate: new Date('2024-10-18'),
                requiredSkills: ["C", "Embedded Systems", "Microcontrollers", "TCP/UDP"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Analytical reasoning" },
                    { round: 1, question: "Aptitude on speed, time, distance" },
                    { round: 1, question: "Basic coding MCQs (C, C++, Python)" },
                    { round: 1, question: "Data interpretation questions" },
                    { round: 1, question: "English grammar" },
                    { round: 1, question: "Pattern recognition" },
                    { round: 2, question: "Explain embedded systems" },
                    { round: 2, question: "Write a program to reverse a string" },
                    { round: 2, question: "What is memory management in C?" },
                    { round: 2, question: "Explain OOP principles" },
                    { round: 2, question: "Difference between TCP & UDP" },
                    { round: 2, question: "What is a microcontroller?" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why Rapture Innovation Labs?" },
                    { round: 3, question: "What is your strongest skill?" },
                    { round: 3, question: "Tell me about a time you solved a technical problem" },
                    { round: 3, question: "What motivates you?" }
                ],
                type: "visited",
                createdAt: new Date()
            },
            {
                name: "Infomatics India",
                roles: ["Software Developer"],
                role: "Software Developer",
                packageLPA: 3.8,
                jobDescription: "Infomatics India provides software development and IT consulting services.",
                visitDate: new Date('2024-11-15'),
                requiredSkills: ["Java", "SQL", "REST API", "OOP"],
                rounds: 3,
                questions: [
                    { round: 1, question: "Aptitude basics" },
                    { round: 1, question: "Logical reasoning" },
                    { round: 1, question: "Basic Java & SQL MCQs" },
                    { round: 1, question: "Data interpretation" },
                    { round: 1, question: "English comprehension" },
                    { round: 1, question: "Pattern-based questions" },
                    { round: 2, question: "Explain REST API" },
                    { round: 2, question: "Write code to find factorial" },
                    { round: 2, question: "Difference between class and object" },
                    { round: 2, question: "What is database indexing?" },
                    { round: 2, question: "What are HTTP methods?" },
                    { round: 2, question: "Explain OOP concepts" },
                    { round: 3, question: "Tell me about yourself" },
                    { round: 3, question: "Why Infomatics India?" },
                    { round: 3, question: "What are your strengths?" },
                    { round: 3, question: "Describe a challenge you faced in academics" },
                    { round: 3, question: "What is your long-term goal?" }
                ],
                type: "visited",
                createdAt: new Date()
            }
        ];

        let addedCount = 0;
        let skippedCount = 0;

        for (const company of newCompanies) {
            const existing = await collection.findOne({
                name: { $regex: new RegExp(`^${company.name}$`, 'i') },
                type: 'visited'
            });

            if (existing) {
                console.log(`⚠ ${company.name} already exists, skipping...`);
                skippedCount++;
            } else {
                await collection.insertOne(company);
                console.log(`✓ Added ${company.name} (${company.questions.length} questions, ${company.packageLPA} LPA)`);
                addedCount++;
            }
        }

        await client.close();
        console.log(`\n✓ Done! Added ${addedCount} new companies, skipped ${skippedCount} existing.`);
        process.exit(0);
    } catch (err) {
        console.error('Script failed:', err);
        process.exit(1);
    }
}

addNewCompanies2024();
