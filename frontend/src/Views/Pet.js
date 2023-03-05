import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../Context/authContext";
import { ToggleBox } from "../Components/ToggleBox";
import { ProfileComp } from "../Components/ProfileComp";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { Select } from "../Components/Select";
import {
  savePet,
  fosterPet,
  adoptPet,
  returnPet,
  unSavePet,
  getUserPetsFromAPI,
  updatePet,
  getPet,
} from "../API/petsAPI";
import logo from "../Images/DogCats.png";

export const Pet = () => {
  const navigate = useNavigate();
  const { apiKey, authState } = useContext(authContext);
  const [pet, setPet] = useState({});

  const [petName, setPetName] = useState("");
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
  const [savedPets, setSavedPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [fosteringPets, setFosteringPets] = useState([]);
  const [thisPetSaved, setThisPetSaved] = useState(false);
  const [thisPetOwned, setThisPetOwned] = useState(false);

  const formData = new FormData();
  formData.append("name", petName || pet.name);
  formData.append("type", type || pet.type);
  formData.append("birthdate", birthDate || pet.birthDate);
  formData.append("gender", gender || pet.type);
  formData.append("breed", breed || pet.breed);
  formData.append("status", status || pet.status);
  formData.append("height", height || pet.height);
  formData.append("weight", weight || pet.weight);
  formData.append("color", color || pet.color);
  formData.append("hypoallergenic", hypoallergenic || pet.hypoallergenic);
  formData.append("diet", diet || pet.diet);
  formData.append("bio", bio || pet.bio);
  formData.append("file", file);
  formData.append("currentFile", pet.file);

  pet.age = new Date().getFullYear() - new Date(pet.birthdate).getFullYear();

  const { name } = useParams();

  useEffect(() => {
    if (apiKey) {
      getPet(
        apiKey,
        name,
        setPet,
        setType,
        setGender,
        setStatus,
        setHeight,
        setWeight,
        setColor,
        setHypoallergenic
      );
    }
  }, [apiKey]);

  useEffect(() => {
    if ((apiKey, authState.userName)) {
      getUserPets();
    }
  }, [apiKey, authState.userName]);

  useEffect(() => {
    if ((savedPets, pet.name)) {
      setThisPetSaved(savedPets.includes(pet.name) ? true : false);
    }
    if (fosteringPets || adoptedPets) {
      setThisPetOwned(
        fosteringPets.includes(pet.name) ||
          (adoptedPets.includes(pet.name) && true)
      );
    }
  }, [savedPets, adoptedPets, fosteringPets]);

  const getUserPets = async () => {
    const results = await getUserPetsFromAPI(apiKey, authState.userName);
    if (results.success) {
      setSavedPets(results.saved.map((pet) => pet.name));
      setAdoptedPets(results.adopted.map((pet) => pet.name));
      setFosteringPets(results.fostering.map((pet) => pet.name));
    } else {
      console.log("not success");
    }
  };

  const handleUpdatePetClick = async () => {
    updatePet(apiKey, pet.name, formData, navigate);
  };

  const handleSaveClick = async () => {
    await savePet(apiKey, authState.userName, pet.name);
    if ((savedPets, pet.name)) {
      setThisPetSaved(savedPets.includes(pet.name) && true);
    }
  };

  const handleUnSaveClick = async () => {
    unSavePet(apiKey, authState.userName, pet.name);
    if ((savedPets, pet.name)) {
      setThisPetSaved(savedPets.includes(pet.name) && false);
    }
  };

  const handleFosterClick = async () => {
    fosterPet(apiKey, authState.userName, pet.name).then(() => {
      window.location.reload(false);
    });
  };

  const handleAdoptClick = async () => {
    adoptPet(apiKey, authState.userName, pet.name).then(() => {
      window.location.reload(false);
    });
  };

  const handleReturnClick = async () => {
    returnPet(apiKey, authState.userName, pet.name).then(() => {
      window.location.reload(false);
    });
  };

  return (
    <div>
      <ToggleBox
        tabLeft={authState.role == "admin" ? "Pet" : null}
        tabRight={authState.role == "admin" ? "Edit" : null}
        title={{
          left: `${pet.name} | ${pet.type} | ${
            pet.age == 0 ? 1 : pet.age
          } Y | ${pet.gender} | ${pet.status}`,
          right: `Edit ${pet.name}'s pet-profile`,
        }}
        logo={logo}
        body={{
          left: (
            <div>
              <ProfileComp
                for="pet"
                firstName={pet.name}
                breed={pet.breed}
                image={pet.file}
                bio={pet.bio}
                height={pet.height + " cm"}
                weight={pet.weight + " kg"}
                color={pet.color}
                hypo={pet.hypoallergenic}
                diet={pet.diet}
              />
              <div className="buttons">
                {status !== "Adopted" ? (
                  <Button
                    text="Adopt"
                    type="submit"
                    style="button3"
                    backgroundColor="#a4506e"
                    onClick={(event) => {
                      event.preventDefault();
                      handleAdoptClick();
                    }}
                  />
                ) : null}
                {status !== "Adopted" && status !== "Fostered" ? (
                  <Button
                    text="Foster"
                    type="submit"
                    style="button3"
                    backgroundColor="#a4506e"
                    onClick={(event) => {
                      event.preventDefault();
                      handleFosterClick();
                    }}
                  />
                ) : null}
                {thisPetSaved ? (
                  <Button
                    text="Unsave"
                    type="submit"
                    style="button3"
                    backgroundColor="#a4506e"
                    onClick={(event) => {
                      event.preventDefault();
                      handleUnSaveClick();
                    }}
                  />
                ) : (
                  <Button
                    text="Save"
                    type="submit"
                    style="button3"
                    backgroundColor="#a4506e"
                    onClick={(event) => {
                      event.preventDefault();
                      handleSaveClick();
                    }}
                  />
                )}
                {(status == "Adopted" && thisPetOwned) ||
                (status == "Fostered" && thisPetOwned) ? (
                  <Button
                    text="Return"
                    type="submit"
                    style="button3"
                    backgroundColor="#a4506e"
                    onClick={(event) => {
                      event.preventDefault();
                      handleReturnClick();
                    }}
                  />
                ) : null}
              </div>
            </div>
          ),
          right: (
            <form className="RegularForm" encType="multipart/form-data">
              <Input
                value={pet.name}
                label={"Name"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setPetName(eventValue);
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
                value={pet.birthdate}
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
                value={pet.breed}
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
                value={pet.diet}
                label={"Diet restriction"}
                type={"text"}
                onInputChange={(eventValue) => {
                  setDiet(eventValue);
                }}
              />
              <Input
                value={pet.bio}
                label={"Bio"}
                type={"textarea"}
                onInputChange={(eventValue) => {
                  setBio(eventValue);
                }}
              />
              <img src={pet.file} width="100px" />
              <Input
                label={"Image"}
                type={"file"}
                name={"file"}
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              ></Input>

              <Button
                text="Update"
                type="submit"
                style="button2"
                backgroundColor="#a4506e"
                onClick={(event) => {
                  event.preventDefault();
                  handleUpdatePetClick();
                }}
              />
            </form>
          ),
        }}
      />
    </div>
  );
};
