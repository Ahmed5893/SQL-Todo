import axios from 'axios';
import React from 'react'

const Modal = ({setModal,selectedTask,setTasks,setSelectedTask}) => {

    const handleEditSubmit = async () => {
        try {
          const updatedTask = { ...selectedTask, task: selectedTask.task,dueDate:selectedTask.dueDate,priority: selectedTask.priority};
          await axios.patch(
            `/api/tasks/edit/${selectedTask.id}`,
            updatedTask
          );
          setTasks(
            tasks.map((task) => {
              if (task.id === selectedTask.id) {
                return updatedTask;
              } else {
                return task;
              }
            })
          );
          setModal(false);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
  
            
            <div class=" bg-gray-900 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0  m-auto " id="modal">
                <div class="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center items-center">
                <form class="mx-auto max-w-6xl p-12" onSubmit={handleEditSubmit} >
        <div class="flex flex-col md:flex-row justify-center">
          <div class="md:w-1/2 max-w-md flex flex-col justify-center">
           
          </div>
          <div class="md:w-1/2 flex justify-start mt-5 md:justify-end w-full  ">
            <div class="shadow-md flex-auto max-w-sm p-10 pb-20">
              <div class="w-full">
                <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span class="text-red-400 mr-1">*</span> Task
                </div>
                <div class="my-2 bg-white p-1 flex border border-gray-200 rounded">
                
                  <input class="p-1 px-2 appearance-none outline-none w-full text-gray-800" value={selectedTask.task} onChange={(event) => setSelectedTask({...selectedTask, task: event.target.value})} />
                </div>
              </div>
              <div class="w-full">
                <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span class="text-red-400 mr-1">*</span> Due Date
                </div>
                <div class="my-2 bg-white p-1 flex border border-gray-200 rounded">
                  
                  <input
                    type="time"
                    class="p-1 px-2 appearance-none outline-none w-full text-gray-800" value={selectedTask.dueDate} onChange={(event) => setSelectedTask({...selectedTask, dueDate: event.target.value})}
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  <span class="text-red-400 mr-1">*</span> Priority
                </div>
                <div class="my-2 bg-white p-1 flex border border-gray-200 rounded">
                 
                  {/* <input type='number' min={1} max={5} class="p-1 px-2 appearance-none outline-none w-full text-gray-800" placeholder="Choose from 1 to 5" value={selectedTask.priority} onChange={(event) => setSelectedTask({...selectedTask, priority: event.target.value})}  /> */}

<select name="priority" id="priority" required  value={selectedTask.priority}
  onChange={(event) =>
    setSelectedTask({ ...selectedTask, priority: event.target.value })
  }>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="normal">Normal</option>
  <option value="low">Low</option>
</select>
                </div>
              </div>
              <div class="mt-6 relative ">
                <button type="submit" class="group rounded-2xl h-14 w-48 bg-green-500 font-bold text-lg text-white relative overflow-hidden text-center focus:outline-none">
                  Edit Task
                  <div class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
                </div>
            </div>
            {/* <div class="w-full flex justify-center py-12" id="button">
                <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm" onclick="modalHandler(true)">Open Modal</button>
            </div> */}
           
            
    </div>
  )
}

export default Modal