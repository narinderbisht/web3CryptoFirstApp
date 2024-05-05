const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("TransactModule", (m) => {

  const transaction = m.contract("Transaction" );

  return { transaction };
  
});
