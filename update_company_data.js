const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

async function updateCompaniesData() {
    try {
        const uri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('companies');

        // Update JEMS Inc package
        await collection.updateOne(
            { name: 'JEMS Inc', type: 'visited' },
            { $set: { packageLPA: 33.0 } }
        );
        console.log('✓ Updated JEMS Inc package to 33 LPA');

        // Update Hitachi KE Systems package
        await collection.updateOne(
            { name: 'Hitachi KE Systems', type: 'visited' },
            { $set: { packageLPA: 37.0 } }
        );
        console.log('✓ Updated Hitachi KE Systems package to 37 LPA');

        // Define detailed questions for each company
        const companyQuestions = {
            'Tech Mahindra': {
                aptitude: [
                    "A train 150m long crosses a pole in 8 seconds. What is its speed?",
                    "Find the next number in the sequence: 3, 9, 27, ?, 243",
                    "If a cube's volume is 64 cm³, what is its surface area?",
                    "Two pipes fill a tank in 20 min and 30 min respectively. How long together?",
                    "A sells an item to B at 20% profit. B sells to C at 25% profit. Total profit %?"
                ],
                technical: [
                    "Difference between ArrayList and LinkedList?",
                    "What is multithreading? Give a real-time example.",
                    "Explain INNER JOIN vs LEFT JOIN.",
                    "Write a program to check if a string is a palindrome.",
                    "What is OSI model? Explain any 3 layers."
                ],
                hr: [
                    "Tell me about a challenging academic project you completed.",
                    "Why do you want to join Tech Mahindra?",
                    "Are you open to relocation and night shifts?",
                    "Describe a situation where you handled team conflict.",
                    "Where do you see yourself in 5 years?"
                ]
            },
            'Wipro': {
                aptitude: [
                    "Solve: (15 × 18) ÷ 6 + 7",
                    "A man covers 40 km at 20 km/h and returns at 10 km/h. Average speed?",
                    "Probability of drawing a king from a deck?",
                    "Ratio of ages of A:B is 5:3. After 6 years ratio becomes 7:5. Find ages.",
                    "Simplify: √75 + √12"
                ],
                technical: [
                    "What is OOP? Explain 4 pillars.",
                    "What is normalization in DBMS? Why is it needed?",
                    "Write a program to find the second largest number in an array.",
                    "What is the difference between TCP and UDP?",
                    "Explain constructor overloading."
                ],
                hr: [
                    "Tell me about yourself.",
                    "Why Wipro?",
                    "What motivates you to work in IT?",
                    "Explain a time when you failed and what you learned.",
                    "Are you comfortable working under pressure?"
                ]
            },
            'Cognizant': {
                aptitude: [
                    "If 2x + 3 = 15, find x.",
                    "A boat going downstream at 12 km/h and upstream at 6 km/h. Find speed of stream.",
                    "Find missing number: 7, 14, 28, ?, 112",
                    "A 20% discount is given on price 800. What is selling price?",
                    "Time taken to cover 60 km at 40 km/h?"
                ],
                technical: [
                    "What is SDLC? Explain different models.",
                    "Difference between abstraction and encapsulation.",
                    "Write code to remove duplicates from an array.",
                    "Explain primary key vs unique key.",
                    "What are REST APIs?"
                ],
                hr: [
                    "Why CTS and not other service-based companies?",
                    "Tell about a time you handled a deadline.",
                    "What are your strengths and weaknesses?",
                    "Describe your role in your final-year project.",
                    "Are you willing to work in any technology assigned?"
                ]
            },
            'Flipkart': {
                aptitude: [
                    "A shopkeeper marks an item 40% above cost and gives 20% discount. Find profit%.",
                    "Solve: 2⁵ × 2⁴ ÷ 2³",
                    "A can do work in 12 days and B in 18 days. How long together?",
                    "Find angle of a regular pentagon.",
                    "Puzzle: You have 8 identical balls. One is heavier. How many weighings needed?"
                ],
                technical: [
                    "Explain hash maps. Why are they fast?",
                    "Write a program to reverse a linked list.",
                    "What is load balancing?",
                    "Explain MVC architecture.",
                    "Difference between process and thread?"
                ],
                hr: [
                    "How do you handle tight delivery timelines?",
                    "Why Flipkart?",
                    "Tell me about a time you showed leadership.",
                    "Are you comfortable working in fast-paced environments?",
                    "Tell about a conflict in your project team."
                ]
            },
            'Infosys': {
                aptitude: [
                    "Solve: 5x – 3 = 2x + 12",
                    "A mixture contains 3:2 ratio of milk and water. If 20L mixture, find milk.",
                    "Probability of selecting an even number from 1–10.",
                    "Find simple interest for ₹5000 at 10% for 2 years.",
                    "Number series: 11, 22, 33, ?, 55"
                ],
                technical: [
                    "What is a class and object in Java?",
                    "What is recursion? Write an example.",
                    "Explain foreign key with example.",
                    "What is a deadlock in OS?",
                    "Write a program to count vowels in a string."
                ],
                hr: [
                    "Introduce yourself.",
                    "Why Infosys?",
                    "How do you handle stressful tasks?",
                    "Are you open to training in any tech?",
                    "What did you learn from your engineering journey?"
                ]
            },
            'Hitachi KE Systems': {
                aptitude: [
                    "Basic percentage and profit-loss problem.",
                    "Solve speed-distance-time question.",
                    "Number series with missing values.",
                    "Data interpretation graph question.",
                    "Simple logical reasoning puzzle."
                ],
                technical: [
                    "Explain SDLC waterfall vs agile.",
                    "What is polymorphism?",
                    "What is a trigger in SQL?",
                    "Code: check prime number.",
                    "Difference between GET and POST."
                ],
                hr: [
                    "Why do you want to join Hitachi?",
                    "How do you handle criticism?",
                    "Tell about a mini-project you built.",
                    "Are you willing to work in Japan collaboration projects?",
                    "Teamwork-related question."
                ]
            },
            'SAP LAB': {
                aptitude: [
                    "Solve permutation & combination question.",
                    "Profit-loss calculation.",
                    "Probability with dice.",
                    "Coding-based aptitude question.",
                    "Pattern-based logical problem."
                ],
                technical: [
                    "Explain polymorphism with example.",
                    "What is ERP?",
                    "Write a program to check Armstrong number.",
                    "Explain ACID properties.",
                    "Difference between interface and abstract class."
                ],
                hr: [
                    "Why SAP Labs?",
                    "What projects have you done in college?",
                    "What's your biggest achievement?",
                    "Do you prefer working on backend or frontend?",
                    "What are your career goals?"
                ]
            },
            'JEMS Inc': {
                aptitude: [
                    "Basic arithmetic (percentage, averages).",
                    "Speed-time-distance problem.",
                    "Simplification expression.",
                    "Finding missing term in series.",
                    "Small logical puzzle."
                ],
                technical: [
                    "What is API?",
                    "What is SQL injection?",
                    "Write code to find factorial.",
                    "Explain difference between stack and queue.",
                    "What is cloud computing?"
                ],
                hr: [
                    "Why do you want to join JEMS Inc?",
                    "Tell me about a time you worked in a team.",
                    "What is your biggest strength?",
                    "What motivates you?",
                    "Do you prefer office or WFH?"
                ]
            }
        };

        // Update questions for each company
        for (const [companyName, rounds] of Object.entries(companyQuestions)) {
            const questions = [];

            // Add aptitude questions (round 1)
            rounds.aptitude.forEach(q => {
                questions.push({ round: 1, question: q });
            });

            // Add technical questions (round 2)
            rounds.technical.forEach(q => {
                questions.push({ round: 2, question: q });
            });

            // Add HR questions (round 3)
            rounds.hr.forEach(q => {
                questions.push({ round: 3, question: q });
            });

            await collection.updateOne(
                { name: companyName, type: 'visited' },
                { $set: { questions: questions } }
            );
            console.log(`✓ Updated questions for ${companyName} (${questions.length} questions)`);
        }

        await client.close();
        console.log('\n✓ All updates completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Script failed:', err);
        process.exit(1);
    }
}

updateCompaniesData();
