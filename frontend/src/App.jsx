import { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Form from "./components/Form";
import Modal from "./components/Modal";
import Tasks from "./components/Tasks";
import { useCookies } from 'react-cookie'
import Auth from "./components/Auth";
import ProfileDropDown from'./components/ProfileDropDown'

function App() {
  const [date, setDate] = useState(new Date().toDateString());
  const [time, setTime] = useState();
  const [form, setForm] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  setInterval(function () {
    const options = { hour: "numeric", minute: "numeric" };
    const t = new Date().toLocaleTimeString([], options);
    setTime(t);
  }, 500);

  return (
    <div className="border-2 border-black p-4">
      <div className="mt-3 text-sm text-[#8ea6c8] flex justify-between items-center">
        <p className="text-blue-800">{date}</p>
        <p className="text-black">{time}</p>
      </div>
      {/* <p className="text-xl font-semibold mt-2 text-[#063c76]">To-Do List</p> */}
      {!authToken && <Auth/>}
      {authToken &&<>
      {form ? (
        <Form setForm={setForm} />
      ) : (
        <>

         <div>
          <ProfileDropDown/>
          </div>
          <label className="label">
            <input
              className="input"
              type="button"
              onClick={() => setForm(true)}
            />
            <span>+</span>
          </label>
          <Calendar />
          <div className="flex  min-h-tab ">
            <div className="h-auto  w-[400px] bg-white rounded-lg p-4">
              <Tasks/>
            </div>
          </div>
        </>
      )}
       </>}
    </div>
  );
}

export default App;
