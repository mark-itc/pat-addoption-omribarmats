export const CheckBox = (props) => {
  return (
    <div className="CheckBox">
      <label htmlFor={props.text}>
        <input id={props.text} type="checkbox" />
        {props.text}
      </label>
    </div>
  );
};
