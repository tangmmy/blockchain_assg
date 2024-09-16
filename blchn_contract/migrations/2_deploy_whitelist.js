const whitelist = artifacts.require("whitelist");

module.exports = function (deployer) {
  deployer.deploy(whitelist);
};
