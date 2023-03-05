import logo from "../Images/DogCats.png";
import { ToggleBox } from "../Components/ToggleBox";
import { useState, useEffect, useContext } from "react";
import { authContext } from "../Context/authContext";
import { getPets } from "../API/petsAPI";
import { getUsers } from "../API/usersAPI";

export const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const { apiKey } = useContext(authContext);

  useEffect(() => {
    if (apiKey) {
      fetchPetsFromAPI();
      fetchUsersFromAPI();
    }
  }, [apiKey]);

  const fetchPetsFromAPI = async () => {
    const results = await getPets(apiKey);
    if (results.success) {
      setPets(results.data.map((pet) => pet.name));
    } else {
      console.log("No success");
    }
  };

  const fetchUsersFromAPI = async () => {
    const results = await getUsers(apiKey);

    if (results.success) {
      const filteredUsers = results.data
        .filter((user) => user.role === "user")
        .map((user) => user.userName);

      setUsers(filteredUsers);

      const filteredAdmins = results.data
        .filter((user) => user.role === "admin")
        .map((user) => user.userName);

      setAdmins(filteredAdmins);
    } else {
      console.log("No success");
      alert(results.data.message);
    }
  };

  return (
    <div>
      <ToggleBox
        alignment="left"
        tabLeft="Users"
        tabRight="Pets"
        title={{
          left: ``,
          right: "",
        }}
        body={{
          left: (
            <>
              <div className="adminList">
                <h2>Admins</h2>
                {admins.map((admin, index) => {
                  return (
                    <p>
                      {index + 1}. <a href={"/profile/" + admin}>{admin}</a>
                    </p>
                  );
                })}
              </div>
              <div className="adminList">
                <h2>Registered users</h2>
                {users.map((user, index) => {
                  return (
                    <p>
                      {index + 1}. <a href={"/profile/" + user}>{user}</a>
                    </p>
                  );
                })}
              </div>
            </>
          ),
          right: (
            <div className="adminList">
              <h2>Registered pets</h2>
              {pets.map((pet, index) => {
                return (
                  <p>
                    {index + 1}. <a href={"/pet/" + pet}>{pet}</a>
                  </p>
                );
              })}
            </div>
          ),
        }}
      />
    </div>
  );
};
