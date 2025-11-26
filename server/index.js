// const studentRoutes = require("./routes/studentRoutes");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { SiweMessage } = require('siwe');
const { ethers } = require('ethers');

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Increase body parser limits to accept base64 resume payloads sent from the frontend
// (frontend currently sends resume as a data URL in JSON). Adjust size as needed.
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// In-memory nonce store (for demo). In production persist nonces server-side (DB/redis).
const nonceStore = new Map(); // address -> { nonce, expires }
function generateNonce() {
  return Math.random().toString(36).substring(2, 10);
}

const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const RPC_URL = process.env.RPC_URL || 'https://rpc.ankr.com/eth';
const OPTIN_REGISTRY = process.env.OPTIN_REGISTRY_ADDRESS || null;

if (!MONGO_URI) {
  console.error('MONGO_URI is not set. Copy .env.example to .env and set it.');
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedCompanies();
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

// Seed function
async function seedCompanies() {
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
    },
    {
      name: "Facebook",
      roles: ["Frontend Developer", "Backend Developer"],
      packageLPA: 22.0,
      visitDate: new Date('2025-05-01'),
      requiredSkills: ["React", "Node.js", "GraphQL"],
      rounds: 3,
      jobDescription: "Meta (Facebook) is seeking talented developers to build the future of connection. As a developer, you will work on large-scale applications reaching billions of users. You will be responsible for building intuitive user interfaces or robust backend systems. Experience with React, Node.js, and GraphQL is highly valued."
    },
    {
      name: "Tesla",
      roles: ["Software Engineer", "Embedded Systems Engineer"],
      packageLPA: 25.0,
      visitDate: new Date('2025-05-15'),
      requiredSkills: ["Python", "C++", "Embedded Systems"],
      rounds: 4,
      jobDescription: "Tesla is accelerating the world's transition to sustainable energy. We are looking for engineers to work on Autopilot, infotainment, and energy systems. You will write high-performance code in C++ and Python for embedded systems. This role requires a deep understanding of hardware-software integration and real-time constraints."
    },
    {
      name: "Nvidia",
      roles: ["AI Engineer"],
      packageLPA: 28.0,
      visitDate: new Date('2025-05-20'),
      requiredSkills: ["Python", "ML", "CUDA"],
      rounds: 3,
      jobDescription: "Nvidia is the engine of modern AI. Join us as an AI Engineer to develop cutting-edge deep learning models and accelerate computing applications. You will work with CUDA, Python, and major ML frameworks. This is an opportunity to solve some of the world's hardest problems in computer vision, NLP, and robotics."
    },
    {
      name: "Adobe",
      roles: ["Frontend Engineer"],
      packageLPA: 21.0,
      visitDate: new Date('2025-05-25'),
      requiredSkills: ["React", "JS", "CSS"],
      rounds: 2,
      jobDescription: "Adobe is changing the world through digital experiences. We are hiring Frontend Engineers to build creative tools and cloud services. You will work with modern web technologies like React and TypeScript to deliver pixel-perfect UIs. A passion for design and user experience is a must."
    },
    {
      name: "IBM",
      roles: ["Software Developer"],
      packageLPA: 19.0,
      visitDate: new Date('2025-06-01'),
      requiredSkills: ["Java", "Cloud"],
      rounds: 3,
      jobDescription: "IBM is a leader in hybrid cloud and AI. We are looking for Software Developers to build secure and scalable enterprise solutions. You will work with Java, Cloud technologies, and open-source tools. Join us to drive innovation and help clients transform their businesses."
    }
  ];

  try {
    for (const s of seeds) {
      // Upsert: Update if exists, Insert if not
      const filter = { name: { $regex: new RegExp(`^${s.name}$`, 'i') }, type: 'upcoming' };
      const update = { ...s, type: 'upcoming' };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      await Company.findOneAndUpdate(filter, update, options);
      console.log(`Seeded/Updated ${s.name}`);
    }
  } catch (err) {
    console.error('Seeding failed', err);
  }
}

// Student model (use existing file)
const Student = require('./models/student');

// Company model (for upcoming and visited companies + questions)
const Company = require('./models/company');
const AllowedWallet = require('./models/AllowedWallet');

// --- Auth routes for SIWE ---
// GET /auth/nonce?address=0x...
app.get('/auth/nonce', (req, res) => {
  const address = String(req.query.address || '').trim();
  if (!address) return res.status(400).json({ message: 'address query parameter required' });
  const nonce = generateNonce();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
  nonceStore.set(address.toLowerCase(), { nonce, expires });
  res.json({ nonce });
});

