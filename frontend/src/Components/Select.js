import "./Styles/Form.css";

export const Select = (props) => {
  return (
    <div>
      <input
        name={props.name}
        value={props.label}
        id={props.label}
        checked={props.checked}
        onChange={props.onChange}
        type="radio"
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};
