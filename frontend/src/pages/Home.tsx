import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
const Home = () => {
    const {setEmail, email}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    const emailer = location.state?.email || "Unknown";
    const password=location.state?.password || "NOpwd";
    setEmail(emailer);
    
    useEffect(()=>{
        const isthereuserthere=async ()=>{
            try{
                const result=await fetch('http://localhost:3000/auth/isthere', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email:emailer, password})
                })
                const response=await result.json();
                if(!response){
                  
                   
                    console.log("Error verifying user, Please refresh your page");
                    navigate('/login');
                }
                setEmail(response.email);
                
              

                

            }catch(error){
                console.log(error);
            }
        }
        isthereuserthere();

    },[])
    const bookAppointment=async()=>{
        if(email!="" && email!=null){
            navigate('/doctors', {state: {email: email}});
        }

    }
    
  return (
    <div>
         <div className="brandBackground h-[400px] w-auto mx-20 mt-3 rounded-xl montserrat">
            <div className="sm:flex justify-around">
            <div className="flex flex-col items-center sm:flex sm:justify-center">
            <button className="font-extrabold text-white flex justify-center pt-3 montserrat">Book Appointment<br></br>
            With Trusted Doctors
            </button>
            <img src="doc1.png" className="h-[4px]"/>
            <p className="text-[7px] text-white pb-3 flex justify-center mx-[25%] sm:mx-0">Simply browse through our extensive list of trusted doctors, <br></br>schedule your appointment hassle-free</p>
            <h1 className="border-2 border-white bg-white rounded-xl p-1 text-[10px] " onClick={bookAppointment}>Book appointment</h1>
            


            </div>
            <img src="docsShow.png" className="sm:w-[400px] sm:h-[400px] h-[253px]"/>

            </div>
     

        </div>
        <div>
            <h1 className="font-bold flex justify-center pt-3">Find by Speciality</h1>
            <p className="text-[10px] flex justify-center ">Simply browse through our extensive <br></br>list of trusted doctors, schedule your<br></br> appointment hassle-free.</p>
            <div className="flex justify-center gap-3 pt-5">
                <img src="icon1.svg" className="w-13 h-13"/>
                <img src="icon2.svg" className="w-13 h-13"/>
                <img src="icon3.svg" className="w-13 h-13"/>
                <img src="icon4.svg" className="w-13 h-13"/>
                <img src="icon5.svg" className="w-13 h-13"/>


            </div>
            <div className="pt-9 mx-32 mt-7">
                <h1 className="font-bold flex justify-center">Top Doctors to Book</h1>
                <p className="text-[10px] flex justify-center pb-3">Simply browse through our extensive list of doctors</p>
                <div className="flex flex-col justify-center border-2 border-gray-600 w-[250px]">
                    <img src="doctorF.png" className="w-60 h-60"/>
                    <h1 className="text-green-500">Available</h1>
                    <h1 className="text-sm font-bold">General physician</h1>

                </div>

            </div>
       
        </div>
        
      
    </div>
  )
}

export default Home;