// POST /auth/verify { message, signature }
app.post('/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body || {};
    if (!message || !signature) return res.status(400).json({ message: 'message and signature required' });

    const siweMessage = new SiweMessage(message);
    const address = siweMessage.address.toLowerCase();

    // Check stored nonce
    const stored = nonceStore.get(address);
    if (!stored) return res.status(400).json({ message: 'No nonce found for address' });
    if (Date.now() > stored.expires) {
      nonceStore.delete(address);
      return res.status(400).json({ message: 'Nonce expired' });
    }

    // Verify SIWE message using siwe library
    try {
      // Prefer using the siwe library's verify if available
      if (typeof siweMessage.verify === 'function') {
        const verification = await siweMessage.verify({ signature, nonce: stored.nonce });
        if (!verification || !verification.success) {
          console.error('SIWE verification failed', { verification });
          return res.status(401).json({ message: 'SIWE verification failed' });
        }
      } else {
        // Fallback: recover address from the prepared message using ethers and compare
        try {
          const prepared = siweMessage.prepareMessage();
          const recovered = ethers.verifyMessage ? await ethers.verifyMessage(prepared, signature) : await ethers.utils.verifyMessage(prepared, signature);
          if (!recovered) {
            console.error('Failed to recover address from signature');
            return res.status(401).json({ message: 'SIWE verification failed (recover failed)' });
          }
          if (recovered.toLowerCase() !== address) {
            console.error('Recovered address does not match SIWE address', { recovered, expected: address });
            return res.status(401).json({ message: 'SIWE verification failed (address mismatch)' });
          }
          // also verify nonce matches
          const msgNonce = siweMessage.nonce || (siweMessage.data && siweMessage.data.nonce);
          if (!msgNonce || msgNonce !== stored.nonce) {
            console.error('Nonce mismatch', { msgNonce, stored: stored.nonce });
            return res.status(401).json({ message: 'SIWE verification failed (nonce mismatch)' });
          }
        } catch (err) {
          console.error('Fallback SIWE verify error', err && err.message ? err.message : err);
          return res.status(401).json({ message: 'SIWE verification error', detail: String(err && err.message ? err.message : err) });
        }
      }
    } catch (err) {
      console.error('Auth verify error (outer)', err && err.message ? err.message : err);
      return res.status(401).json({ message: 'SIWE verification error', detail: String(err && err.message ? err.message : err) });
    }

    // Nonce used — remove it
    nonceStore.delete(address);

    // --- Check if address is in the AllowedWallet database ---
    const allowed = await AllowedWallet.findOne({ address });
    if (!allowed) {
      return res.status(403).json({ message: 'Access denied: Wallet not authorized by placement officer' });
    }

    // Check opt-in status via OptInRegistry contract if provided
    let optedIn = false;
    if (OPTIN_REGISTRY) {
      try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const abi = [{ "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "isOptedIn", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }];
        const contract = new ethers.Contract(OPTIN_REGISTRY, abi, provider);
        optedIn = await contract.isOptedIn(address);
      } catch (err) {
        console.error('Opt-in check failed', err);
        return res.status(500).json({ message: 'Failed to check opt-in status' });
      }
    } else {
      // If no contract provided, default to true for development convenience
      optedIn = true;
    }

    if (!optedIn) {
      return res.status(403).json({ message: 'Address has not opted in on-chain' });
    }

    // Issue JWT and set httpOnly cookie
    const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });

    // Update Student records (if any) to attach eth_address and opted_in
    try {
      await Student.updateMany({ $or: [{ eth_address: address }, { email: siweMessage.statement || '' }] }, { $set: { eth_address: address, opted_in: true, last_login: new Date() } });
    } catch (err) {
      // non-fatal
      console.error('Failed to update student records with eth_address', err);
    }

    res.json({ address, optedIn: true });
  } catch (err) {
    console.error('Auth verify error', err);
    res.status(500).json({ message: 'Auth verify failed' });
  }
});

// return current session wallet address if cookie present
app.get('/auth/me', (req, res) => {
  try {
    const token = req.cookies.session || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) return res.json({ authenticated: false });
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true, address: decoded.address });
  } catch (err) {
    return res.json({ authenticated: false });
  }
});

// logout clears cookie
app.post('/auth/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ ok: true });
});

