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

export const addPet = async (apiKey, formData) => {
  try {
    const response = await fetch("http://localhost:3001/addpet", {
      method: "post",
      headers: {
        accessToken: apiKey,
      },
      body: formData,
    }).catch((error) => console.error(error));

    const results = await response.json();

    if (results.success === false) {
      alert(results.message);
    } else {
      alert("Pet added successfully");
    }
  } catch (e) {}
};

export const updatePet = async (apiKey, petName, petData, navigate) => {
  try {
    const response = await fetch(
      `http://localhost:3001/update/pet/${petName}`,
      {
        method: "post",
        headers: {
          accessToken: apiKey,
        },
        body: petData,
      }
    ).catch((error) => console.error(error));

    const results = await response.json();

    if (results.success === false) {
      alert(results.message);
    } else {
      alert("Pet updated successfully");
      navigate(0);
    }
  } catch (e) {}
};

export const getPet = async (
  apiKey,
  name,
  setPet,
  setType,
  setGender,
  setStatus,
  setHeight,
  setWeight,
  setColor,
  setHypoallergenic
) => {
  try {
    const response = await fetch(`http://localhost:3001/pet/${name}`, {
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
          setPet(data.pet);
          setType(data.pet.type);
          setGender(data.pet.gender);
          setStatus(data.pet.status);
          setHeight(data.pet.height);
          setWeight(data.pet.weight);
          setColor(data.pet.color);
          setHypoallergenic(data.pet.hypoallergenic);
        }
      });
  } catch (e) {}
};
