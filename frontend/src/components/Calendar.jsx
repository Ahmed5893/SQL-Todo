import React from 'react'

const Calendar = () => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = new Date();
const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

const days = [];
for (let i = 0; i < 7; i++) {
  const date = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + i);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const isToday = date.toDateString() === today.toDateString();
  days.push({ dayOfWeek, dayOfMonth, isToday });
}

return (
  <div className="w-4/4 mx-auto mt-6 shadow-md shadow-gray-400 p-2 bg-blue-200 ">
  <div className="w-full mt-4 flex text-sm flex-col text-center justify-center ">
    <div className=" px-[10px] flex justify-between text-center items-center mb-2 font-bold">
      {daysOfWeek.map((day) => (
        <p key={day}>{day}</p>
      ))}
    </div>
    <div className="w-full pl-1 flex justify-between text-center items-center">
      {days.map((day) => (
       <span
       key={day.dayOfMonth}
       className={`h-7 w-7 rounded-full cursor-pointer transition-all hover:bg-[#063c76] hover:text-white bg-[#fff] flex justify-center items-center ${
         day.isToday ? 'bg-red-500 text-white' : ''
       }`}
     >
       <p>{day.dayOfMonth}</p>
     </span>
      ))}
    </div>
  </div>
  </div>
);
      }


export default Calendar