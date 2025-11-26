const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function add2021Companies() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('companies');

        const convertQuestions = (rounds) => {
            const questions = [];
            if (rounds.round1) rounds.round1.forEach(q => questions.push({ round: 1, question: q }));
            if (rounds.round2) rounds.round2.forEach(q => questions.push({ round: 2, question: q }));
            if (rounds.round3) rounds.round3.forEach(q => questions.push({ round: 3, question: q }));
            return questions;
        };

        const companies2021 = [
            {
                name: "Accolite Digital",
                role: "Software Engineer",
                packageLPA: 6.5,
                skills: ["Microservices", "JavaScript", "Java", "API Gateway"],
                rounds: {
                    round1: [
                        "Solve medium-level aptitude questions involving percentages and averages.",
                        "Analyze logical reasoning questions such as seating arrangements.",
                        "Answer Java and JavaScript fundamentals MCQs.",
                        "Interpret data from bar charts and tables.",
                        "Solve time-speed-distance based questions.",
                        "Identify patterns in numerical series.",
                        "Solve moderate logical deduction problems."
                    ],
                    round2: [
                        "Explain microservices architecture with a real-world example.",
                        "Write a program to remove duplicates from an array.",
                        "Describe asynchronous programming in JavaScript.",
                        "Explain the difference between REST and GraphQL.",
                        "Discuss design patterns used in scalable applications.",
                        "Write code to check if a string is a palindrome.",
                        "Explain how API Gateway works in distributed systems."
                    ],
                    round3: [
                        "Explain why you want to join Accolite Digital.",
                        "Describe a complex technical bug you solved.",
                        "Discuss your technical strengths with examples.",
                        "Talk about a time you handled pressure during a project.",
                        "Share how you stay updated with new technologies.",
                        "Describe a time you collaborated with a team effectively.",
                        "Explain your long-term career goals in software engineering."
                    ]
                }
            },
            {
                name: "Accolite (SheCodes)",
                role: "Software Developer",
                packageLPA: 6.0,
                skills: ["JavaScript", "Event Loop", "Promises", "Front-end"],
                rounds: {
                    round1: [
                        "Solve JavaScript and coding fundamentals MCQs.",
                        "Identify patterns in logical sequences.",
                        "Answer output-based questions in JavaScript.",
                        "Read and understand English comprehension paragraphs.",
                        "Solve average-based aptitude questions.",
                        "Analyze basic programming flowcharts.",
                        "Solve medium difficulty logical puzzles."
                    ],
                    round2: [
                        "Explain the JavaScript Event Loop with examples.",
                        "Write a function to reverse a string manually.",
                        "Compare var, let, and const with examples.",
                        "Explain the difference between client-side and server-side rendering.",
                        "Describe how promises work in JavaScript.",
                        "Write a program to check for prime numbers.",
                        "Explain callback functions and their use cases."
                    ],
                    round3: [
                        "Explain why you want to join SheCodes.",
                        "Describe your strongest coding skill.",
                        "Explain a situation where you solved a debugging issue.",
                        "Talk about a time you handled constructive feedback.",
                        "Describe how you manage tasks during tight deadlines.",
                        "Explain how you learn new technologies quickly.",
                        "Share your long-term goals in front-end development."
                    ]
                }
            },
            {
                name: "Cohesity",
                role: "Software Engineer",
                packageLPA: 12.0,
                skills: ["Distributed Systems", "RAID", "Java", "Python"],
                rounds: {
                    round1: [
                        "Solve aptitude questions involving profit-loss and ratios.",
                        "Answer basic networking MCQs.",
                        "Solve logical puzzles like seating arrangements.",
                        "Interpret data from complex tables.",
                        "Answer Java/Python basic programming MCQs.",
                        "Solve percentage-based word problems.",
                        "Identify patterns in data-related number series."
                    ],
                    round2: [
                        "Explain distributed storage systems with examples.",
                        "Describe RAID levels and their differences.",
                        "Implement a stack using arrays in code.",
                        "Explain concurrency and parallelism clearly.",
                        "Discuss backup deduplication techniques.",
                        "Write a program for binary search.",
                        "Explain the concept of snapshots in storage."
                    ],
                    round3: [
                        "Describe why you want to work in storage technology.",
                        "Explain a technical challenge you solved.",
                        "Discuss your strengths related to backend engineering.",
                        "Explain how you troubleshoot complex errors.",
                        "Talk about your experience working in teams.",
                        "Describe your long-term interest in system design.",
                        "Explain how you stay motivated in challenging tasks."
                    ]
                }
            },
            {
                name: "Capgemini",
                role: "Software Engineer",
                packageLPA: 4.0,
                skills: ["Java", "OOP", "Agile", "DBMS"],
                rounds: {
                    round1: [
                        "Solve aptitude questions involving averages and ratios.",
                        "Analyze logical puzzles with conditional statements.",
                        "Answer output-based questions in C and Java.",
                        "Solve English grammar correction questions.",
                        "Identify numeric patterns in series.",
                        "Interpret bar graphs and simple charts.",
                        "Solve classification-based reasoning questions."
                    ],
                    round2: [
                        "Explain inheritance and its types in OOP.",
                        "Write a program to find the GCD of two numbers.",
                        "Explain the Agile methodology with examples.",
                        "Describe abstraction vs encapsulation.",
                        "Explain what a database transaction is.",
                        "Write a program to check Armstrong numbers.",
                        "Explain multithreading in Java."
                    ],
                    round3: [
                        "Explain why you want to join Capgemini.",
                        "Describe your major strengths with examples.",
                        "Explain a situation where you helped your team.",
                        "Talk about how you deal with deadlines.",
                        "Describe a failure and what you learned.",
                        "Explain how you adapt to new environments.",
                        "Share your career goals for the next 3 years."
                    ]
                }
            },
            {
                name: "Eurofins",
                role: "QA Engineer",
                packageLPA: 3.5,
                skills: ["Testing", "Python", "SQL", "STLC"],
                rounds: {
                    round1: [
                        "Solve aptitude questions on ratio and proportion.",
                        "Analyze logical reasoning questions.",
                        "Answer Python and C basic MCQs.",
                        "Solve spotting error questions in English.",
                        "Interpret line graph-based data.",
                        "Solve puzzle-based reasoning questions.",
                        "Identify number patterns in sequences."
                    ],
                    round2: [
                        "Explain the software testing life cycle.",
                        "Describe the difference between UI testing and API testing.",
                        "Write a program to generate the Fibonacci series.",
                        "Explain regression testing with an example.",
                        "Discuss SQL constraints and their usage.",
                        "Write a program to count vowels in a string.",
                        "Explain boundary value analysis."
                    ],
                    round3: [
                        "Explain why you're interested in Eurofins.",
                        "Talk about your motivation for QA/testing.",
                        "Describe a time you solved a testing challenge.",
                        "Explain your strengths in attention to detail.",
                        "Tell about a time you handled repetitive work.",
                        "Discuss teamwork and communication skills.",
                        "Share your future career plans in QA."
                    ]
                }
            },
            {
                name: "DeltaX",
                role: "Software Developer",
                packageLPA: 5.5,
                skills: ["SQL", "NoSQL", "REST API", "ORM"],
                rounds: {
                    round1: [
                        "Solve aptitude word problems.",
                        "Interpret data from tabular data.",
                        "Answer SQL query-based MCQs.",
                        "Solve reasoning questions involving directions.",
                        "Complete number series problems.",
                        "Solve questions on averages and partnerships.",
                        "Analyze logical arrangement puzzles."
                    ],
                    round2: [
                        "Explain digital marketing automation tools.",
                        "Write a program to calculate factorial iteratively.",
                        "Discuss the difference between SQL and NoSQL.",
                        "Explain REST API architecture.",
                        "Describe the use of ORM frameworks.",
                        "Write code to sort an array.",
                        "Explain the purpose of indexing in databases."
                    ],
                    round3: [
                        "Explain why you want to join DeltaX.",
                        "Describe a project where you worked with databases.",
                        "Discuss how you handle pressure in deadlines.",
                        "Explain your key technical strengths.",
                        "Describe how you solve unexpected errors.",
                        "Talk about your experience working in a team.",
                        "Share your long-term technical goals."
                    ]
                }
            },
            {
                name: "EPAM",
                role: "Software Engineer",
                packageLPA: 8.0,
                skills: ["SOLID", "Multithreading", "Java", "Algorithms"],
                rounds: {
                    round1: [
                        "Solve medium-level aptitude questions.",
                        "Answer DS/Algo-based MCQs.",
                        "Solve logical puzzles involving patterns.",
                        "Interpret bar graph data.",
                        "Answer programming basics questions.",
                        "Solve number series questions.",
                        "Identify correct outputs for code snippets."
                    ],
                    round2: [
                        "Explain SOLID principles with examples.",
                        "Write code for quicksort algorithm.",
                        "Describe dependency injection.",
                        "Explain multithreading with real examples.",
                        "Discuss REST vs SOAP architecture differences.",
                        "Write code to reverse a linked list.",
                        "Explain hash maps and their performance."
                    ],
                    round3: [
                        "Explain why you want to join EPAM.",
                        "Describe a difficult coding problem you solved.",
                        "Discuss how you manage time when overloaded.",
                        "Explain your preferred tech stack and why.",
                        "Describe a teamwork experience.",
                        "Explain how you achieve continuous learning.",
                        "Share your future development goals."
                    ]
                }
            },
            {
                name: "Gauri Technologies",
                role: "Software Developer",
                packageLPA: 3.5,
                skills: ["Java", "CRM", "SQL", "REST"],
                rounds: {
                    round1: [
                        "Solve arithmetic aptitude questions.",
                        "Answer logical deduction questions.",
                        "Solve Java fundamentals MCQs.",
                        "Interpret small data sets.",
                        "Answer English comprehension questions.",
                        "Solve medium reasoning puzzles.",
                        "Identify missing numbers in patterns."
                    ],
                    round2: [
                        "Explain CRM systems and their purpose.",
                        "Write a program to check palindrome strings.",
                        "Explain different SQL JOIN types.",
                        "Describe exception handling in Java.",
                        "Write a program to remove spaces from a string.",
                        "Explain RESTful services.",
                        "Describe collections in Java."
                    ],
                    round3: [
                        "Explain why you want to work at Gauri.",
                        "Discuss your project contributions.",
                        "Describe your communication strengths.",
                        "Explain a time you overcame a technical hurdle.",
                        "Talk about teamwork experience.",
                        "Describe how you organize tasks.",
                        "Share your long-term goals."
                    ]
                }
            },
            {
                name: "Tata Consultancy Services",
                role: "Assistant System Engineer",
                packageLPA: 3.36,
                skills: ["Java", "SDLC", "DBMS", "Cloud"],
                rounds: {
                    round1: [
                        "Solve aptitude questions involving SI and CI.",
                        "Answer logical reasoning caselets.",
                        "Solve English paragraph ordering questions.",
                        "Answer basic coding output questions.",
                        "Interpret simple data charts.",
                        "Solve alphabet series questions.",
                        "Identify grammar errors."
                    ],
                    round2: [
                        "Explain the SDLC models.",
                        "Write a recursive factorial function.",
                        "Describe DBMS and keys in relational databases.",
                        "Explain cloud computing models.",
                        "Write code to find the largest number in an array.",
                        "Explain polymorphism with examples.",
                        "Discuss OS process management basics."
                    ],
                    round3: [
                        "Explain why you want to join TCS.",
                        "Describe your greatest achievement.",
                        "Talk about your final year project.",
                        "Explain a time you handled failure.",
                        "Describe how you manage deadlines.",
                        "Explain your teamwork skills.",
                        "Share your long-term career goals."
                    ]
                }
            },
            {
                name: "GalaxE Solutions",
                role: "Software Engineer Trainee",
                packageLPA: 4.0,
                skills: [".NET", "C#", "SQL", "OOP"],
                rounds: {
                    round1: [
                        "Solve aptitude questions on time and distance.",
                        "Answer logical reasoning scenarios.",
                        "Solve Java and C# MCQs.",
                        "Interpret data from graphs.",
                        "Complete number pattern questions.",
                        "Analyze logical puzzles.",
                        "Identify English grammar corrections."
                    ],
                    round2: [
                        "Explain .NET architecture and its components.",
                        "Write a program to find GCD of two numbers.",
                        "Discuss exception handling in detail.",
                        "Explain SQL JOINs with examples.",
                        "Write a program to reverse an array.",
                        "Explain OOP with real-world examples.",
                        "Describe multithreading in C#."
                    ],
                    round3: [
                        "Explain why you want to work at GalaxE.",
                        "Describe your key strengths.",
                        "Explain a difficult situation you solved.",
                        "Discuss how you collaborate in teams.",
                        "Describe how you handle project pressure.",
                        "Explain your preferred programming domain.",
                        "Share your 5-year career goals."
                    ]
                }
            }
        ];

        let addedCount = 0;
        let skippedCount = 0;

        for (const companyData of companies2021) {
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
                    visitDate: new Date('2021-09-01'),
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
        console.log(`\n✓ Done! Added ${addedCount} new companies to 2021, skipped ${skippedCount} existing.`);
        process.exit(0);
    } catch (err) {
        console.error('Script failed:', err);
        process.exit(1);
    }
}

add2021Companies();
