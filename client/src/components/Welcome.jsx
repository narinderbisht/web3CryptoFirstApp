import React, {useContext} from 'react';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import Loader from './Loader';
import { useState } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

const InputBox = ({type, placeholder, name, value, handleChange}) => (
    <input type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e, name)}
        step="0.0001"
        className="w-full my-2 p-2 rounded-sm outline-none border-none bg-transparent text-white white-glassmorphism" />
);
const commonStyles = 'font-light text-white border-[0.5px] border-gray-400 text-sm flex items-center justify-center min-h-[70px] sm:px-0 px-2';

const Welcome = () => {
    const { connectedAccount, connectAccount, isLoading, handleChange, fundTransfer, formData } = useContext(TransactionContext);
    //console.log(connectedAccount);
    

    const handleSubmit = (e) => {
        const { addressTo, amount, message, keyword } = formData;

        e.preventDefault();
        if (!addressTo || !amount || !message || !keyword) return;

        fundTransfer();
    };

    
    
    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-10 px-4">
                <div className="flex flex-col justify-start item-start mf:mr-10 w-full">
                    <h1 className="text-3xl md:text-5xl text-gradient py-2">Send Crypto <br /> across the world</h1>
                    <p className="text-left text-base text-white font-light md:w-9/12 w-11/12">Explore crypto world. Buy and sell cryptocurrencies easily on WebCryptoApp</p>
                    {!connectedAccount && (
                        <button type="button" className="bg-blue-500 w-full rounded-full hover:bg-blue-600 text-white p-2 my-5" onClick={connectAccount}>Connect Wellet</button>
                    )}
                    
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>Reliabilty</div>
                        <div className={`${commonStyles}`}>Security</div>
                        <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
                        <div className={`sm:rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
                        <div className={`${commonStyles}`}>Low Fee</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
                    </div>
                </div>
            
                <div className="flex flex-col justify-start items-center w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start white-glassmorphism h-40 sm:w-72 w-full eth-card rounded-xl flex-col my-5">
                        <div className="flex flex-col justify-between w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 border-2 rounded-full border-white flex items-center justify-center">
                                    <SiEthereum fontSize={21} color='#fff' />
                                </div>
                                <BsInfoCircle fontSize={18} color='#fff'/>
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">Address</p>
                                <p className="text-white font-bold text-sm mt-1">Eetherum</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <InputBox type="text" placeholder="Address To" name="addressTo" handleChange={handleChange} />
                        <InputBox type="number" placeholder="Amount (ETH)" name="amount" handleChange={handleChange} />
                        <InputBox type="text" placeholder="Keyword (GIF)" name="keyword" handleChange={handleChange} />
                        <InputBox type="text" placeholder="Enter Message" name="message" handleChange={handleChange} />
                        {
                            isLoading ?
                                <Loader />
                                : (<button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full py-2 cursor-pointer" onClick={handleSubmit}>Send Eth</button>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;