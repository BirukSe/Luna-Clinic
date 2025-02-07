import { useState } from "react";
import Load from "../../components/Load";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate=useNavigate();
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [error,setError]=useState("");
  const [name, setName]=useState("");
  const [loading, setLoading]=useState(false);
  const handleSignup=async ()=>{
    try{
      setLoading(true);
      const response=await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:name,role: 'patient',email:email, password:password})
      })
      const result=await response.json();
      if(!result){
        console.log("Something went wrong, please try again");
        setError("Something went wrong, please try again");
      }
      
      navigate('/', {state: {email: result.email, password: result.password}});



    }catch(error:any){
      setLoading(false);
      setError(error.message);
      console.log(error)

    }finally{
      setLoading(false);
    }
  }
  return (
    <>
    {loading && <Load/>}
    <div className="min-h-screen min-w-screen w-full bg-gradient-to-r from-purple-700 via-purple-500 to-blue-400
">
      <div className="flex items-centeer justify-around items-center">
        <div className="md:flex md:items-center md:mx-[25%]  md:flex-col hidden">
          <img src="rocket.png" className="w-10 h-10"/>
          <h1 className="font-bold text-white">Welcome</h1>
        </div>
        <div className="p-14 ml-auto h-[370px] color  border  flex flex-col items-center justify-center mt-14 rounded-l-[100px]
">
          <h1 className="font-extrabold">Register as Patient</h1>
          <div className="space-y-4">
          <input
            type="email"
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=>setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
          />
          <p className="text-sm">Already have an account?<a href='/login' className="text-blue-500 underline">Login</a></p>
          <button
            className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <p className="text-red-500 italic text-sm">{error}</p>
        </div>



        </div>


      </div>

      
    </div>
    </>
  )
}

export default Signup;
