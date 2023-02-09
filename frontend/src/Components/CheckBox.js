export const CheckBox = (props) => {
  return (
    <div className="CheckBox">
      <label for={props.text}>
        <input id={props.text} type="checkbox" />
        {props.text}
      </label>
    </div>
  );
};
