import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Components/Styles/Form.css";
import { authContext } from "../Context/authContext";
import { ToggleBox } from "../Components/ToggleBox";
import { ProfileComp } from "../Components/ProfileComp";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import logo from "../Images/DogCats.png";
import { getUser, updateUser } from "../API/usersAPI";

export const Profile = () => {
  const navigate = useNavigate();
  const { authState } = useContext(authContext);
  const { apiKey } = useContext(authContext);
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [city, setCity] = useState(null);
  const [bio, setBio] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [passWordAlert, setPassWordAlert] = useState(false);
  const { userName } = useParams();
  user.age = new Date().getFullYear() - new Date(user.birthDate).getFullYear();

  const userData = {
    firstName,
    lastName,
    email,
    phone,
    city,
    bio,
    password,
  };

  const filteredUserData = Object.fromEntries(
    Object.entries(userData).filter(
      ([key, value]) => value !== null && value !== ""
    )
  );

  useEffect(() => {
    if (apiKey) {
      getUser(userName, setUser, apiKey);
    }
  }, [apiKey, userName]);

  useEffect(() => {
    setPassWordAlert(password !== rePassword ? true : false);
  }, [password, rePassword]);

  const handleUpdateClick = () => {
    updateUser(apiKey, userName, filteredUserData, navigate);
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
              adopted={user.adopted}
              fostering={user.fostering}
            />
          ),

          right: (
            <div>
              <form className="RegularForm">
                <Input
                  label={"First name"}
                  type={"text"}
                  value={user.firstName}
                  onInputChange={(eventValue) => {
                    setFirstName(eventValue);
                  }}
                />
                <Input
                  label={"Last name"}
                  type={"text"}
                  value={user.lastName}
                  onInputChange={(eventValue) => {
                    setLastName(eventValue);
                  }}
                />
                <Input
                  label={"Email"}
                  type={"email"}
                  value={user.email}
                  onInputChange={(eventValue) => {
                    setEmail(eventValue);
                  }}
                />
                <Input
                  label={"Phone"}
                  type={"tel"}
                  value={user.phone}
                  onInputChange={(eventValue) => {
                    setPhone(eventValue);
                  }}
                />
                <Input
                  label={"City"}
                  type={"text"}
                  value={user.city}
                  onInputChange={(eventValue) => {
                    setCity(eventValue);
                  }}
                />
                <Input
                  label={"Bio"}
                  type={"text"}
                  value={user.bio}
                  onInputChange={(eventValue) => {
                    setBio(eventValue);
                  }}
                />
                <Input
                  label={"New password"}
                  type={"password"}
                  onInputChange={(eventValue) => {
                    setPassword(eventValue);
                  }}
                />
                <Input
                  label={"Re-enter new password"}
                  type={"password"}
                  onInputChange={(eventValue) => {
                    setRePassword(eventValue);
                  }}
                />
                {passWordAlert ? "New passwords do not match" : null}
                <Button
                  text="Update"
                  type="submit"
                  style="button2"
                  backgroundColor="#a4506e"
                  onClick={(event) => {
                    event.preventDefault();
                    handleUpdateClick();
                  }}
                  disabled={passWordAlert}
                />
              </form>
            </div>
          ),
        }}
      />
    </div>
  );
};
