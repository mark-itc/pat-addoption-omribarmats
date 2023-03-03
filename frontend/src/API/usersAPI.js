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
