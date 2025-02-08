import { useState } from "react";
import Load from "../../components/Load";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../lib/AuthContext";
import { JwtPayload } from 'jsonwebtoken';

export interface CustomJwtPayload extends JwtPayload {
  role: string;  // Add the role property here
}


const Login = () => {
  const {setEmail:any}=useAuth();
  
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient"); 
  const [error, setError]=useState("");
  const [loading, setLoading]=useState(false);

  // Handle role change
  const handleRoleChange = (selectedRole:any) => {
    setRole(selectedRole);
  };
  const handleLogin=async ()=>{
    try{
      setLoading(true);
      const response=await fetch('http://localhost:3000/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({role,email, password})
      })
      const result=await response.json();
      if(!result){
        setError("Something went wrong, please try again");
        console.log("Something went wrong, please try again")
      }
      localStorage.setItem('token', result.token);
      const decoded = jwtDecode(result.token) as CustomJwtPayload;
      console.log("the decoded jwt", decoded);
     
        if (decoded.role === "patient") {
          localStorage.setItem('email', decoded.name);
          navigate('/', { state: { email: decoded.name } });
        }
        else if(decoded.role=="doctor"){
          navigate('/doc', {state: {email: decoded.email, name: decoded.name}})
        }

      
      
     
      



    }catch(error:any){
      setLoading(false);
      setError(error.message);
      
      console.log(error);

    }finally{
      setLoading(false);
    }

  }

  return (
    <>
    {loading && <Load/>}
    <div className="min-h-screen min-w-screen w-full bg-gradient-to-r from-purple-700 via-purple-500 to-blue-400">
      <div className="flex items-center justify-around">
        <div className="sm:flex sm:items-center sm:mx-[25%] sm:flex-col hidden">
          <img src="rocket.png" className="w-10 h-10" />
          <h1 className="font-bold text-white">Welcome</h1>
        </div>
        <div className="ml- p-14 h-[370px] border flex flex-col color items-center justify-center mt-14 sm:rounded-l-[100px] rounded-lg">
          <div className="flex justify-end gap-3 w-full">
            <button
              className={`border-2 border-green-500 rounded-xl hover:bg-green-500 m-0 ${role === "patient" ? "bg-green-500 text-white" : ""}`}
              onClick={() => handleRoleChange("patient")}
            >
              Patient
            </button>
            <button
              className={`border-2 border-green-500 rounded-xl hover:bg-green-500 m-0 ${role === "doctor" ? "bg-green-500 text-white" : ""}`}
              onClick={() => handleRoleChange("doctor")}
            >
              Doctor
            </button>
            <button
              className={`border-2 border-green-500 rounded-xl hover:bg-green-500 m-0 ${role === "admin" ? "bg-green-500 text-white" : ""}`}
              onClick={() => handleRoleChange("admin")}
            >
              Admin
            </button>
          </div>
          <h1 className="font-extrabold">Login as {role}</h1>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className="text-sm">
              Don't have an account? <a href="/register" className="text-blue-500 underline">Signup</a>
            </p>
            <button className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300" onClick={handleLogin}>
              Login
            </button>
            <p className="text-red-500 italic text-sm">{error}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
