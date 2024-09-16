# Blockchain Assignment Time Lock DAPP
## Table of Contents
1. [Introduction](#introduction)
2. [Installation and Setup](#installation)
3. [Starting](#starting)
4. [Todolist](#todolist)
## Introduction
This project is a decetralized application that can distribute salary from an admin account to other user account. It allows users to log in, check their salary status.Currently only done the authenticatin with the admin


## Installation and Setup

### Prerequisites
- Node.js
- MetaMask browser extension
- Ganache
- Truffle

### Steps to use
1. Clone the repository:
   ```bash
   git clone https://github.com/tangmmy/blockchain_assg.git
2. Change directory and install the dependencires:
    ```bash
    npm init -y
    npm install express ethers
3. Create a new Ganache network
4. Go to Settings > Workspace, at the truffle projects , search for the truffle-config.js of this repository.
5. I am using RPC SERVER: HTTP://127.0.0.1:7545, and a compiler version 0.8.13, make sure change to your version
6. Change directory to blchn_contract directory to deploy
    ```bash
    cd .\blchn_contract
    truffle compile
    truffle migrate 
7. Go to Ganache > Contracts  and copy the address of contract
8. Change the whitelist's contract address at the server.js file


## Starting
1. Start the server.js file
    ```bash
    node server
2. Create a metamask account using the first address at the ganache, initially it will be the admin
3. At browser connect to metamask, your address will be displayed.
4. Click login and will redirect to dashboard

## Todolist
1. Improve necessary UI
2. Add user function by admin together with authentication of user
3. The timelock contract that can send ETH from admin account to other's user account
4. Function and UI showing future transaction
5. Function and UI that can terminate the transaction 






