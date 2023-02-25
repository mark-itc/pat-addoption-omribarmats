import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { authContext } from "../Context/authContext";
import { ToggleBox } from "../Components/ToggleBox";
import { ProfileComp } from "../Components/ProfileComp";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import logo from "../Images/DogCats.png";
import profileImage from "../Images/omri-31072022.jpg";
import "../Components/Styles/Form.css";

export const Profile = () => {
  const navigate = useNavigate();
  const { authState } = useContext(authContext);
  const { apiKey } = useContext(authContext);
  const [user, setUser] = useState({});
  user.age = new Date().getFullYear() - new Date(user.birthDate).getFullYear();
  const { userName } = useParams();

  useEffect(() => {
    if (apiKey) {
      getUser();
    }
  }, [apiKey, userName]);

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/profile/${userName}`,
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
          } else {
            console.log("user data", data.user);
            setUser(data.user);
            console.log("authstate user", authState.userName);
            console.log("user user", user.userName);
          }
        });
    } catch (e) {}
  };

  return (
    <div>
      <ToggleBox
        userName={user.userName}
        authUserName={authState.userName}
        userRole={authState.role}
        tabLeft="Profile"
        tabRight="Edit"
        title={{
          left: `${user.firstName} | ${user.age} Y | ${user.city}`,

          right: "Edit Your Profile",
        }}
        logo={logo}
        body={{
          left: (
            <ProfileComp
              firstName={user.firstName}
              lastName={user.lastName}
              userName={user.userName}
              image={user.file}
              email={user.email}
              phone={user.phone}
              bio={user.bio}
            />
          ),

          right: (
            <div>
              <form className="RegularForm">
                <Input
                  label={"First name"}
                  type={"text"}
                  value={user.firstName}
                />
                <Input
                  label={"Last name"}
                  type={"text"}
                  value={user.lastName}
                />
                <Input label={"Email"} type={"email"} value={user.email} />
                <Input label={"Phone"} type={"tel"} value={user.phone} />
                <Input label={"Bio"} type={"text"} value={user.bio} />
                <Input label={"New password"} type={"text"} />
                <Input label={"Re-enter new password"} type={"text"} />
                <Button
                  text="Save"
                  type="submit"
                  style="button2"
                  backgroundColor="#a4506e"
                />
              </form>
            </div>
          ),
        }}
      />
    </div>
  );
};
