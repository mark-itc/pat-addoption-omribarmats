import lucy from "../Images/1.png";
import "./Styles/PetBox.css";

export const PetBox = (props) => {
  return (
    <div className="PetBox">
      <a href="/pet">
        <img src={lucy}></img>
        <p>
          {props.name} | {props.age} | {props.sex} | {props.type} |{" "}
          {props.status}
        </p>
      </a>
    </div>
  );
};
