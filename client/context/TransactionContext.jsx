import React, { useEffect, useState, createContext } from "react";
import { contractAddress, contractABI } from "../utils/constants";
import { ethers } from 'ethers';

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    const provider = new ethers.BrowserProvider(ethereum);

    // The MetaMask plugin also allows signing transactions to
    // her and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();

    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    //console.log(transactionsContract);
    return transactionsContract;

};

export const TransactionsProvider = ({ children }) => {

    const [connectedAccount, setConnectedAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", message: "", keyword: "" });

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactioncount'));
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        //console.log(e);
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value}));
    }

    const fundTransfer = async () => {
        try {
            if (ethereum) {

                const { addressTo, amount, message, keyword } = formData;
                const transactionsContract = getEthereumContract();
                const amountToGwei = ethers.parseEther(amount);
                const amountHex = ethers.hexlify(ethers.toUtf8Bytes(amount));
                console.log(amountHex);
                console.log(amountToGwei);

                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        "to": addressTo,
                        "from": connectedAccount,
                        "value": amountHex,
                        "gas": "0x76c0" // it is hex values of 21000 in gwei (0.00021)
                    }]
                    
                });

                

                const transactionNumHash = await transactionsContract.addToBlockChain(addressTo, amountToGwei, message, keyword);

                setIsLoading(true);

                console.log(`loading: ${transactionNumHash.hash}`);

                await transactionNumHash.wait();

                setIsLoading(false);

                console.log(`Success: ${transactionNumHash.hash}`);

                const transactionCounter = transactionsContract.getTransactionCounter();

                setTransactionCount(transactionCounter.toNumber());

                window.location.reload();
            } else {
                alert("MetaMask wellect/account is not connected");
            }

        } catch (error) {
            console.log(error);
            throw new Error("Wellet is not connected");
        }
    }

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
            connectAccount,
            fundTransfer,
            transactionCount,
            formData,
            isLoading,
            handleChange
        }}>
            {children}
        </TransactionContext.Provider>
    );
};
