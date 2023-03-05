import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { authContext } from "../Context/authContext";
import { ToggleBox } from "../Components/ToggleBox";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import logo from "../Images/DogCats.png";
import "../Components/Styles/Form.css";
import Cookies from "js-cookie";
import { register, login } from "../API/usersAPI";

export const LoginSignup = () => {
  const navigate = useNavigate();
  const { setApiKey } = useContext(authContext);
  const { authState } = useContext(authContext);

  if (authState.status) navigate("/search");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(0);
  const [birthDate, setBirthDate] = useState(0);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [bio, setBio] = useState(null);
  const [file, setFile] = useState(null);
  const [passWordAlert, setPassWordAlert] = useState(false);
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [phoneShortAlert, setPhoneShortAlert] = useState(false);
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [allLoginInputsFilled, setAllLoginInputsFilled] = useState(false);

  useEffect(() => {
    setPassWordAlert(password !== rePassword ? true : false);
  }, [password, rePassword]);

  useEffect(() => {
    setPhoneAlert(isNaN(phone) ? true : false);
  }, [phone]);

  useEffect(() => {
    setPhoneShortAlert(phone.length < 5 && phone.length !== 0 ? true : false);
  }, [phone]);

  useEffect(() => {
    setAllInputsFilled(
      firstName.length &&
        lastName.length &&
        userName.length &&
        email.length &&
        phone.length &&
        password.length &&
        rePassword.length &&
        city.length &&
        file
        ? true
        : false
    );
  }, [
    firstName,
    lastName,
    userName,
    email,
    phone,
    password,
    rePassword,
    city,
    birthDate,
    file,
  ]);

  useEffect(() => {
    setAllLoginInputsFilled(email.length && password.length ? true : false);
  }, [email, password]);

  const handleLoginClick = async () => {
    login(email, password, setApiKey, Cookies, navigate);
  };

  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("userName", userName);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("city", city);
  formData.append("birthDate", birthDate);
  formData.append("password", password);
  formData.append("bio", bio);
  formData.append("file", file);

  const handleRegisterClick = async () => {
    register(formData, setApiKey, userName, Cookies, navigate);
  };

  return (
    <div className="login">
      <ToggleBox
        tabLeft="Log-in"
        tabRight="Sign-up"
        title={{
          left: "Go to your account",
          right: "Create new account",
        }}
        logo={logo}
        body={{
          left: (
            <form className="RegularForm">
              <Input
                label={"Email"}
                type={"email"}
                onInputChange={(eventValue) => {
                  setEmail(eventValue);
                }}
              />
              <Input
                label={"Password"}
                type={"password"}
                onInputChange={(eventValue) => {
                  setPassword(eventValue);
                }}
              />
              <Button
                text="Login"
                type="submit"
                style="button2"
                backgroundColor="#a4506e"
                onClick={(event) => {
                  event.preventDefault();
                  handleLoginClick();
                }}
                disabled={!allLoginInputsFilled ? true : false}
              />
            </form>
          ),
          right: (
            <form className="RegularForm">
              <Input
                label={"First name"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setFirstName(eventValue);
                }}
              />
              <Input
                label={"Last name"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setLastName(eventValue);
                }}
              />
              <Input
                label={"User name"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setUserName(eventValue);
                }}
              />
              <Input
                label={"Email"}
                type={"email"}
                onInputChange={(eventValue) => {
                  setEmail(eventValue);
                }}
              />
              <Input
                label={"Phone"}
                type={"tel"}
                onInputChange={(eventValue) => {
                  setPhone(eventValue);
                }}
              />
              {phoneAlert ? "Please use only digits" : null}
              <br />
              {phoneShortAlert ? " Too short" : null}
              <Input
                name={"City"}
                label={"City"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setCity(eventValue);
                }}
              />

              <Input
                name={"Birth date"}
                label={"Birth date"}
                type={"date"}
                onInputChange={(eventValue) => {
                  setBirthDate(eventValue);
                }}
              />
              <Input
                label={"Password"}
                type={"password"}
                onInputChange={(eventValue) => {
                  setPassword(eventValue);
                }}
              />
              <Input
                label={"Re-enter Password"}
                type={"password"}
                onInputChange={(eventValue) => {
                  setRePassword(eventValue);
                }}
              />

              {passWordAlert ? "Passwords do not match" : null}
              <Input
                label={"Bio"}
                type={"textarea"}
                onInputChange={(eventValue) => {
                  setBio(eventValue);
                }}
              />
              <Input
                label={"Image"}
                type={"file"}
                name={"file"}
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              ></Input>
              <Button
                text="Sign-up"
                type="submit"
                style="button2"
                backgroundColor="#a4506e"
                onClick={(event) => {
                  event.preventDefault();
                  handleRegisterClick();
                }}
                disabled={
                  passWordAlert ||
                  phoneAlert ||
                  phoneShortAlert ||
                  !allInputsFilled
                    ? true
                    : false
                }
              />
            </form>
          ),
        }}
      />
    </div>
  );
};
