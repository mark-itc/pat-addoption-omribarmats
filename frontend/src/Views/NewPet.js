import { ToggleBox } from "../Components/ToggleBox";
import logo from "../Images/DogCats.png";
import { Input } from "../Components/Input";
import { Select } from "../Components/Select";
import { Button } from "../Components/Button";
import "../Components/Styles/Form.css";

export const NewPet = () => {
  return (
    <div>
      <ToggleBox
        title={{
          left: `Create new pet`,
        }}
        logo={logo}
        body={{
          left: (
            <form className="RegularForm">
              <Input label={"Name"} type={"text"} />
              <fieldset>
                <legend>
                  <h3>Type</h3>
                </legend>
                <div className="radio">
                  <Select name={"type"} label={"Dog"} />
                  <Select name={"type"} label={"Cat"} />
                </div>
              </fieldset>
              <Input label={"Age"} type={"number"} min={"1"} max={"30"} />
              <fieldset>
                <legend>
                  <h3>Gender</h3>
                </legend>
                <div className="radio">
                  <Select name={"gender"} label={"F"} />
                  <Select name={"gender"} label={"M"} />
                </div>
              </fieldset>
              <Input label={"Breed"} type={"text"} />
              <fieldset>
                <legend>
                  <h3>Status</h3>
                </legend>
                <div className="radio">
                  <Select name={"status"} label={"Sheltered"} />
                  <Select name={"status"} label={"Fostered"} />
                  <Select name={"status"} label={"Adopted"} />
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <h3>Height (cm)</h3>
                </legend>
                <div className="radio">
                  <Select name={"height"} label={"10-20"} />
                  <Select name={"height"} label={"21-40"} />
                  <Select name={"height"} label={"41-60"} />
                  <Select name={"height"} label={"61-80"} />
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <h3>Weight (kg)</h3>
                </legend>
                <div className="radio">
                  <Select name={"weight"} label={"0-10"} />
                  <Select name={"weight"} label={"11-20"} />
                  <Select name={"weight"} label={"21-30"} />
                  <Select name={"weight"} label={"31-40"} />
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <h3>Color</h3>
                </legend>
                <div className="radio">
                  <Select name={"color"} label={"White"} />
                  <Select name={"color"} label={"Black"} />
                  <Select name={"color"} label={"Grey"} />
                  <Select name={"color"} label={"Brown"} />
                  <Select name={"color"} label={"Other"} />
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <h3>Hypoallergenic</h3>
                </legend>
                <div className="radio">
                  <Select name={"hypo"} label={"Yes"} />
                  <Select name={"hypo"} label={"No"} />
                </div>
              </fieldset>
              <Input label={"Diet restriction"} type={"text"} />
              <Input label={"Bio"} type={"textarea"} />
              <Input label={"Image"} type={"file"} />
              <Button
                text="Create"
                type="submit"
                style="button2"
                backgroundColor="#a4506e"
              />
            </form>
          ),
        }}
      />
    </div>
  );
};
