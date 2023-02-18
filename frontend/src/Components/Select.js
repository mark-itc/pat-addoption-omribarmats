import "./Styles/Form.css";

export const Select = (props) => {
  return (
    <div>
      <input
        id={props.name}
        name={props.name}
        value={props.label}
        type="radio"
      ></input>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};
