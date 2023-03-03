import "./Styles/SearchBar.css";
import { Button } from "../Components/Button";

export const SearchBar = (props) => {
  return (
    <form className="SearchBar">
      <div className="Parameter">{props.Parameter1}</div>
      <div className="Parameter">{props.Parameter2}</div>
      <div className="Parameter">{props.Parameter3}</div>
      <div className="Parameter">{props.Parameter4}</div>
      <div className="Parameter">{props.Parameter5}</div>

      <div className="searchButton">
        <Button
          text="Search"
          type="submit"
          style="button2"
          backgroundColor="#a4506e"
          onClick={props.onClick}
        />
      </div>
    </form>
  );
};
