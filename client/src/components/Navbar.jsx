import { useState } from "react";
import { HiMenu } from 'react-icons/hi';
import { AiOutlineClose } from "react-icons/ai";
import logo from '../assets/react.svg';
const Navbar = () => {
    const MenuItem = ({ title, classprops }) => {
        return (
            <li className={`mx-4 cursor-pointer ${classprops}`}>{ title }</li>
        )
    }

    const [mobileMenu, setMobileMenu] = useState(false);

    const menu = ['Home', 'Market', 'Exchange', 'Wallet'];
    
    return (
        <nav className="w-full flex items-center justify-between md:justify-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="Logo"/>
            </div>
            <ul className="md:flex flex-initial hidden list-none text-white justify-between flex-row items-center">
                {menu.map((title, index) => (
                    <MenuItem title={title} key={index}/>
                ))}
                <li className="bg-blue-500 px-7 py-2 mx-2 rounded-full cursor-pointer hover:bg-blue-800">Login</li>
            </ul>
            <div className="flex relative">
                {!mobileMenu && (
                    <HiMenu fontSize={24} className="text-white md:hidden cursor-pointer"
                    onClick={() => setMobileMenu(true)
                    } />)}
                { mobileMenu && (
                    <AiOutlineClose fontSize={24} className="text-white md:hidden cursor-pointer" onClick={() => setMobileMenu(false)} />)}
                {mobileMenu && (
                    <ul className="text-white z-10 fixed top-0 -right-2 w-[70vw] h-screen list-none shadow-2xl flex flex-col rounded-md items-end animate-slide-in blue-glassmorphism p-2 justify-start">
                        <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setMobileMenu(false)} /></li>
                        {menu.map((title, index) => (
                            <MenuItem classprops={'my-2 text-lg'} title={title} key={index}/>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    )
}
export default Navbar;