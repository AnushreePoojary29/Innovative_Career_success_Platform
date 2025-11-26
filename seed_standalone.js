const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function seed() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('companies');

        const seeds = [
            {
                name: "Endava",
                roles: ["Software Engineer", "Tester"],
                packageLPA: 6.5,
                visitDate: new Date('2025-08-15'),
                requiredSkills: ["Java", "React"],
                rounds: 3,
                jobDescription: "As a Software Engineer at Endava, you will work with cross-functional teams to design, develop, and maintain high-quality software solutions. You will be involved in the full software development lifecycle, from requirements analysis to testing and deployment. Key responsibilities include writing clean, scalable code, participating in code reviews, and troubleshooting issues. Strong knowledge of Java and React is essential."
            },
            {
                name: "Deloitte",
                roles: ["Analyst", "Consultant"],
                packageLPA: 7.6,
                visitDate: new Date('2025-09-01'),
                requiredSkills: ["Python", "SQL"],
                rounds: 4,
                jobDescription: "Join Deloitte as an Analyst or Consultant and help clients solve complex business problems through technology. You will analyze data, gather requirements, and implement solutions using Python and SQL. This role requires strong analytical skills, excellent communication, and the ability to work in a fast-paced environment. You will collaborate with global teams to deliver value-driven results."
            },
            {
                name: "Infosys",
                roles: ["System Engineer"],
                packageLPA: 3.6,
                visitDate: new Date('2025-09-10'),
                requiredSkills: ["C++", "Java"],
                rounds: 2,
                jobDescription: "Infosys is looking for System Engineers to join our dynamic team. In this role, you will be responsible for software development, maintenance, and support. You will work on various projects involving C++ and Java, ensuring high performance and reliability. Training will be provided to enhance your technical skills and domain knowledge."
            },
            {
                name: "Cognizant",
                roles: ["GenC", "GenC Next"],
                packageLPA: 4.5,
                visitDate: new Date('2025-09-20'),
                requiredSkills: ["Java", "Communication"],
                rounds: 3,
                jobDescription: "Cognizant is hiring for GenC and GenC Next roles. We are looking for fresh graduates with a strong foundation in programming and a passion for technology. You will work on digital transformation projects, utilizing Java and other modern technologies. Good communication skills and a willingness to learn are key to success in this role."
            },
            {
                name: "Kyndryl",
                roles: ["Associate"],
                packageLPA: 5.0,
                visitDate: new Date('2025-10-05'),
                requiredSkills: ["Cloud", "Linux"],
                rounds: 3,
                jobDescription: "Start your career as an Associate at Kyndryl, the world's largest IT infrastructure services provider. You will support mission-critical systems for global clients, working with Cloud technologies and Linux environments. This role offers opportunities to learn and grow in the fields of cloud computing, cybersecurity, and data management."
            },
            {
                name: "Ecolab",
                roles: ["Graduate Trainee"],
                packageLPA: 6.0,
                visitDate: new Date('2025-10-15'),
                requiredSkills: ["Chemical", "Management"],
                rounds: 2,
                jobDescription: "Ecolab is seeking Graduate Trainees to join our team. This program is designed to develop future leaders in the water, hygiene, and energy technologies sectors. You will gain hands-on experience in project management, chemical engineering, and sustainability solutions. We are looking for motivated individuals with a strong academic background and leadership potential."
            },
            {
                name: "Microsoft",
                roles: ["SDE"],
                packageLPA: 45.0,
                visitDate: new Date('2025-11-01'),
                requiredSkills: ["DSA", "System Design"],
                rounds: 5,
                jobDescription: "Microsoft is hiring Software Development Engineers (SDE) to build world-class products. You will work on solving complex problems in distributed systems, AI, and cloud computing. Proficiency in Data Structures and Algorithms (DSA) and System Design is required. Join us to empower every person and every organization on the planet to achieve more."
            }
        ];

        for (const s of seeds) {
            const filter = { name: { $regex: new RegExp(`^${s.name}$`, 'i') }, type: 'upcoming' };
            const update = { $set: { ...s, type: 'upcoming' } };
            const options = { upsert: true };

            try {
                await collection.updateOne(filter, update, options);
                console.log(`Upserted Upcoming: ${s.name}`);
            } catch (e) {
                console.error(`Failed to upsert ${s.name}`, e.message);
            }
        }

        const visitedSeeds = [
            {
                name: "Accenture",
                roles: ["Associate Software Engineer"],
                packageLPA: 4.5,
                visitDate: new Date('2023-09-15'),
                requiredSkills: ["Java", "SQL", "Communication"],
                rounds: 3,
                jobDescription: "Join Accenture as an Associate Software Engineer. You will work on developing, designing, and maintaining technologies that improve the way our clients and the world works.",
                questions: [
                    { round: 1, question: "Explain the difference between abstract class and interface in Java." },
                    { round: 1, question: "Write a SQL query to find the second highest salary." },
                    { round: 2, question: "Describe a challenging project you worked on." }
                ]
            },
            {
                name: "Galaxe Solutions",
                roles: ["Software Engineer Trainee"],
                packageLPA: 4.0,
                visitDate: new Date('2023-08-20'),
                requiredSkills: [".NET", "SQL", "C#"],
                rounds: 3,
                jobDescription: "Galaxe Solutions is hiring Software Engineer Trainees. You will be trained in .NET technologies and work on enterprise-level applications.",
                questions: [
                    { round: 1, question: "What is the difference between value type and reference type in C#?" },
                    { round: 1, question: "Explain the concept of normalization in databases." }
                ]
            },
            {
                name: "Recruit CRM",
                roles: ["Full Stack Developer Intern"],
                packageLPA: 5.0,
                visitDate: new Date('2023-10-01'),
                requiredSkills: ["React", "Node.js", "MongoDB"],
                rounds: 3,
                jobDescription: "Recruit CRM is looking for Full Stack Developer Interns. You will work on our core product, building features using React and Node.js.",
                questions: [
                    { round: 1, question: "Explain the virtual DOM in React." },
                    { round: 2, question: "How does Node.js handle asynchronous operations?" }
                ]
            },
            {
                name: "Deloitte",
                roles: ["Analyst"],
                packageLPA: 7.6,
                visitDate: new Date('2023-09-05'),
                requiredSkills: ["Python", "SQL", "Data Analysis"],
                rounds: 4,
                jobDescription: "Deloitte is hiring Analysts to help clients solve complex business problems. Strong analytical and communication skills are required.",
                questions: [
                    { round: 1, question: "What are the key differences between Python 2 and Python 3?" },
                    { round: 2, question: "Explain the different types of joins in SQL." }
                ]
            },
            {
                name: "Mu Sigma",
                roles: ["Data Analyst"],
                packageLPA: 3.5,
                visitDate: new Date('2023-11-10'),
                requiredSkills: ["Statistics", "Python", "Excel"],
                rounds: 3,
                jobDescription: "Mu Sigma is seeking Data Analysts to work on data-driven decision making for Fortune 500 clients.",
                questions: [
                    { round: 1, question: "Explain the Central Limit Theorem." },
                    { round: 1, question: "How do you handle missing data in a dataset?" }
                ]
            },
            {
                name: "Google",
                roles: ["Software Engineer (SWE)"],
                packageLPA: 30.0,
                visitDate: new Date('2023-12-01'),
                requiredSkills: ["C++", "Java", "DSA", "System Design"],
                rounds: 5,
                jobDescription: "Google is hiring Software Engineers to build world-class products. Proficiency in DSA and System Design is a must.",
                questions: [
                    { round: 1, question: "Reverse a linked list." },
                    { round: 1, question: "Find the median of two sorted arrays." },
                    { round: 2, question: "Design a URL shortening service like bit.ly." }
                ]
            },
            {
                name: "Microsoft",
                roles: ["Software Development Engineer (SDE)"],
                packageLPA: 45.0,
                visitDate: new Date('2023-11-15'),
                requiredSkills: ["C#", "Java", "SQL", "Cloud"],
                rounds: 4,
                jobDescription: "Microsoft is looking for SDEs to work on Azure, Office, and other core products.",
                questions: [
                    { round: 1, question: "Explain the concept of polymorphism." },
                    { round: 2, question: "Design a parking lot system." }
                ]
            },
            {
                name: "Walmart Global Tech India",
                roles: ["Software Engineer"],
                packageLPA: 18.0,
                visitDate: new Date('2023-10-25'),
                requiredSkills: ["Java", "Spring Boot", "SQL"],
                rounds: 3,
                jobDescription: "Walmart Global Tech is hiring Software Engineers to build scalable e-commerce solutions.",
                questions: [
                    { round: 1, question: "Explain the internal working of HashMap in Java." },
                    { round: 2, question: "How do you handle transactions in Spring Boot?" }
                ]
            },
            {
                name: "Invenger Technologies",
                roles: ["Software Developer"],
                packageLPA: 3.5,
                visitDate: new Date('2023-08-10'),
                requiredSkills: ["Java", "SQL"],
                rounds: 2,
                jobDescription: "Invenger Technologies is hiring Software Developers for their Mangalore office.",
                questions: [
                    { round: 1, question: "Write a Java program to check for palindrome." },
                    { round: 1, question: "Explain the ACID properties in databases." }
                ]
            },
            {
                name: "Salesforce",
                roles: ["Associate Software Engineer"],
                packageLPA: 25.0,
                visitDate: new Date('2024-01-15'),
                requiredSkills: ["Java", "Apex", "OOP"],
                rounds: 4,
                jobDescription: "Salesforce is hiring Associate Software Engineers to build the next generation of CRM solutions.",
                questions: [
                    { round: 1, question: "Explain the concept of Governor Limits in Salesforce." },
                    { round: 2, question: "Design a scalable notification system." }
                ]
            },
            {
                name: "Eleation",
                roles: ["Design Engineer Trainee"],
                packageLPA: 3.0,
                visitDate: new Date('2023-07-20'),
                requiredSkills: ["AutoCAD", "SolidWorks"],
                rounds: 2,
                jobDescription: "Eleation is hiring Design Engineer Trainees for their engineering services division.",
                questions: [
                    { round: 1, question: "Explain the difference between stress and strain." },
                    { round: 1, question: "Draw the shear force and bending moment diagram for a simply supported beam." }
                ]
            },
            {
                name: "Capgemini",
                roles: ["Software Engineer"],
                packageLPA: 4.0,
                visitDate: new Date('2023-09-25'),
                requiredSkills: ["Java", "SQL", "Communication"],
                rounds: 3,
                jobDescription: "Capgemini is hiring Software Engineers to work on digital transformation projects.",
                questions: [
                    { round: 1, question: "Explain the different types of inheritance in Java." },
                    { round: 1, question: "Write a SQL query to join two tables." }
                ]
            },
            {
                name: "Kyndryl",
                roles: ["Associate Technical Engineer"],
                packageLPA: 5.0,
                visitDate: new Date('2023-10-10'),
                requiredSkills: ["Linux", "Networking", "Python"],
                rounds: 3,
                jobDescription: "Kyndryl is hiring Associate Technical Engineers to support critical infrastructure.",
                questions: [
                    { round: 1, question: "Explain the boot process of Linux." },
                    { round: 1, question: "What is the difference between TCP and UDP?" }
                ]
            },
            {
                name: "Amazon",
                roles: ["SDE I"],
                packageLPA: 28.0,
                visitDate: new Date('2023-11-20'),
                requiredSkills: ["Java", "DSA", "System Design"],
                rounds: 4,
                jobDescription: "Amazon is hiring SDE Is to build customer-centric solutions.",
                questions: [
                    { round: 1, question: "Find the missing number in an array." },
                    { round: 2, question: "Design a vending machine." }
                ]
            },
            {
                name: "TCS",
                roles: ["Assistant System Engineer"],
                packageLPA: 3.36,
                visitDate: new Date('2023-08-30'),
                requiredSkills: ["Java", "SQL", "Aptitude"],
                rounds: 2,
                jobDescription: "TCS is hiring Assistant System Engineers for their digital and ninja profiles.",
                questions: [
                    { round: 1, question: "Solve a time and work problem." },
                    { round: 1, question: "Explain the concept of pointers in C." }
                ]
            },
            {
                name: "iWave Systems",
                roles: ["Embedded Engineer"],
                packageLPA: 4.0,
                visitDate: new Date('2023-09-12'),
                requiredSkills: ["C", "Embedded Systems"],
                rounds: 3,
                jobDescription: "iWave Systems is hiring Embedded Engineers to work on hardware-software integration.",
                questions: [
                    { round: 1, question: "Explain the volatile keyword in C." },
                    { round: 1, question: "How do you handle interrupts in embedded systems?" }
                ]
            },
            {
                name: "Sasken Technologies",
                roles: ["Software Engineer"],
                packageLPA: 4.5,
                visitDate: new Date('2023-10-18'),
                requiredSkills: ["C", "C++", "Linux"],
                rounds: 3,
                jobDescription: "Sasken is hiring Software Engineers for their R&D division.",
                questions: [
                    { round: 1, question: "Explain the memory layout of a C program." },
                    { round: 1, question: "What is a semaphore?" }
                ]
            },
            {
                name: "Cognizant",
                roles: ["Programmer Analyst Trainee"],
                packageLPA: 4.0,
                visitDate: new Date('2023-09-22'),
                requiredSkills: ["Java", "SQL", "Communication"],
                rounds: 3,
                jobDescription: "Cognizant is hiring Programmer Analyst Trainees for their GenC profile.",
                questions: [
                    { round: 1, question: "Explain the difference between method overloading and overriding." },
                    { round: 1, question: "Write a SQL query to find duplicate records." }
                ]
            },
            {
                name: "IBM",
                roles: ["Associate Systems Engineer"],
                packageLPA: 4.5,
                visitDate: new Date('2023-10-28'),
                requiredSkills: ["Java", "Python", "SQL"],
                rounds: 3,
                jobDescription: "IBM is hiring Associate Systems Engineers to work on hybrid cloud solutions.",
                questions: [
                    { round: 1, question: "Explain the concept of cloud computing." },
                    { round: 1, question: "Write a Python program to reverse a string." }
                ]
            },
            {
                name: "Wipro",
                roles: ["Project Engineer"],
                packageLPA: 3.5,
                visitDate: new Date('2023-09-08'),
                requiredSkills: ["Java", "Python", "Communication"],
                rounds: 2,
                jobDescription: "Wipro is hiring Project Engineers for their Turbo and Elite profiles.",
                questions: [
                    { round: 1, question: "Explain the difference between list and tuple in Python." },
                    { round: 1, question: "What is the final keyword in Java?" }
                ]
            },
            {
                name: "PayPal",
                roles: ["Software Engineer"],
                packageLPA: 22.0,
                visitDate: new Date('2024-02-01'),
                requiredSkills: ["Java", "DSA", "Microservices"],
                rounds: 4,
                jobDescription: "PayPal is hiring Software Engineers to build secure payment solutions.",
                questions: [
                    { round: 1, question: "Explain the CAP theorem." },
                    { round: 2, question: "Design a rate limiter." }
                ]
            },
            {
                name: "Unicourt",
                roles: ["Legal Tech Associate"],
                packageLPA: 4.0,
                visitDate: new Date('2023-11-05'),
                requiredSkills: ["Python", "SQL", "APIs"],
                rounds: 3,
                jobDescription: "Unicourt is hiring Legal Tech Associates to work on legal data analytics.",
                questions: [
                    { round: 1, question: "How do you parse a JSON string in Python?" },
                    { round: 1, question: "Explain RESTful API principles." }
                ]
            },
            {
                name: "Cadence",
                roles: ["Verification Engineer"],
                packageLPA: 12.0,
                visitDate: new Date('2024-01-20'),
                requiredSkills: ["Verilog", "SystemVerilog", "UVM"],
                rounds: 3,
                jobDescription: "Cadence is hiring Verification Engineers to work on EDA tools.",
                questions: [
                    { round: 1, question: "Explain the difference between blocking and non-blocking assignments in Verilog." },
                    { round: 1, question: "What is UVM?" }
                ]
            },
            {
                name: "Impelsys",
                roles: ["Full-Stack Developer"],
                packageLPA: 5.0,
                visitDate: new Date('2023-12-10'),
                requiredSkills: ["React", "Node.js", "MongoDB"],
                rounds: 3,
                jobDescription: "Impelsys is hiring Full-Stack Developers for their learning management systems.",
                questions: [
                    { round: 1, question: "Explain the lifecycle methods in React." },
                    { round: 1, question: "How do you secure a Node.js application?" }
                ]
            },
            {
                name: "Persistent Systems",
                roles: ["Software Engineer"],
                packageLPA: 4.5,
                visitDate: new Date('2023-10-30'),
                requiredSkills: ["Java", "SQL", "DSA"],
                rounds: 3,
                jobDescription: "Persistent Systems is hiring Software Engineers for their digital engineering services.",
                questions: [
                    { round: 1, question: "Explain the concept of multithreading in Java." },
                    { round: 1, question: "Write a SQL query to find the top 3 employees by salary." }
                ]
            },
            {
                name: "HashDEIN",
                roles: ["Blockchain Developer"],
                packageLPA: 6.0,
                visitDate: new Date('2024-02-15'),
                requiredSkills: ["Solidity", "Blockchain", "Node.js"],
                rounds: 3,
                jobDescription: "HashDEIN is hiring Blockchain Developers to build decentralized applications.",
                questions: [
                    { round: 1, question: "What is a smart contract?" },
                    { round: 1, question: "Explain the consensus mechanism in Blockchain." }
                ]
            }
        ];

        for (const s of visitedSeeds) {
            const filter = { name: { $regex: new RegExp(`^${s.name}$`, 'i') }, type: 'visited' };
            const update = { $set: { ...s, type: 'visited' } };
            const options = { upsert: true };

            try {
                await collection.updateOne(filter, update, options);
                console.log(`Upserted Visited: ${s.name}`);
            } catch (e) {
                console.error(`Failed to upsert visited ${s.name}`, e.message);
            }
        }

        await client.close();
        process.exit(0);
    } catch (err) {
        console.error('Script failed', err);
        process.exit(1);
    }
}

seed();
