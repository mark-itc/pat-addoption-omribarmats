export async function getPets(
  apiKey,
  dog,
  cat,
  M,
  F,
  sheltered,
  fostered,
  adopted,
  h20,
  h40,
  h60,
  h80,
  w10,
  w20,
  w30,
  w40
) {
  try {
    console.log("trying");
    const response = await fetch(
      `http://localhost:3001/allpets/${dog}/${cat}/${M}/${F}/${sheltered}/${fostered}/${adopted}/${h20}/${h40}/${h60}/${h80}/${w10}/${w20}/${w30}/${w40}/`,
      {
        method: "get",
        headers: {
          accessToken: apiKey,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          return { success: false, message: "Message 1" };
        } else {
          return {
            success: true,
            data: data.allPets,
            message: "Message 2",
          };
        }
      });
    return response;
  } catch (e) {}
}

export const getUserPetsFromAPI = async (apiKey, userName) => {
  try {
    console.log("trying to get saved pets", userName);
    const response = await fetch(
      `http://localhost:3001/getuserpets/${userName}/`,
      {
        method: "get",
        headers: {
          accessToken: apiKey,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
          return { success: false, message: message };
        } else {
          console.log("data.pet", data.saved);
          return {
            success: true,
            saved: data.saved,
            adopted: data.adopted,
            fostering: data.fostering,
            message: "Message 2",
          };
        }
      });
    return response;
  } catch (e) {}
};

export const savePet = async (apiKey, userName, petName) => {
  try {
    console.log("trying to save", userName, petName);
    const response = await fetch(
      `http://localhost:3001/save/${userName}/${petName}`,
      {
        method: "post",
        headers: {
          accessToken: apiKey,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          alert("Pet saved");
        }
      });
  } catch (e) {}
};

export const unSavePet = async (apiKey, userName, petName) => {
  try {
    console.log("trying to save", userName, petName);
    const response = await fetch(
      `http://localhost:3001/unsave/${userName}/${petName}`,
      {
        method: "post",
        headers: {
          accessToken: apiKey,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          alert("Pet unsaved");
        }
      });
  } catch (e) {}
};

export const fosterPet = async (apiKey, userName, petName) => {
  try {
    console.log("trying to foster", userName, petName);
    const response = await fetch(
      `http://localhost:3001/foster/${userName}/${petName}`,
      {
        method: "post",
        headers: {
          accessToken: apiKey,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          alert("Pet fostered");
        }
      });
  } catch (e) {}
};

export const adoptPet = async (apiKey, userName, petName) => {
  try {
    console.log("trying to adopt", userName, petName);
    const response = await fetch(
      `http://localhost:3001/adopt/${userName}/${petName}`,
      {
        method: "post",
        headers: {
          accessToken: apiKey,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          alert("Pet adopted");
        }
      });
  } catch (e) {}
};

export const returnPet = async (apiKey, userName, petName) => {
  try {
    console.log("trying to return", userName, petName);
    const response = await fetch(
      `http://localhost:3001/return/${userName}/${petName}`,
      {
        method: "post",
        headers: {
          accessToken: apiKey,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          alert("Pet returned");
        }
      });
  } catch (e) {}
};
