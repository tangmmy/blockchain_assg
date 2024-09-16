const Whitelist = artifacts.require("whitelist");
const assert = require("assert");

contract("Whitelist", (accounts) => {
  let whitelistInstance;

  before(async () => {
    whitelistInstance = await Whitelist.deployed();
  });

  it("should add an address to the whitelist by admin", async () => {
    const currentAdmin = await whitelistInstance.getAdmin();
    console.log(`Current admin is: ${currentAdmin}`);
    const accountToAdd = accounts[1];
    console.log(`Adding address ${accountToAdd} to the whitelist...`);
    await whitelistInstance.addToList(accountToAdd, { from: accounts[0] });
    const inTheList = await whitelistInstance.inTheList(accountToAdd);
    
    console.log(`Address ${accountToAdd} is whitelisted: ${inTheList}`);
    assert.strictEqual(inTheList, true, `Account ${accountToAdd} should be whitelisted`);
  });

  it("should NOT allow non-admin to add an address to the whitelist", async () => {
    const currentAdmin = await whitelistInstance.getAdmin();
    console.log(`Current admin is: ${currentAdmin}`);
    const accountToAdd = accounts[2];
    console.log(`Attempting to add address ${accountToAdd} to the whitelist by non-admin...`);
    try {
      await whitelistInstance.addToList(accountToAdd, { from: accounts[1] }); // Non-admin
      assert.fail("The function should have thrown an error");
    } catch (error) {
      console.log("Error expected: " + error.message);
      assert(error.message.includes("Only admin can perform this action"), "Expected error message not found");
    }
  });

  it("should remove an address from the whitelist by admin", async () => {
    const currentAdmin = await whitelistInstance.getAdmin();
    console.log(`Current admin is: ${currentAdmin}`);
    const accountToRemove = accounts[1];
    console.log(`Removing address ${accountToRemove} from the whitelist...`);
    await whitelistInstance.removeFromList(accountToRemove, { from: accounts[0] });
    const inTheList = await whitelistInstance.inTheList(accountToRemove);
    console.log(`Address ${accountToRemove} is whitelisted: ${inTheList}`);
    assert.strictEqual(inTheList, false, `Account ${accountToRemove} should not be whitelisted`);
  });

  it("should NOT allow non-admin to remove an address from the whitelist", async () => {
    const accountToRemove = accounts[2];
    console.log(`Attempting to remove address ${accountToRemove} from the whitelist by non-admin...`);
    try {
      await whitelistInstance.removeFromList(accountToRemove, { from: accounts[1] }); // Non-admin
      assert.fail("The function should have thrown an error");
    } catch (error) {
      console.log("Error expected: " + error.message);
      assert(error.message.includes("Only admin can perform this action"), "Expected error message not found");
    }
  });
  
  it("should change the admin", async () => {
    const newAdmin = accounts[3];
    console.log(`Changing admin to ${newAdmin}...`);
    await whitelistInstance.changeAdmin(newAdmin, { from: accounts[0] });
    const currentAdmin = await whitelistInstance.admin();
    console.log(`Current admin is: ${currentAdmin}`);
    assert.strictEqual(currentAdmin, newAdmin, `Admin should be ${newAdmin}`);
  });
  
  /*
  it("should check if an address is the admin", async () => {
    const isAdminCheck = await whitelistInstance.isAdmin(accounts[0]);
    const isNotAdminCheck = await whitelistInstance.isAdmin(accounts[1]);
    
    console.log(`Address ${accounts[0]} is admin: ${isAdminCheck}`);
    console.log(`Address ${accounts[1]} is admin: ${isNotAdminCheck}`);
    
    assert.strictEqual(isAdminCheck, true, `Account ${accounts[0]} should be an admin`);
    assert.strictEqual(isNotAdminCheck, false, `Account ${accounts[1]} should not be an admin`);
  });
  */
 /*
  it("should return the current admin", async () => {
    const currentAdmin = await whitelistInstance.getAdmin();
    console.log(`Current admin is: ${currentAdmin}`);
    
    // The initial admin should be accounts[0]
    assert.strictEqual(currentAdmin, accounts[0], "The admin should be accounts[0] initially");

    // Change the admin to accounts[3]
    await whitelistInstance.changeAdmin(accounts[3], { from: accounts[0] });

    // Check if the new admin is accounts[3]
    const newAdmin = await whitelistInstance.getAdmin();
    console.log(`New admin is: ${newAdmin}`);
    assert.strictEqual(newAdmin, accounts[3], "The admin should now be accounts[3]");

    });
*/
});
