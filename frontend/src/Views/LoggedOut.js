import logoWithTitle from "../Images/logo-petadoption.png";
import { Button } from "../Components/Button";
import "../Views/Styles/LoggedOut.css";

export const LoggedOut = () => {
  return (
    <div className="LoggedOut">
      <img width="300px" src={logoWithTitle}></img>
      <div className="welcome-text">
        <h1>Ready for a new family member? </h1>
        <p>
          Here, you can search for the perfect pet for you and your family by
          using various filters such as status, height, weight, type of pet, and
          even name. You can also browse through our available pets and learn
          more about their personalities and needs.
        </p>
        <br></br>
        <p>
          Thank you for considering adoption and helping to give these deserving
          pets a second chance at a happy and loving home.
        </p>
      </div>
      <a href="/login">
        <Button
          style="button1"
          text="Login / Signup"
          type="button"
          backgroundColor="#ffffff"
        />
      </a>
      <a
        href="/search"
        style={{ marginTop: "45px", textDecoration: "underline" }}
      >
        Start searching for pets
      </a>
    </div>
  );
};
