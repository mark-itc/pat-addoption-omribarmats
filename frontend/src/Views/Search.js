import { useState, useEffect, useContext } from "react";
import { ToggleBox } from "../Components/ToggleBox";
import logo from "../Images/DogCats.png";
import { SearchBar } from "../Components/SearchBar";
import { Parameter } from "../Components/Parameter";
import { CheckBox } from "../Components/CheckBox";
import { SearchResults } from "../Components/SearchResults";
import { authContext } from "../Context/authContext";
import { getPets } from "../API/petsAPI";

export const Search = () => {
  const { apiKey } = useContext(authContext);
  const [pets, setPets] = useState([]);
  const [type, setType] = useState([]);
  const [gender, setGender] = useState([]);
  const [status, setStatus] = useState([]);
  const [height, setHeight] = useState([]);
  const [Weight, setWeight] = useState([]);

  useEffect(() => {
    if (apiKey) {
      searchPetsInAPI();
    }
  }, [apiKey]);

  const searchPetsInAPI = async () => {
    const results = await getPets(apiKey);
    if (results.success) {
      setPets(results.data);
    } else {
      console.log("not success");
    }
  };

  return (
    <div>
      <ToggleBox
        tabLeft="Search"
        tabRight="Advanced"
        title={{
          left: "Search For Pets",
          right: "Be More Specific",
        }}
        logo={logo}
        body={{
          left: (
            <div>
              <SearchBar
                Parameter1={
                  <Parameter
                    title="Type"
                    CheckBox1={<CheckBox text="Dog" />}
                    CheckBox2={<CheckBox text="Cat" />}
                  />
                }
                Parameter2={
                  <Parameter
                    title="Gender"
                    CheckBox1={<CheckBox text="F" />}
                    CheckBox2={<CheckBox text="M" />}
                  />
                }
              />

              <SearchResults
                pets={pets}
                noResults={"Sorry, we were unable to find a match"}
              />
            </div>
          ),
          right: (
            <div>
              <SearchBar
                Parameter1={
                  <Parameter
                    title="Type"
                    CheckBox1={<CheckBox text="Dog" />}
                    CheckBox2={<CheckBox text="Cat" />}
                  />
                }
                Parameter2={
                  <Parameter
                    title="Gender"
                    CheckBox1={<CheckBox text="F" />}
                    CheckBox2={<CheckBox text="M" />}
                  />
                }
                Parameter3={
                  <Parameter
                    title="Status"
                    CheckBox1={<CheckBox text="Sheltered" />}
                    CheckBox2={<CheckBox text="Fostered" />}
                    CheckBox3={<CheckBox text="Adopted" />}
                  />
                }
                Parameter4={
                  <Parameter
                    title="Height (cm)"
                    CheckBox1={<CheckBox text="0-20" />}
                    CheckBox2={<CheckBox text="21-40" />}
                    CheckBox3={<CheckBox text="41-60" />}
                    CheckBox4={<CheckBox text="61-80" />}
                  />
                }
                Parameter5={
                  <Parameter
                    title="Weight (kg)"
                    CheckBox1={<CheckBox text="0-10" />}
                    CheckBox2={<CheckBox text="11-20" />}
                    CheckBox3={<CheckBox text="21-30" />}
                    CheckBox4={<CheckBox text="31-40" />}
                  />
                }
              />
              <SearchResults
                pets={pets}
                noResults={"Sorry, we were unable to find a match"}
              />
            </div>
          ),
        }}
      />
    </div>
  );
};
