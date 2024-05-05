// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
// We import Chai to use its asserting functions here.
const { expect } = require("chai");
  
// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.

describe("Transaction contract", function () {
    // We define a fixture to reuse the same setup in every test. We use
    // loadFixture to run this setup once, snapshot that state, and reset Hardhat
    // Network to that snapshot in every test.
    
    async function deployTransactionFixture() {
        // Get the Signers here.
        const [owner, address1] = await ethers.getSigners();

        // +2 is for timestamp is not match with block timestamp
        const timestamp = await time.latest() + 2; 

        //console.log(timestamp);

        // To deploy our contract, we just have to call ethers.deployContract and await
        // its waitForDeployment() method, which happens once its transaction has been
        // mined.

        const contractObject = await ethers.deployContract("Transaction");

        await contractObject.waitForDeployment();

        // Fixtures can return anything you consider useful for your tests
        return { contractObject, owner, address1, timestamp };
    }


    describe("Transactions", function () {
        // `it` is another Mocha function. This is the one you use to define each
        // of your tests. It receives the test name, and a callback function.
        //
        // If the callback function is async, Mocha will `await` it.
        it("fund transfer", async function () {
            // We use loadFixture to setup our environment, and then assert that
            // things went well
            const { contractObject, owner, address1, timestamp } = await loadFixture(deployTransactionFixture);

            // call smart contract addToBlockChain function

            await expect(contractObject.addToBlockChain(address1.address, 10, "Message Input", "Keyword Input"))
                .to.emit(contractObject, "fundTransfer").withArgs(owner.address, address1.address, 10, "Message Input", timestamp, "Keyword Input");
            
                //await expect(contractObject.addToBlockChain(address1, 10, "Message Input", "Keyword Input"));

        });

        it("get transaction counter", async function () {
            const { contractObject, owner } = await loadFixture(deployTransactionFixture);

            // call getTransactionCounter function 

            const transactionCounter = await expect(contractObject.getTransactionCounter(1));
            //expect(await contractObject.transactionCounter()).to.equal(transactionCounter)
        });

        it("get transactions list", async function () {
            const { contractObject, owner } = await loadFixture(deployTransactionFixture);

            // call getAllTransactions function 

            const transactionCounter = await expect(contractObject.getAllTransactions());
            //expect(await contractObject.transactionCounter()).to.equal(transactionCounter)
        });
    });
});