import { useState } from "react";

import "./Styles/Form.css";

export const Input = (props) => {
  const [inputValue, setInputValue] = useState(props.value);

  const onChange = (e) => {
    setInputValue(e.target.value);
    props.onInputChange(e.target.value);
  };

  let textInput = (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={inputValue}
        min={props.min}
        max={props.max}
        onChange={onChange}
      />
    </>
  );

  let textArea = (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <textArea id={props.id} type={props.type} onChange={onChange}>
        {props.value}
      </textArea>
    </>
  );

  return <>{props.label == "Bio" ? textArea : textInput}</>;
};
