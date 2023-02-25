import { useState, useContext } from "react";
import { authContext } from "../Context/authContext";
import { ToggleBox } from "../Components/ToggleBox";
import logo from "../Images/DogCats.png";
import { Input } from "../Components/Input";
import { Select } from "../Components/Select";
import { Button } from "../Components/Button";
import "../Components/Styles/Form.css";

export const NewPet = () => {
  const { apiKey } = useContext(authContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [birthDate, setBirthDate] = useState(0);
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [diet, setDiet] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState({});

  const formData = new FormData();
  formData.append("name", name);
  formData.append("type", type);
  formData.append("birthdate", birthDate);
  formData.append("gender", gender);
  formData.append("breed", breed);
  formData.append("status", status);
  formData.append("height", height);
  formData.append("weight", weight);
  formData.append("color", color);
  formData.append("hypoallergenic", hypoallergenic);
  formData.append("diet", diet);
  formData.append("bio", bio);
  formData.append("file", file);

  const handleAddPetClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/addpet", {
        method: "post",
        headers: {
          accessToken: apiKey,
        },
        body: formData,
      }).catch((error) => console.error(error));

      const results = await response.json();
      console.log("results", results);

      if (results.success === false) {
        alert(results.message);
      } else {
        alert("Pet added successfully");
      }
    } catch (e) {}
  };

  return (
    <div>
      <ToggleBox
        title={{
          left: `Create new pet`,
        }}
        logo={logo}
        body={{
          left: (
            <form className="RegularForm" enctype="multipart/form-data">
              <Input
                label={"Name"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setName(eventValue);
                }}
              />
              <fieldset>
                <legend>
                  <h3>Type</h3>
                </legend>
                <div className="radio">
                  <Select
                    name={"Type"}
                    label={"Dog"}
                    checked={type === "Dog"}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <Select
                    name={"Type"}
                    label={"Cat"}
                    checked={type === "Cat"}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </fieldset>

              <Input
                name={"Birth date"}
                label={"Birth date"}
                type={"date"}
                onInputChange={(eventValue) => {
                  setBirthDate(eventValue);
                }}
              />

              <fieldset>
                <legend>
                  <h3>Gender</h3>
                </legend>
                <div className="radio">
                  <Select
                    name={"Gender"}
                    label={"F"}
                    checked={gender === "F"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Select
                    name={"Gender"}
                    label={"M"}
                    checked={gender === "M"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </fieldset>
              <Input
                label={"Breed"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setBreed(eventValue);
                }}
              />
              <fieldset>
                <legend>
                  <h3>Status</h3>
                </legend>
                <div className="radio">
                  <Select
                    name={"status"}
                    label={"Sheltered"}
                    checked={status === "Sheltered"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Select
                    name={"status"}
                    label={"Fostered"}
                    checked={status === "Fostered"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Select
                    name={"status"}
                    label={"Adopted"}
                    checked={status === "Adopted"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <h3>Height (cm)</h3>
                </legend>
                <div className="radio">
                  <Select
                    name={"height"}
                    label={"10-20"}
                    checked={height === "10-20"}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <Select
                    name={"height"}
                    label={"21-40"}
                    checked={height === "21-40"}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <Select
                    name={"height"}
                    label={"41-60"}
                    checked={height === "41-60"}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <Select
                    name={"height"}
                    label={"61-80"}
                    checked={height === "61-80"}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <h3>Weight (kg)</h3>
                </legend>
                <div className="radio">
                  <Select
                    name={"weight"}
                    label={"0-10"}
                    checked={weight === "0-10"}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <Select
                    name={"weight"}
                    label={"11-20"}
                    checked={weight === "11-20"}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <Select
                    name={"weight"}
                    label={"21-30"}
                    checked={weight === "21-30"}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <Select
                    name={"weight"}
                    label={"31-40"}
                    checked={weight === "31-40"}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <h3>Color</h3>
                </legend>
                <div className="radio">
                  <Select
                    name={"color"}
                    label={"White"}
                    checked={color === "White"}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <Select
                    name={"color"}
                    label={"Black"}
                    checked={color === "Black"}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <Select
                    name={"color"}
                    label={"Grey"}
                    checked={color === "Grey"}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <Select
                    name={"color"}
                    label={"Brown"}
                    checked={color === "Brown"}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <Select
                    name={"color"}
                    label={"Other"}
                    checked={color === "Other"}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <h3>Hypoallergenic</h3>
                </legend>
                <div className="radio">
                  <Select
                    name={"hypo"}
                    label={"Yes"}
                    checked={hypoallergenic === "Yes"}
                    onChange={(e) => setHypoallergenic(e.target.value)}
                  />
                  <Select
                    name={"hypo"}
                    label={"No"}
                    checked={hypoallergenic === "No"}
                    onChange={(e) => setHypoallergenic(e.target.value)}
                  />
                </div>
              </fieldset>
              <Input
                label={"Diet restriction"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setDiet(eventValue);
                }}
              />
              <Input
                label={"Bio"}
                type={"textarea"}
                onInputChange={(eventValue) => {
                  setBio(eventValue);
                }}
              />
              <Input
                label={"Image"}
                type={"file"}
                name={"file"}
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              ></Input>
              <Button
                text="Create"
                type="submit"
                style="button2"
                backgroundColor="#a4506e"
                onClick={(event) => {
                  event.preventDefault();
                  handleAddPetClick();
                }}
              />
            </form>
          ),
        }}
      />
    </div>
  );
};
