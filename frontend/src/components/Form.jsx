import React from "react";
import { useState } from "react";
import Calendar from "./Calendar";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { useCookies } from 'react-cookie'

const Form = ({setForm}) => {
  const [task,setTask]=useState('');
  const [date,setDate]=useState('')
  const [priority,setPriority]=useState('')
  const history = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const handleSubmit=(e)=>{
    e.preventDefault()
  if(!task ||!date ||!priority) {
  toast.error("Please add task,date and priority value")
  return;
  }
  // const formattedDate = new Date(date).toISOString();
  axios.post(`${process.env.REACT_APP_SERVERURL}/tasks/add`, { userId:cookies.id,task, dueDate: date, priority })
    .then((res) => {
    console.log(res.data); 
    setForm(null)

  })
  .catch((err) => {
    console.log(err); 
  });
  
  }
  return (
    <div>
      <div className="w-3/4 mx-auto ">
        <Calendar />
      </div>
      <form class="mx-auto max-w-6xl p-12" onSubmit={handleSubmit}>
        <div class="flex flex-col md:flex-row justify-center">
          <div class="md:w-1/2 max-w-md flex flex-col justify-center">
            <div class="md:text-4xl text-xl font-black uppercase">
              Awesome tool for your daily tasks
            </div>
            <div class="text-xl mt-4">
              Boost Your Productivity with Our Top-rated Todo App
            </div>
          </div>
          <div class="md:w-1/2 flex justify-start mt-5 md:justify-end w-full  ">
            <div class="shadow-md flex-auto max-w-sm p-10 pb-20">
              <div class="w-full">
                <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span class="text-red-400 mr-1">*</span> Task
                </div>
                <div class="my-2 bg-white p-1 flex border border-gray-200 rounded">
                
                  <input class="p-1 px-2 appearance-none outline-none w-full text-gray-800" value={task} onChange={(e)=>setTask(e.target.value)} />
                </div>
              </div>
              <div class="w-full">
                <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span class="text-red-400 mr-1">*</span> Due Date
                </div>
                <div class="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  
                  <input
                    type="time"
                    class="p-1 px-2 appearance-none outline-none w-full text-gray-800" value={date} onChange={(e)=>setDate(e.target.value)}
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span class="text-red-400 mr-1">*</span> Priority
                </div>
                <div class="my-2 bg-white p-1 flex border border-gray-200 rounded">
                 
                  {/* <input type='number' min={1} max={5} class="p-1 px-2 appearance-none outline-none w-full text-gray-800" placeholder="Choose from 1 to 5" value={priority} onChange={(e)=>setPriority(e.target.value)} /> */}
                  <select name="priority" id="priority" required  defaultValue={priority}
  onChange={(e)=>setPriority(e.target.value)}>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="normal">Normal</option>
  <option value="low">Low</option>
</select>
                </div>
              </div>
              <div class="mt-6 relative ">
                <button type="submit" class="group rounded-2xl h-14 w-48 bg-green-500 font-bold text-lg text-white relative overflow-hidden text-center focus:outline-none">
                  Add Task
                  <div class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer position="bottom-center" limit={1} />

    </div>
  );
};

export default Form;
