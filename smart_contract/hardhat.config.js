require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
/** @type import('hardhat/config').HardhatUserConfig */
// Ensure your configuration variables are set before executing the script
//const { vars } = require("hardhat/config");

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and add its key to the configuration variables
const ALCHEMY_API_KEY = 'FGshhcQHU6o0OyEv_TcvWROXw86gu6IA'; //vars.get("ALCHEMY_API_KEY");

// Add your Sepolia account private key to the configuration variables
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = 'cdfeaad72fdf0b65a3f72a40c3742d49edcc59ee51bd00431771b56ed6e005f0';
//vars.get("SEPOLIA_PRIVATE_KEY");

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
