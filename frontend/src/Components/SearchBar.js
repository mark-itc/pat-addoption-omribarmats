import "./Styles/SearchBar.css";
import { Button } from "../Components/Button";

export const SearchBar = (props) => {
  return (
    <form className="SearchBar">
      <div class="Parameter">{props.Parameter1}</div>
      <div class="Parameter">{props.Parameter2}</div>
      <div class="Parameter">{props.Parameter3}</div>
      <div class="Parameter">{props.Parameter4}</div>
      <div class="Parameter">{props.Parameter5}</div>

      <div className="searchButton">
        <Button
          text="Search"
          type="submit"
          style="button2"
          backgroundColor="#a4506e"
        />
      </div>
    </form>
  );
};
