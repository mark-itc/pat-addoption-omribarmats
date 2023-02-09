import logo from "../Images/DogCats.png";
import { ToggleBox } from "../Components/ToggleBox";

const admins = ["Yossi", "Itzik"];
const users = ["Josh Berkman", "Carla", "Reuven", "Malka", "Tzipi"];
const pets = ["Pizza", " Keys", "Enrique", "August", "Jermiah", "Linda"];

export const Admin = () => {
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
                      {index + 1}. <a href="/profile">{admin}</a>
                    </p>
                  );
                })}
              </div>
              <div className="adminList">
                <h2>Registered users</h2>
                {users.map((user, index) => {
                  return (
                    <p>
                      {index + 1}. <a href="/pet">{user}</a>
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
                    {index + 1}. <a href="/pet">{pet}</a>
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
