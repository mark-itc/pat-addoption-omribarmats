import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState("");

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    role: "user",
  });

  useEffect(() => {
    setApiKey(Cookies.get("pet-adoption-credentials"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/", {
          headers: {
            accessToken: apiKey,
          },
        });
        if (response.data.error) {
          console.log("No success", response.data.error);
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          console.log("success", response.data);
          setAuthState({
            userName: response.data.userName,
            id: response.data.id,
            status: true,
            role: response.data.role,
          });
        }
      } catch (error) {
        console.log("fetchData error:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    };
    fetchData();
  }, [apiKey]);

  return (
    <authContext.Provider
      value={{
        authState,
        apiKey,
        setApiKey,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
