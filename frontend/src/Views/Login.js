import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { authContext } from "../Context/authContext";
import { ToggleBox } from "../Components/ToggleBox";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import logo from "../Images/DogCats.png";
import "../Components/Styles/Form.css";
import Cookies from "js-cookie";

export const LoginSignup = () => {
  const navigate = useNavigate();
  const { authEmail, setAuthEmail } = useContext(authContext);
  const { apiKey, setApiKey } = useContext(authContext);

  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
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
        rePassword.length
        ? true
        : false
    );
  }, [firstName, lastName, userName, email, phone, password, rePassword]);

  useEffect(() => {
    setAllLoginInputsFilled(email.length && password.length ? true : false);
  }, [email, password]);

  const handleLoginClick = async () => {
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
            // console.log(data.token);
            // setAuthEmail(email);
            setApiKey(data.token);
            alert("Success! You are now logged-in");
            Cookies.set("pet-adoption-credentials", data.token);
            navigate("/profile");
          }
        });
    } catch (e) {}
  };

  const handleRegisterClick = async () => {
    setUser({
      firstname: firstName,
      lastname: lastName,
      username: userName,
      email: email,
      phone: phone,
      password: password,
      rePassword: rePassword,
    });

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          username: userName,
          email: email,
          phone: phone,
          password: password,
          repassword: rePassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === false) {
            let message = data.message;
            alert(message);
          } else {
            console.log(data.token);
            setAuthEmail(email);
            setApiKey(data.token);
            alert("Success! You are now registered");
            navigate("/profile");
          }
        });
    } catch (e) {}
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
                type={"text"}
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
                  console.log(firstName);
                }}
              />
              <Input
                label={"Last name"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setLastName(eventValue);
                  console.log(lastName);
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
                label={"Password"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setPassword(eventValue);
                }}
              />
              <Input
                label={"Re-enter Password"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setRePassword(eventValue);
                }}
              />
              {passWordAlert ? "Passwords do not match" : null}
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
