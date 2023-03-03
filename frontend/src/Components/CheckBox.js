export const CheckBox = (props) => {
  return (
    <div className="CheckBox">
      <label htmlFor={props.text}>
        <input
          checked={props.checked}
          onChange={props.onChange}
          type="checkbox"
        />
        {props.text}
      </label>
    </div>
  );
};
