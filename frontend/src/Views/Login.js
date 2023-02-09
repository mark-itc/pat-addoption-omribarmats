import { ToggleBox } from "../Components/ToggleBox";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import logo from "../Images/DogCats.png";
import "../Components/Styles/Form.css";

export const LoginSignup = () => {
  return (
    <div className="login">
      <ToggleBox
        tabLeft="Log-in"
        tabRight="Sign-up"
        title={{
          left: "Login to existing account",
          right: "Create a new account",
        }}
        logo={logo}
        body={{
          left: (
            <form className="RegularForm">
              <Input label={"Email"} type={"email"} />
              <Input label={"Password"} type={"text"} />
              <Button
                text="Login"
                type="submit"
                style="button2"
                backgroundColor="#a4506e"
              />
            </form>
          ),
          right: (
            <form className="RegularForm">
              <Input label={"First name"} type={"text"} />
              <Input label={"Last name"} type={"text"} />
              <Input label={"Email"} type={"email"} />
              <Input label={"Phone"} type={"tel"} />
              <Input label={"Password"} type={"text"} />
              <Input label={"Re-enter Password"} type={"text"} />
              <Button
                text="Sign-up"
                type="submit"
                style="button2"
                backgroundColor="#a4506e"
              />
            </form>
          ),
        }}
      />
    </div>
  );
};
