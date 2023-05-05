import axios from "axios";
import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";


const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && data.password !== data.confirmPassword) {
      setError("Make sure passwords match!");
      return;
    }

    const res = await axios.post(`http://localhost:5001/api/auth/${endpoint}`, {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    const dataFromServer = await res.data;

    if (dataFromServer.detail) {
      setError(dataFromServer.detail);
    } else {
      setCookie("id", dataFromServer.id);
      setCookie("AuthToken", dataFromServer.token);
      setCookie("name", dataFromServer.name);
      setCookie("email", dataFromServer.email);

      window.location.reload();
    }
  };

  return (
    <div>
      <section className="bg-gray-50 m-auto ">
        <div className="flex justify-between items-center py-4 ">
          <button
            onClick={() => viewLogin(false)}
            className={`${isLogin ? "bg-blue-300" : "bg-blue-600"}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            className={`${isLogin ? "bg-blue-600" : "bg-blue-300"}`}
          >
            Login
          </button>
        </div>
        <div className=" flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {isLogin ? "Log In" : "Create your account"}
              </h1>
              <form className="space-y-4 md:space-y-6">
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="add your name"
                      required
                      value={data.name}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@email.com"
                    required
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                    value={data.password}
                    onChange={handleChange}
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus: focus:border-gray-600 block w-full p-2.5 "
                      required
                      value={data.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {error && <p>{error}</p>}

                <button
                  type="submit"
                  className="w-full text-black bg-blue-300 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
