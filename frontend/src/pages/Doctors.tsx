import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  
  const handleDoctor = (value: any) => {
    try {
      navigate("/showDoctor", { state: { department: value } });
    } catch (error) {
      console.log("There seems to be a problem");
    }
  };
  
  useEffect(() => {
    const fetchDeps = async () => {
      try {
        const result = await fetch('/Data/Department.json');
        const mydata = await result.json();
        if (!result.ok) {
          console.log("Something went wrong");
        }
        setArray(mydata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeps();
  }, []);
  
  console.log("my data is", array);
  
  return (
    <div className="font-outfit">
      <h1 className="flex justify-center text-2xl text-mygreen font-extrabold pt-7 pb-3">Departments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-20">
        {array.map((dep, index) => (
          <div key={index} className="mt-4">
            <div
              className="cursor-pointer w-[220px] mx-auto border rounded-2xl shadow-lg overflow-hidden bg-white transition-transform duration-300 hover:scale-105"
              onClick={() => handleDoctor(dep.name)}
            >
              <div className="overflow-hidden">
                <img className="w-full h-[180px] object-cover" src={dep.image} alt={dep.name} />
              </div>
              <div className="p-3 text-center text-myblack">
                <h1 className="font-extrabold text-lg">{dep.name}</h1>
                <h1 className="font-semibold text-md text-gray-700">{dep.specialization}</h1>
                <p className="mt-1 text-gray-600 text-xs">{dep.description}</p>
                <p className="mt-1 text-gray-500 text-xs">{dep.history}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
