var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};

var Articles = artifacts.require("./Articles.sol");

module.exports = function(deployer) {
  deployer.deploy(Articles);
};
