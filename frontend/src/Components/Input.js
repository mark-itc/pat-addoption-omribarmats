import "./Styles/Form.css";

export const Input = (props) => {
  let textInput = (
    <>
      <label for={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        min={props.min}
        max={props.max}
      />
    </>
  );

  let textArea = (
    <>
      <label for={props.id}>{props.label}</label>
      <textArea id={props.id} type={props.type}>
        {props.value}
      </textArea>
    </>
  );

  return <>{props.label == "Bio" ? textArea : textInput}</>;
};
