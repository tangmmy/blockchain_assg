const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const {ethers} = require('ethers');
const app = express();
const crypto = require('crypto');
const port = 3000;
const jwt = require('jsonwebtoken');
// Whitelist contract address and ABI
const whitelistContractAddress = "0x891e7C9E76422ee79363bC3075a8ADBa46A1Eb66"; // Replace with your deployed contract address
const whitelistABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "AddedToWhitelist",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "RemovedFromWhitelist",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "nameList",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "addToList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "removeFromList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "inTheList",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newAdmin",
        "type": "address"
      }
    ],
    "name": "changeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "isAdmin",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAdmin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

// Connect to Ethereum provider (you can use Infura or Alchemy for mainnet/testnet)
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545'); 
const whitelistContract = new ethers.Contract(whitelistContractAddress, whitelistABI, provider);
const signer = provider.getSigner();
let account;
// Middleware for parsing JSON and handling form data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// Set up session management

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Set the view engine to EJS and set the views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (optional if you want to add CSS/JS files later)
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('login');
});


// GET route to retrieve a nonce value for use in signing
app.get('/api/nonce', (req, res) => {
  // Generate a random 32-byte value to use as the nonce
  const nonce = crypto.randomBytes(32).toString('hex');
  // Return the nonce value as a JSON object in the response body
  res.json({ nonce });
});
// Route to render the login page

app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login',async (req,res)=>{
  try {
    const { account } = req.body;
    const isAdmin = await whitelistContract.isAdmin(account);
    console.log(account);
    console.log(isAdmin);
    if (isAdmin) {
      // Save account in session
      req.session.account = account;
      res.status(200).json({ message: 'Success: Is an admin'});
    } else {
      // Return JSON response for failed login attempt
      res.status(403).json({ message: 'Login failed: Not an admin'});
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

// Route to render the dashboard after login
app.get('/dashboard', (req, res) => {
  if (!req.session || !req.session.account) {  
    return res.redirect('/login'); // Redirect to login if not authenticated
  }
  res.render('dashboard', { account: req.session.account });
  
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


