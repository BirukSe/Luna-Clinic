import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Doctor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const department = location.state?.department || "Unknown";
  const [array, setArray] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const result = await fetch('/Data/Doctors.json');
        if (!result) {
          return console.log("Error with fetching");
        }
        const data = await result.json();
        const filteredDoctors = data[`${department}`] || [];
        setArray(filteredDoctors);
      } catch (error) {
        console.log("Something went wrong, Please try again");
      }
    };
    fetchDoctors();
  }, []);

  const generateStars = (rating: any) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleBookAppointment = (doctor: any) => {
    navigate("/appointment", { state: { doctor } });
  };

  return (
    <div>
      <h1 className="flex justify-center text-2xl font-extrabold text-mygreen pt-7 pb-3">{department}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-20 items-center justify-center">
        {array.map((dep: any) => (
          <div key={dep.name} className="mt-8 flex justify-center">
            <div className="cursor-pointer w-[220px] mx-auto border rounded-2xl shadow-lg overflow-hidden bg-white transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden">
                <img className="w-full h-[150px] object-cover" src={dep.profile_image} alt={dep.name} />
              </div>
              <div className="p-3 text-center text-myblack">
                <h1 className="font-extrabold text-lg text-mycolor">{dep.name}</h1>
                <h1 className="font-extrabold text-md text-mycolor">{dep.specialization}</h1>
                <div className="flex justify-center mt-2">
                  <h1 className="pl-2 pr-2 font-bold">{dep.rating}</h1>
                  {generateStars(dep.rating)}
                </div>
                <p className="mt-1 text-gray-600 text-xs">
                  Dr. {dep.name} specializes in {dep.specialization} with {dep.years_of_experience} years of experience. They have a rating of {dep.rating} and can be contacted at <span className="font-bold">{dep.contact}</span>.
                </p>
                <p className="mt-1 text-gray-600 text-xs">{dep.history}</p>

                {/* Book Appointment Button */}
                <button 
                  onClick={() => handleBookAppointment(dep)}
                  className="mt-3 w-full bg-mygreen text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
                >
                  Book Appointment
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctor;
