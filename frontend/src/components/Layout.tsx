import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
const Layout = () => {
    const {email}=useAuth();
    const [burger, setBurger] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="flex items-center gap-2">
                    <img src="hosp.png" alt="Luna Clinic Logo" className="w-12 h-12" />
                    <h1 className="text-2xl font-bold brandText outfit">Luna Clinic</h1>
                </div>
                <div className="hidden sm:flex gap-8 brandText">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-sm text-blue-500 hover:underline" : "text-sm hover:underline"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/doctors"
                        className={({ isActive }) =>
                            isActive ? "text-sm text-blue-500 hover:underline" : "text-sm hover:underline"
                        }
                    >
                        All Doctors
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "text-sm text-blue-500 hover:underline" : "text-sm hover:underline"
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? "text-sm text-blue-500 hover:underline" : "text-sm hover:underline"
                        }
                    >
                        Contact
                    </NavLink>
                </div>
                {email === "" || email === null || email===undefined ? (
                    <div className="hidden sm:flex gap-4 text-white text-sm">
                        <NavLink
                            to="/register"
                            className="hover:underline border-2 border-b-blue-100 rounded-2xl brandBackground p-1"
                        >
                            Create Account
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="hover:underline border-2 border-b-blue-100 rounded-2xl brandBackground p-1"
                        >
                            Login
                        </NavLink>
                    </div>
                ) : <h1 className="text-black">{email}</h1>}
                <div
                    className="sm:hidden cursor-pointer"
                    onClick={() => setBurger(!burger)}
                    aria-label="Toggle menu"
                >
                    <img src="hamburger.png" className="w-10 h-10" />
                </div>
            </div>

       
            {burger && (
                <div className="sm:hidden bg-white shadow-md absolute top-16 right-0 left-0 p-4">
                    <NavLink
                        to="/"
                        className="block text-sm text-blue-500 hover:underline mb-4"
                        onClick={() => setBurger(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/doctors"
                        className="block text-sm text-blue-500 hover:underline mb-4"
                        onClick={() => setBurger(false)}
                    >
                        All Doctors
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="block text-sm text-blue-500 hover:underline mb-4"
                        onClick={() => setBurger(false)}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="block text-sm text-blue-500 hover:underline mb-4"
                        onClick={() => setBurger(false)}
                    >
                        Contact
                    </NavLink>
                </div>
            )}

         
            <div className="mt-6">
                <Outlet />
         
            <div className="font-outfit flex flex-col items-center bottom-4 bg-zinc-800 w-full text-white rounded mt-7">
                <div className="flex justify-between sm:mx-[5%] w-full">
             
                    <div className="w-[40%]">
                        <div className="flex items-center gap-2">
                            <img src="hosp.png" alt="MedSync Logo" className="w-10 h-10" />
                            <p className="text-[20px] font-medium text-[#5AC5C8]">
                                <span className="text-[25px] font-bold text-[#04353D]">Luna</span>Clinic
                            </p>
                        </div>
                        <p className="mt-2 text-sm text-white">
                            Luna Clinic enhances doctor-patient communication by simplifying appointment scheduling,
                            medical history tracking, and secure online follow-ups. Patients can easily access lab
                            reports, receive feedback, and contact doctors directly, improving efficiency and care while
                            ensuring privacy.
                        </p>
                    </div>

                 
                    <div className="w-[20%] text-white text-sm">
                        <h1 className="font-semibold  mb-4">Company</h1>
                        <ul className="text-sm text-gray-700 space-y-2">
                            <li>
                                <NavLink to="/" className="hover:underline text-white">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="hover:underline text-white">
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/delivery" className="hover:underline text-white">
                                    Delivery
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy-policy" className="hover:underline text-white">
                                    Privacy Policy
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                  
                    <div className="w-[20%]">
                        <h1 className="font-semibold text-sm mb-4 text-white">Get in Touch</h1>
                        <p className="text-sm  text-white">+0-000-000-000</p>
                        <p className="text-sm text-white">webdev5@gmail.com</p>
                    </div>
                </div>

                <hr className="mx-[10%] h-[1.5px] mt-4 bg-[#909293]" />

                <div className="mt-5 font-medium text-white">
                    Copyright 2025 @ webdev5 - All Rights Reserved.
                </div>
            </div>
        </div>
        </div>
    );
}

export default Layout;
