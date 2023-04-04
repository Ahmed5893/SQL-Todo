import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="">
<div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-gray-800">Todo List</h1>
            <div className="flex mt-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-800" placeholder="Add Todo"/>
                <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
            </div>
        </div>
        <div>
            <div className="flex mb-4 items-center">
                <p className="w-full text-gray-800">Add another component to Tailwind Components</p>
                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-300 hover:bg-green-800">Done</button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-300 hover:text-white hover:bg-red-800">Remove</button>
            </div>
          	<div className="flex mb-4 items-center">
                <p className="w-full line-through text-green-600">Submit Todo App Component to Tailwind Components</p>
                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-500 border-gray-500 hover:bg-gray-800">Not Done</button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-400 hover:text-white hover:bg-red-600">Remove</button>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default App
