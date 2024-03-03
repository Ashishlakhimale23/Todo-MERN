import { useCallback, useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

function Signin() {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const triggerhandel = useCallback(async () => {
    await axios
      .post("todo/signin",{
        email,
        password,
        username
      })
      .then((res) => {
        console.log(res);
        setEmail("")
        setPassword("")
        setUsername("")
        navigate("/login")


      })
      .catch((error) => console.log(error));
  }, [email,password,username]);

  const handelsubmit = useCallback((e) => {
    e.preventDefault();
    triggerhandel();
    
  }, [triggerhandel]);

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <form action="" className=" relative sm:w-96 mx-auto text-center" onSubmit={handelsubmit}>
        <label className="text-2xl font-light">Login to your account</label>
        <div className="mt-4 bg-white shadow-md rounded-lg">
          <div className="h-2 bg-indigo-500 rounded-t-md"></div>
          <div className="px-3 py-4">
            <label className="block font-semibold text-left">Email</label>
            <input
              type="text"
              placeholder="email"
              className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
              value={email}
              onChange={(e) => 
                setEmail(e.target.value)
              }
            />
            <label className="block font-semibold text-left">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
              value={username}
              onChange={(e) => 
                setUsername(e.target.value)
              }
            />
            <label className="block mt-2 font-semibold text-left">Password</label>
            <input
              type="text"
              placeholder="Password"
              className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <div className="flex justify-between items-baseline">
              <button type="submit" className="px-5 py-3 bg-indigo-500 mt-2 text-white rounded-md hover:bg-indigo-400">
                Signin
              </button>
              <a href="/login" className="font font-semibold" >login</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Signin;
