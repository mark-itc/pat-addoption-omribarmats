export const register = async (
  formData,
  setApiKey,
  userName,
  Cookies,
  navigate
) => {
  try {
    const response = await fetch("http://localhost:3001/register", {
      method: "post",
      headers: {},
      body: formData,
    })
      .catch((error) => console.error(error))

      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          setApiKey(data.token);
          alert("Success! You are now registered");
          Cookies.set("pet-adoption-credentials", data.token);
          navigate(`/profile/${userName}`);
        }
      });
  } catch (e) {}
};

export const login = async (email, password, setApiKey, Cookies, navigate) => {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          setApiKey(data.token);
          alert("Success! You are now logged-in");
          Cookies.set("pet-adoption-credentials", data.token);
          navigate("/search");
        }
      });
  } catch (e) {}
};

export async function getUsers(apiKey) {
  try {
    const response = await fetch("http://localhost:3001/allusers", {
      method: "get",
      headers: {
        accessToken: apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          return { success: false, message: "message 1" };
        } else {
          return {
            success: true,
            data: data.allUsers,
          };
        }
      });
    return response;
  } catch (e) {}
}

export const updateUser = async (apiKey, userName, userData, navigate) => {
  try {
    const response = await fetch(`http://localhost:3001/update/${userName}`, {
      method: "post",
      headers: {
        accessToken: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          alert("User updated successfully");
          navigate(0);
        }
      });
  } catch (e) {}
};

export const getUser = async (userName, setUser, apiKey) => {
  try {
    const response = await fetch(`http://localhost:3001/profile/${userName}`, {
      method: "get",
      headers: {
        accessToken: apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          setUser(data.user);
        }
      });
  } catch (e) {}
};
