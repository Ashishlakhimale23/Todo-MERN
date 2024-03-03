import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);
  const navigator = useNavigate();
 
  

  useEffect(() => {
    const authtoken = localStorage.getItem("authtoken");
    if (!authtoken) {
 console.log("header not send");
      navigator("/signin")

    } else {
       axios.defaults.headers.common["Authorization"] = `Bearer ${authtoken}`;
        
    }

    const fetchtodo = async () => {
      try {
        const response = await axios.get("todo/user");
        setTodo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchtodo();
  }, []);


  const deletefromtheserver = async (id)=>{
    try {
      console.log(id)
      await axios.delete("todo/delete",{data:{deleteid:id}}).then((res)=>{
        console.log(res);
      }).catch(error=>console.log(error))
    }
    catch(error){
      console.log(error)
    }
  }

  const todoserverinsertion = useCallback(async () => {
    try {
      
      const response = await axios.post("todo/user", { title, description });
      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [title,description,todo]);
  
  const changecolor = async (id)=>{
    try{
      console.log(id)
      const response = await axios.put("todo/completed",{id})
      console.log(response.data)
    }
    catch(error){
      console.log(error)
    }
    

  }

  const logout =()=>{
    localStorage.removeItem("authtoken")
    navigator("/login")
  }

  




   return (
    <div className=" w-full h-screen p-4 space-y-4">
      <div className="flex justify-between">
        <label htmlFor="" className="text-3xl font-semibold ">
          Task's
        </label>
        <button className="bg-red-700 text-white py-2 px-3 font-medium rounded-md " onClick={logout}>logout</button>
      </div>
      <div className=" flex space-x-2">
        <div className="flex flex-col h-fit w-96 p-4 bg-black space-y-4 rounded-md">
          <label htmlFor="" className="text-white">
            Title
          </label>
          <input
            type="text"
            className="py-2 px-2 rounded-md outline-none "
            value={title}
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="" className="text-white">
            Description
          </label>
          <input
            type="text"
            className="py-2 px-2 rounded-md outline-none"
            value={description}
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            className="text-white"
            onClick={() => {
              if (title === "" || description === "") {
                return;
              }
              todoserverinsertion();

              setTitle("");
              setDescription("");
            }}
          >
            Add Task
          </button>
        </div>
        <div className="grow">
          <ul className="space-y-2 ">
            {todo.map((t) => (

              <li
                key={t._id}
                className=" p-3 text-white rounded-md flex justify-between bg-black"
                style={t.completed ? {backgroundColor:"green"}:{backgroundColor:"black"}}
                


              >
                <span>
                  <strong>{t.title}</strong> : {t.description}
                </span>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={()=>{
                      
                      if(t.completed===true){
                        return
                      }
                      changecolor(t._id);
                      setTodo(todo.map((element)=>{
                        if(element._id===t._id){
                          return {...element,completed:true}
                        }
                        return element
                      }))
                      

                    }}



                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={async ()=>{
                      
                      deletefromtheserver(t._id);
                      
                      
                      setTodo(todo.filter((task)=>task._id!=t._id))
                    }}



                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Todo;
