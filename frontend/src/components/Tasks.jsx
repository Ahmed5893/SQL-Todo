import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineCheckSquare } from "react-icons/ai";
import Modal from "./Modal";
import ReactCardFlip from "react-card-flip";
import { useCookies } from "react-cookie";
import Auth from "./Auth";
import Pagination from "./Pagination";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(null);
  const [selectedTask, setSelectedTask] = useState({});
  const [todosPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);// Get current posts
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodo = tasks.slice(indexOfFirstTodo, indexOfLastTodo);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userId = cookies.id;


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getData=async()=> {

    try {
      const res=await axios.get(`${import.meta.env.VITE_APP}/tasks/${userId}`);
       const data=await res.data;
       setTasks(data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
   
    if (authToken) {
      getData()
    }
  }, []);
  const formatTime = (dateString) => {
    // const date = new Date(dateString);
    // return dateString.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return dateString.substring(0, 5);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP}/tasks/delete/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (task) => {
    setSelectedTask(task);
    setModal(true);
  };
  const handleComplete = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_APP}/tasks/done/${id}`, {
      isCompleted: !tasks.find(task => task.id === id).isCompleted
    });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  //Sort by date
  const sortedTasks = currentTodo?.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );
console.log('Date',sortedTasks);
  return (
    <>
      {modal && (
        <Modal
          setModal={setModal}
          selectedTask={selectedTask}
          setTasks={setTasks}
          setSelectedTask={setSelectedTask}
        />
      )}
      <ul className="flex-col justify-between">
        {sortedTasks.map((task) => (
          <ReactCardFlip isFlipped={task.isCompleted} flipDirection="vertical">
            <li
              key={task.id}
              className="shadow-lg rounded-xl border border-gray-200 p-6 relative mb-3  "
              style={{ perspective: "1000px" }}
            >
              <div className="flex justify-between items-center  ">
                <div className="flex items-center justify-center relative">
                  <span className="flex items-center flex-col gap-1 text-xs absolute ">
                    <span
                      className="rounded-full mr-3 bg-[#3a75c4] p-2"
                      onClick={() => handleDelete(task.id)}
                    >
                      <i className="text-white hover:text-red-800 hover:cursor-pointer">
                        <MdOutlineDelete />
                      </i>
                    </span>
                    <span
                      className="rounded-full mr-3 bg-[#3a75c4] p-2"
                      onClick={() => handleEdit(task)}
                    >
                      <i className="text-white hover:text-red-800 hover:cursor-pointer">
                        <AiOutlineEdit />
                      </i>
                    </span>
                    <span
                      className="rounded-full mr-3 bg-[#3a75c4] p-2"
                      onClick={() => handleComplete(task.id)}
                    >
                      <i className="text-white hover:text-red-800 hover:cursor-pointer">
                        <AiOutlineCheckSquare />
                      </i>
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center w-72">
                  <span className="w-1/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-center text-sm  font-semibold items-center text-green-800">
                    {task.task}
                  </span>
                  <span className="w-1/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-center text-xs  font-bold items-center text-red-800 flex-col ">
                    {/* <Priority value={task.priority} text="" /> */}
                    <span className="text-sm text-black font-normal">
                      Priority:
                    </span>{" "}
                    {task.priority.toUpperCase()}
                  </span>

                  <span className="w-1/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-center text-sm  font-bold items-center text-black ">
                    {formatTime(task.dueDate)}
                  </span>
                </div>
              </div>
            </li>
            <li
              key={task.id}
              className="shadow-lg rounded-xl border border-gray-200 p-6 relative mb-3 h-[100px]   "
              style={{ perspective: "1000px" }}
            >
              <span className="text-xl text-center font-bold">Done</span>
              <span
                className="rounded-full mr-3 bg-[#3a75c4] p-2 absolute left-10 bottom-[35%] text-xl text-center"
                onClick={() => handleComplete(task.id)}
              >
                <i className="text-white hover:text-red-800 hover:cursor-pointer">
                  <AiOutlineCheckSquare />
                </i>
              </span>
            </li>
          </ReactCardFlip>
        ))}
      </ul>
      <Pagination
        todoPerPage={todosPerPage}
        totalTodos={tasks.length}
        paginate={paginate}
      />
    </>
  );
}

export default Tasks;