// JWT middleware
function jwtMiddleware(req, res, next) {
  try {
    const token = req.cookies.session || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) return res.status(401).json({ message: 'Missing auth token' });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.walletAddress = decoded.address;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Public company endpoints
app.get('/api/companies/upcoming', async (req, res) => {
  try {
    const items = await Company.find({ type: 'upcoming' }).sort({ visitDate: 1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch upcoming companies' });
  }
});

// Protected company create endpoints (require JWT)
app.post('/api/companies/upcoming', jwtMiddleware, async (req, res) => {
  try {
    const body = req.body || {};
    const c = new Company({
      name: body.name,
      roles: Array.isArray(body.roles) ? body.roles : (String(body.roles || '').split(',').map(s => s.trim()).filter(Boolean)),
      packageLPA: body.packageLPA || 0,
      jobDescription: body.jobDescription || '',
      visitDate: body.visitDate ? new Date(body.visitDate) : null,
      requiredSkills: Array.isArray(body.requiredSkills) ? body.requiredSkills : (String(body.requiredSkills || '').split(',').map(s => s.trim()).filter(Boolean)),
      rounds: body.rounds || 1,
      registrationLink: body.registrationLink || '',
      type: 'upcoming'
    });
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create upcoming company' });
  }
});

// create a visited company and optionally include questions (protected)
app.post('/api/companies/visited', jwtMiddleware, async (req, res) => {
  try {
    const body = req.body || {};
    const c = new Company({
      name: body.name,
      roles: Array.isArray(body.roles) ? body.roles : (String(body.roles || '').split(',').map(s => s.trim()).filter(Boolean)),
      role: body.role || (Array.isArray(body.roles) && body.roles[0]) || '',
      packageLPA: body.packageLPA || 0,
      jobDescription: body.jobDescription || '',
      visitDate: body.visitDate ? new Date(body.visitDate) : null,
      requiredSkills: Array.isArray(body.requiredSkills) ? body.requiredSkills : (String(body.requiredSkills || '').split(',').map(s => s.trim()).filter(Boolean)),
      rounds: body.rounds || 1,
      questions: Array.isArray(body.questions) ? body.questions.map(q => ({ round: q.round || 1, question: q.question || '' })) : [],
      type: 'visited'
    });
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create visited company' });
  }
});

app.get('/api/companies/visited', async (req, res) => {
  try {
    const items = await Company.find({ type: 'visited' }).sort({ visitDate: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch visited companies' });
  }
});

app.post('/api/companies/:id/questions', jwtMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { round, question } = req.body || {};
    const company = await Company.findById(id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    company.questions = company.questions || [];
    company.questions.push({ round: Number(round) || 1, question: question || '' });
    await company.save();
    res.status(201).json(company.questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add question' });
  }
});

app.get('/api/companies/:id/questions', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company.questions || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

// get single company by id
app.get('/api/companies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch company' });
  }
});

// Protected student creation (require auth)
app.post('/api/students', jwtMiddleware, async (req, res) => {
  try {
    const data = req.body;
    // attach wallet address if present on request
    if (req.walletAddress) data.eth_address = req.walletAddress;
    const student = new Student(data);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create student' });
  }
});

// Apply to a company
app.post('/api/students/apply', jwtMiddleware, async (req, res) => {
  try {
    const { companyId, companyName } = req.body;
    const address = req.walletAddress; // from jwtMiddleware

    // Find student by eth_address (or email if we had it in token, but we use address)
    // Note: If student hasn't created a profile yet, this might fail if we only look for profile.
    // But we can look for the student record created during auth/verify if it exists, or the one created in /api/students.

    // We'll search by eth_address
    let student = await Student.findOne({ eth_address: address });

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found. Please create a profile first.' });
    }

    // Check if already applied
    const alreadyApplied = student.applications.some(app => app.companyId === companyId);
    if (!alreadyApplied) {
      student.applications.push({ companyId, companyName });
      await student.save();
    }

    res.json({ success: true, applications: student.applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to apply' });
  }
});

// Get my profile
app.get('/api/students/me', jwtMiddleware, async (req, res) => {
  try {
    const address = req.walletAddress;
    const student = await Student.findOne({ eth_address: address });
    if (!student) return res.status(404).json({ message: 'Profile not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 }).limit(200);
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

// --- Admin Endpoints for Allowed Wallets ---
app.post('/api/admin/allowed-wallets', async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) return res.status(400).json({ message: 'Address is required' });

    await AllowedWallet.findOneAndUpdate(
      { address: address.toLowerCase() },
      { address: address.toLowerCase() },
      { upsert: true, new: true }
    );
    res.json({ message: 'Wallet added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add wallet' });
  }
});

app.get('/api/admin/allowed-wallets', async (req, res) => {
  try {
    const wallets = await AllowedWallet.find().sort({ addedAt: -1 });
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch wallets' });
  }
});

app.delete('/api/admin/allowed-wallets/:address', async (req, res) => {
  try {
    const { address } = req.params;
    await AllowedWallet.deleteOne({ address: address.toLowerCase() });
    res.json({ message: 'Wallet removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove wallet' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
