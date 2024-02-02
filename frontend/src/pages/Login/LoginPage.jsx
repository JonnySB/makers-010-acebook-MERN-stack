import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { login } from "../../services/authentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      window.localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>

    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          acebook    
      </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Welcome back, login
                </h1>
                <form 
                  className="space-y-4 md:space-y-6" 
                  onSubmit={handleSubmit}>

                    <div>
                      <label 
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Your email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <svg 
                            className="w-4 h-4 text-gray-500 dark:text-gray-400" 
                            aria-hidden="true" 
                            fill="currentColor" 
                            viewBox="0 0 20 16"
                          >
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                          </svg>
                        </div>
                        <input 
                          type="email" 
                          name="email" 
                          id="email" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          placeholder="*name@company.com" 
                          value={email}
                          onChange={handleEmailChange}
                          required=""
                        />
                      </div>
                    </div>

                    <div>
                      
                          <label 
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                            </label>
                            <div className="relative">
                          <input 
                          type={showPassword ? "text" : "password"}
                          name="password" 
                          id="password" 
                          placeholder="••••••••" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          value={password}
                          onChange={handlePasswordChange}
                          required=""
                          />
                          <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer">
                    <svg 
                      className="w-[20px] h-[20px] text-gray-800 dark:text-white" 
                      aria-hidden="true" 
                      onClick={togglePasswordVisibility}
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <>
                          <path
                            stroke="currentColor"
                            strokeWidth="1.1"
                            d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            strokeWidth="1.1"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </>
                      ) : (
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.1"
                          d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      )}
                    </svg>
                  </div>
                        </div>
                    </div>

                    <button role="submit-button"type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Forgotten password?</a>
                    </p>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don't have an account already?  <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up</Link>
                      </p>

                </form>
            </div>
        </div>
    </div>
  </section>
  </>
  );
};
