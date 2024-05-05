import React, { useEffect, useState, createContext } from "react";
import { contractAddress, contractABI } from "../utils/constants";
import { ethers } from 'ethers';

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(ethereum);

    // The MetaMask plugin also allows signing transactions to
    // her and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();

    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionsContract;

};

export const TransactionsProvider = ({ children }) => {

    const [connectedAccount, setConnectedAccount] = useState("");

    const checkIsWelletConnect = async () => {
        try {
            if (!ethereum) alert("MetaMask wellet is not connected.");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
    
            if (accounts.length)
            setConnectedAccount(accounts[0]);
            else
                console.log("No account connected");
        } catch (error) {
            console.log(error);
        }
    };

    const connectAccount = async () => {
        try {
            if (!ethereum) alert("Install MetaMask extension");
            const account = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(account);
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIsWelletConnect();
    });


    return (
        <TransactionContext.Provider value={{
            connectedAccount,
            connectAccount
        }}>
            {children}
        </TransactionContext.Provider>
    );
};
