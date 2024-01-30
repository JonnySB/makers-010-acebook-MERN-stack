import { useState } from "react";
import { useNavigate } from "react-router-dom"; // What is useNavigate? A hook provided by React Router for navigating between different pages. 

import { login } from "../../services/authentication"; // Look this up

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents html default action
    try {
      const token = await login(email, password); // Fetch request using the login from authentication

      // window.localStorage - web storage object that allows you to store key-value pairs locally in a user's browser. 
      // window object is the global object in a web browser. I guess it means that some values are stored within the browser environment
      //.setItem is a method called on the local storage. 
      // From this, I deduce that setItem is just a function taht stores the token received from the above fetch inside the global local storage
      // The key is "token" and the value is from the fetch request above. 
      // The purpose of this is for authentication, but also user preferences and other info you want to persist locally on user's browser. 
      // The .setItem method is part of the localStorage object which is part of the Web Storage API in JS. 
      window.localStorage.setItem("token", token);
      navigate("/posts"); 
    } catch (err) {
      console.error(err); 
      navigate("/login"); 
    }
  };

  const handleEmailChange = (event) => { 
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => { 
    setPassword(event.target.value);
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
