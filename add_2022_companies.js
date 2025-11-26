const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function add2022Companies() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('companies');

        // Helper function to convert round-based questions to array format
        const convertQuestions = (rounds) => {
            const questions = [];
            if (rounds.round1) rounds.round1.forEach(q => questions.push({ round: 1, question: q }));
            if (rounds.round2) rounds.round2.forEach(q => questions.push({ round: 2, question: q }));
            if (rounds.round3) rounds.round3.forEach(q => questions.push({ round: 3, question: q }));
            return questions;
        };

        const companies2022 = [
            { name: "Accolite Digital", role: "Software Engineer", packageLPA: 6.5, skills: ["Microservices", "JavaScript", "React", "API"], rounds: { round1: ["Aptitude questions on percentages and probability", "Logical puzzles and data sufficiency", "Basic Java/React MCQs", "Time and distance problems", "Data interpretation charts"], round2: ["Explain microservices architecture", "What is asynchronous programming in JavaScript?", "Write a program to remove duplicates from an array", "Explain API gateway and load balancing", "Difference between REST and GraphQL"], round3: ["Tell me about a project with real-time API integration", "Why do you want to join Accolite?", "Describe a failure you learned from", "How do you keep your technical skills updated?", "Where do you see yourself in 4 years?"] } },
            { name: "Accolite (SheCodes)", role: "Software Developer", packageLPA: 6.0, skills: ["JavaScript", "HTML/CSS", "Problem Solving"], rounds: { round1: ["Basic coding MCQs in JavaScript", "Logical reasoning puzzles", "Aptitude questions on averages", "String manipulation output questions", "English comprehension passage"], round2: ["Explain event loop in JavaScript", "Write a program to reverse a string without using built-in functions", "Difference between var, let and const", "Explain client-side vs server-side rendering", "What is a promise?"], round3: ["Why do you want to join Accolite SheCodes?", "Tell me about your strongest technical skill", "Describe a time you solved a coding problem under pressure", "How do you handle conflicts in a team?", "What motivates you to code?"] } },
            { name: "Cohesity", role: "Software Engineer", packageLPA: 12.0, skills: ["Distributed Systems", "Java", "Python", "Networking"], rounds: { round1: ["Aptitude on profit-loss and algebra", "Logical seating arrangement puzzles", "Basic networking MCQs", "Programming MCQs (Java/Python)", "Data interpretation tables"], round2: ["Explain distributed storage systems", "What is RAID? Explain levels", "Write code to implement a stack using arrays", "Explain concurrency vs parallelism", "How does backup deduplication work?"], round3: ["Tell me about yourself", "Why Cohesity and storage domain?", "Describe a complex problem you solved", "How do you handle uncertainty?", "5-year goal in system design domain?"] } },
            { name: "Capgemini", role: "Software Engineer", packageLPA: 4.0, skills: ["Java", "SQL", "SDLC", "Agile"], rounds: { round1: ["Aptitude questions on averages", "Logical reasoning image-based puzzles", "Basic C and Java output questions", "Grammar correction questions", "Number series completion"], round2: ["Explain inheritance and its types", "Write a program to find prime numbers", "Explain waterfall vs agile model", "Difference between interface and abstract class", "Explain normalization in DBMS"], round3: ["Why Capgemini?", "Tell me about your strengths", "Describe a time you helped your team", "How do you manage deadlines?", "Long-term career plan?"] } },
            { name: "Eurofins", role: "QA Engineer", packageLPA: 3.5, skills: ["Testing", "Python", "SQL", "Selenium"], rounds: { round1: ["Aptitude on ratio and proportion", "Analytical reasoning puzzles", "Programming MCQs (C/Python)", "English error spotting", "Data interpretation (line graph)"], round2: ["Explain software testing life cycle", "Difference between API and UI testing", "Write code for Fibonacci series", "Explain regression testing", "How do SQL joins work?"], round3: ["Why Eurofins?", "Describe a difficult situation you solved", "How do you handle repetitive tasks?", "Tell me about a project you tested", "What motivates you in QA?"] } },
            { name: "DeltaX", role: "Software Developer", packageLPA: 5.5, skills: ["SQL", "NoSQL", "REST API", "ORM"], rounds: { round1: ["Aptitude word problems", "Logical reasoning tables", "Basic SQL MCQs", "Pattern recognition", "Time and work questions"], round2: ["Explain digital marketing automation", "Difference between SQL and NoSQL", "Program to find factorial", "Explain REST APIs", "What is ORM?"], round3: ["Why DeltaX?", "Tell me about your role in a database project", "How do you handle pressure?", "Teamwork example", "Your future goals?"] } },
            { name: "EPAM", role: "Software Engineer", packageLPA: 8.0, skills: ["Java", "Python", "SOLID", "Multithreading"], rounds: { round1: ["High-level aptitude questions", "Logical puzzles", "Coding MCQs in Java/Python", "Time-speed-distance", "Number patterns"], round2: ["Explain SOLID principles", "Write a program for quicksort", "What is dependency injection?", "Explain multithreading", "Difference between REST and SOAP"], round3: ["Why EPAM?", "Describe most complex code you wrote", "How do you handle tight deadlines?", "Do you prefer backend or frontend?", "5-year career plan?"] } },
            { name: "Gauri Technologies", role: "Software Developer", packageLPA: 3.5, skills: ["Java", "SQL", "CRM", "Exception Handling"], rounds: { round1: ["Aptitude basic mathematics", "Logical decision-making questions", "MCQs on Java", "Data interpretation charts", "English comprehension"], round2: ["Explain CRM systems", "Write a program to check palindrome", "Explain JOIN operations", "What is exception handling?", "Difference between array and list"], round3: ["Tell me about yourself", "Why Gauri Technologies?", "Explain a project you contributed to", "Handling conflicts in team", "Your career aspirations?"] } },
            { name: "TCS", role: "Assistant System Engineer", packageLPA: 3.36, skills: ["Java", "SQL", "SDLC", "Cloud"], rounds: { round1: ["Aptitude: SI & CI", "Logical puzzles", "Grammar correction", "Coding output questions", "Series questions"], round2: ["Explain SDLC", "Program to calculate factorial", "What is DBMS?", "Explain cloud computing", "Difference between array and linked list"], round3: ["Why TCS?", "Tell me your strengths", "Describe your final year project", "How do you handle failure?", "Relocation willingness?"] } },
            { name: "GalaxE Solutions", role: "Software Engineer Trainee", packageLPA: 4.0, skills: [".NET", "C#", "SQL", "Exception Handling"], rounds: { round1: ["Aptitude: time and work", "Logical puzzles", "C# and Java MCQs", "Data interpretation", "English comprehension"], round2: ["Explain .NET architecture", "Write code to find GCD", "Explain exception handling", "Difference between interface and class", "Explain SQL joins"], round3: ["Why GalaxE?", "Describe a challenge you solved", "Tell me your strengths", "Explain teamwork example", "Future career plan?"] } },
            { name: "Robosoft Technologies", role: "Mobile Developer", packageLPA: 5.0, skills: ["Java", "Kotlin", "Android", "MVVM"], rounds: { round1: ["Aptitude word problems", "Logical puzzles", "MCQs in Java/Kotlin", "Pattern recognition", "Data interpretation"], round2: ["Explain mobile app architecture", "Write a program for binary search", "Explain fragments in Android", "Difference between synchronous vs asynchronous", "Explain MVVM architecture"], round3: ["Why Robosoft?", "Tell me about a mobile project", "How do you handle bugs?", "Your strengths", "Career goals?"] } },
            { name: "GainInsights Solutions", role: "BI Developer", packageLPA: 4.5, skills: ["SQL", "BI Tools", "Data Warehousing", "OLAP"], rounds: { round1: ["Aptitude chart interpretation", "Logical reasoning", "Basic SQL MCQs", "Time and speed", "English comprehension"], round2: ["Explain BI tools", "Write a program to count vowels", "Explain data warehousing", "What are fact and dimension tables?", "Difference between OLAP and OLTP"], round3: ["Why GainInsights?", "Tell me about a data project", "Strengths & weaknesses", "Your biggest challenge faced", "Future BI goals"] } },
            { name: "SAP", role: "Associate Developer", packageLPA: 8.0, skills: ["Java", "ABAP", "ERP", "ACID"], rounds: { round1: ["Aptitude and reasoning", "Logical pattern recognition", "Basic Java MCQs", "English error detection", "Data interpretation"], round2: ["Explain ERP", "What is ABAP?", "Program to reverse a string", "Explain polymorphism", "Explain ACID properties"], round3: ["Why SAP?", "Strengths and weaknesses", "Explain your favorite project", "Where do you see yourself in 5 years?", "Why ERP domain?"] } },
            { name: "ABH India Pvt Ltd", role: "Software Developer", packageLPA: 3.8, skills: ["Java", "SQL", "API Testing", "Healthcare IT"], rounds: { round1: ["Basic arithmetic", "Logical puzzles", "MCQs on Java", "English reading comprehension", "Data table questions"], round2: ["Explain healthcare software systems", "What is API testing?", "Write a program for factorial", "Explain JOIN operations", "Difference between GET and POST"], round3: ["Why ABH?", "Describe a project you built", "Your strengths", "Explain a difficult situation", "Future plans?"] } },
            { name: "Novigo Solutions", role: "Software Developer", packageLPA: 4.5, skills: ["Microservices", "SQL", "API Testing", "Version Control"], rounds: { round1: ["Aptitude basic topics", "Logical puzzles", "SQL MCQs", "English comprehension", "Pattern recognition"], round2: ["Explain microservices", "What is API testing?", "Write a program to check prime numbers", "Explain version control", "Explain normalization"], round3: ["Why Novigo?", "Describe a difficult project", "Strengths", "Teamwork example", "Future goals"] } },
            { name: "Semnox Solutions", role: "Embedded Engineer", packageLPA: 4.2, skills: ["C", "Embedded Systems", "OSI Model", "Exception Handling"], rounds: { round1: ["Aptitude on percentages", "Logical reasoning puzzles", "C programming MCQs", "English comprehension", "Data interpretation"], round2: ["Explain embedded systems", "Write a program to find factorial", "Explain OSI model", "Difference between thread and process", "Explain exception handling"], round3: ["Why Semnox?", "Tell me about a technical challenge you solved", "Strengths", "Long-term goals", "Teamwork experience"] } },
            { name: "Wipro", role: "Project Engineer", packageLPA: 3.5, skills: ["Java", "Python", "SQL", "SDLC"], rounds: { round1: ["Aptitude: averages", "Logical puzzles", "Basic programming MCQs", "English grammar", "Time and distance"], round2: ["Explain OOP", "Write code for Fibonacci series", "Explain SDLC", "Difference between TCP and UDP", "Explain database normalization"], round3: ["Tell me about yourself", "Why Wipro?", "Your strengths", "Describe a challenge you handled", "Future plans?"] } },
            { name: "Maventic", role: "SAP Consultant", packageLPA: 5.0, skills: ["SAP", "SQL", "Agile", "Database Indexing"], rounds: { round1: ["Aptitude questions", "Logical reasoning", "Basic SQL MCQs", "English error spotting", "Number patterns"], round2: ["Explain SAP technologies", "Write a program to find reverse of a number", "What is exception handling?", "Explain database indexing", "What is Agile?"], round3: ["Why Maventic?", "Tell me about your project", "How do you handle pressure?", "Strengths", "5-year plan"] } },
            { name: "Juego Studios", role: "Game Developer", packageLPA: 4.5, skills: ["C++", "Unity", "OOP", "Game Development"], rounds: { round1: ["Aptitude basics", "Logical reasoning", "C++/Unity MCQs", "Pattern recognition", "English comprehension"], round2: ["Explain game loop architecture", "Write a program for matrix addition", "Difference between Unity and Unreal", "Explain OOP pillars", "What is render pipeline?"], round3: ["Why Juego Studios?", "Tell me about a game project", "Strengths", "Handling pressure", "Future goals in game dev"] } },
            { name: "Lixil Window Systems", role: "Automation Engineer", packageLPA: 4.0, skills: ["PLC", "IoT", "Sensors", "Manufacturing"], rounds: { round1: ["Aptitude calculations", "Logical questions", "Basic engineering MCQs", "English comprehension", "Data interpretation"], round2: ["Explain manufacturing process automation", "What is PLC?", "Write program for factorial", "Explain sensors used in industry", "What is IoT?"], round3: ["Why Lixil?", "Your strengths", "Describe a problem you solved", "Teamwork example", "Your future goals"] } },
            { name: "Tech Mahindra", role: "Associate Software Engineer", packageLPA: 3.25, skills: ["Java", "C++", "SQL", "OOP"], rounds: { round1: ["Aptitude on time and work", "Logical reasoning problems", "Basic programming MCQs", "English comprehension", "Data interpretation"], round2: ["Explain OOP with examples", "Write program for factorial using recursion", "Difference between stack and queue", "Explain SQL joins", "Explain pointers in C"], round3: ["Tell me about yourself", "Why Tech Mahindra?", "Your strengths", "Describe a challenging situation", "Where do you see yourself in 5 years?"] } },
            { name: "Infosys", role: "System Engineer", packageLPA: 3.6, skills: ["Java", "C++", "DBMS", "Cloud"], rounds: { round1: ["Aptitude questions", "Logical reasoning", "Coding basics MCQs", "English grammar", "Data interpretation"], round2: ["Explain OOP", "Write a program to check palindrome", "What is DBMS?", "Explain cloud computing", "Explain OS process concepts"], round3: ["Why Infosys?", "Describe your project", "Strengths & weaknesses", "Teamwork example", "Future career goals"] } },
            { name: "Kanini Software Solutions", role: "Software Developer", packageLPA: 4.5, skills: ["REST API", "Microservices", "SQL", "NoSQL"], rounds: { round1: ["Aptitude basics", "Logical puzzles", "C/Java output questions", "English comprehension", "Graph questions"], round2: ["Explain REST APIs", "Write program for array sorting", "Explain microservices", "Difference between SQL and NoSQL", "Explain exception handling"], round3: ["Why Kanini?", "Tell me about your project", "Strengths", "Explain a challenge you solved", "Future goals"] } },
            { name: "SLK Software", role: "Software Engineer", packageLPA: 4.0, skills: ["Java", "OOP", "DBMS", "SDLC"], rounds: { round1: ["Aptitude questions", "Logical reasoning", "Coding MCQs", "English grammar", "Number series"], round2: ["Explain Java OOP concepts", "Write program to reverse string", "Explain indexes in DBMS", "Explain SDLC", "Difference between thread & process"], round3: ["Tell me about yourself", "Why SLK Software?", "Describe a project challenge", "Strengths", "Future aspirations"] } },
            { name: "Mangalore Infotech", role: "Software Developer", packageLPA: 3.5, skills: ["Cloud", "C", "Database", "Client-Server"], rounds: { round1: ["Aptitude arithmetic", "Logical reasoning", "Basic coding output-based MCQs", "Data interpretation", "English comprehension"], round2: ["Explain cloud computing basics", "Write program to find factorial", "Explain client-server architecture", "Database normalization levels", "Explain C pointers"], round3: ["Why Mangalore Infotech?", "Explain your final year project", "Strengths", "How you handle deadlines", "Where you see yourself in future"] } }
        ];

        let addedCount = 0;
        let skippedCount = 0;

        for (const companyData of companies2022) {
            const existing = await collection.findOne({
                name: { $regex: new RegExp(`^${companyData.name}$`, 'i') },
                type: 'visited'
            });

            if (existing) {
                console.log(`⚠ ${companyData.name} already exists, skipping...`);
                skippedCount++;
            } else {
                const company = {
                    name: companyData.name,
                    roles: [companyData.role],
                    role: companyData.role,
                    packageLPA: companyData.packageLPA,
                    jobDescription: `${companyData.name} - ${companyData.role} position`,
                    visitDate: new Date('2022-09-01'),
                    requiredSkills: companyData.skills,
                    rounds: 3,
                    questions: convertQuestions(companyData.rounds),
                    type: "visited",
                    createdAt: new Date()
                };

                await collection.insertOne(company);
                console.log(`✓ Added ${company.name} (${company.questions.length} questions, ${company.packageLPA} LPA)`);
                addedCount++;
            }
        }

        await client.close();
        console.log(`\n✓ Done! Added ${addedCount} new companies to 2022, skipped ${skippedCount} existing.`);
        process.exit(0);
    } catch (err) {
        console.error('Script failed:', err);
        process.exit(1);
    }
}

add2022Companies();
