import { useState } from "react";
import "./Styles/toggleBox.css";

export const ToggleBox = (props) => {
  const [active, setActive] = useState("left");
  return (
    <div className="toggleBox">
      {props.tabLeft ? (
        <div className="tabs-bar">
          <div
            onClick={() => setActive("left")}
            className={`toggleBox-tab left-tab ${
              active == "left" ? "active" : "not-active"
            }`}
          >
            {props.tabLeft}
          </div>
          <div
            onClick={() => setActive("right")}
            className={`toggleBox-tab right-tab ${
              active == "right" ? "active" : "not-active"
            }`}
          >
            {props.tabRight}
          </div>
        </div>
      ) : null}
      <div
        className={
          props.alignment == "left"
            ? "toggle-box-content left"
            : "toggle-box-content"
        }
      >
        <div className="head">
          <img Width="100px" src={props.logo}></img>
          <h2>{props.title[active]}</h2>
        </div>
        <div className="body">
          <div>{props.body[active]}</div>
        </div>
      </div>
    </div>
  );
};
