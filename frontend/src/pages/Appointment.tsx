import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../lib/AuthContext";

const Appointment = () => {
    const { id } = useAuth();
    const location = useLocation();
    
    // Ensure location.state exists before accessing doctor details
    const doctor = location.state?.doctor?.name || 'Unknown';
    const doctorEmail = location.state?.doctor?.email || '';

    // State for inputs
    const [disease, setDisease] = useState("");
    const [description, setDescription] = useState("");

    const handleBooking = async () => {
        try {
            const response = await fetch("http://localhost:3000/auth/appointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctorEmail,
                    patientId: id,
                    message: description,
                    disease,
                }),
            });

            const result = await response.json();
            console.log("Appointment booked:", result);
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-100">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">Book Appointment with {doctor}</h1>

                <div className="w-full flex flex-col gap-3">
                    <label className="w-full">
                        <span className="block text-gray-700">Disease</span>
                        <input
                            type="text"
                            placeholder="Enter Disease"
                            value={disease}
                            onChange={(e) => setDisease(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    </label>

                    <label className="w-full">
                        <span className="block text-gray-700">Description</span>
                        <textarea
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full h-24"
                        />
                    </label>

                    <button
                        onClick={handleBooking}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
