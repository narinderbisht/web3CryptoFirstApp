// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Transaction {
    uint256 transactionCounter;

    struct TransactionStruct {
        uint amount;
        address sender;
        address reciever;
        string message;
        string keyword;
        uint256 timestamp;
    }

    event fundTransfer(
        address from,
        address reciever,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    TransactionStruct[] transactions;

    function addToBlockChain(
        address payable reciever,
        uint amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCounter += 1;

        transactions.push(
            TransactionStruct(
                amount,
                msg.sender,
                reciever,
                message,
                keyword,
                block.timestamp
            )
        );

        emit fundTransfer(
            msg.sender,
            reciever,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransactionStruct[] memory)
    {
        // get all transaction
        return transactions;
    }

    function getTransactionCounter() public view returns (uint256) {
        return transactionCounter;
    }
}
