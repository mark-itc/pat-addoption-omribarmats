import "./Styles/Button.css";

export const Button = (props) => {
  return (
    <button
      className={props.style}
      type={props.type}
      disabled={props.disabled}
      style={{ backgroundColor: props.backgroundColor }}
    >
      {props.text}
    </button>
  );
};
