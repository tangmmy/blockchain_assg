let instance = await whitelist.deployed();
let isWhitelisted = await instance.inTheList("0x5b686DEEC641e653b43a2f147a5b31cD310e6238");
console.log(isWhitelisted);
await instance.addUser("0xYourAddress", { from: accounts[0] });
let adminAddress = await instance.getAdmin();
console.log(adminAddress);
console.log(isAdmin);
