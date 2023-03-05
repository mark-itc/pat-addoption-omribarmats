import { useState, useEffect, useContext } from "react";
import { ToggleBox } from "../Components/ToggleBox";
import { SearchBar } from "../Components/SearchBar";
import { Parameter } from "../Components/Parameter";
import { CheckBox } from "../Components/CheckBox";
import { SearchResults } from "../Components/SearchResults";
import { authContext } from "../Context/authContext";
import { getPets } from "../API/petsAPI";
import logo from "../Images/DogCats.png";

export const Search = () => {
  const { apiKey } = useContext(authContext);

  const [dog, setDog] = useState(false);
  const [cat, setCat] = useState(false);
  const [M, setMale] = useState(false);
  const [F, setFemale] = useState(false);
  const [sheltered, setSheltered] = useState(false);
  const [fostered, setFostered] = useState(false);
  const [adopted, setAdopted] = useState(false);
  const [h20, setH20] = useState(false);
  const [h40, setH40] = useState(false);
  const [h60, setH60] = useState(false);
  const [h80, setH80] = useState(false);
  const [w10, setW10] = useState(false);
  const [w20, setW20] = useState(false);
  const [w30, setW30] = useState(false);
  const [w40, setW40] = useState(false);

  const [pets, setPets] = useState("");

  useEffect(() => {
    if (apiKey) {
      searchPetsInAPI();
    }
  }, [apiKey]);

  const searchPetsInAPI = async () => {
    const results = await getPets(
      apiKey,
      dog,
      cat,
      M,
      F,
      sheltered,
      fostered,
      adopted,
      h20,
      h40,
      h60,
      h80,
      w10,
      w20,
      w30,
      w40
    );
    if (results.success) {
      setPets(results.data);
    } else {
      console.log("no success");
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
                onClick={(event) => {
                  event.preventDefault();
                  searchPetsInAPI();
                }}
                Parameter1={
                  <Parameter
                    title="Type"
                    CheckBox1={
                      <CheckBox
                        text="Dog"
                        checked={dog}
                        onChange={() => {
                          setDog(!dog);
                        }}
                      />
                    }
                    CheckBox2={
                      <CheckBox
                        text="Cat"
                        checked={cat}
                        onChange={() => setCat(!cat)}
                      />
                    }
                  />
                }
                Parameter2={
                  <Parameter
                    title="Gender"
                    CheckBox1={
                      <CheckBox
                        text="F"
                        checked={F}
                        onChange={() => setFemale(!F)}
                      />
                    }
                    CheckBox2={
                      <CheckBox
                        text="M"
                        checked={M}
                        onChange={() => setMale(!M)}
                      />
                    }
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
                onClick={(event) => {
                  event.preventDefault();
                  searchPetsInAPI();
                }}
                Parameter1={
                  <Parameter
                    title="Type"
                    CheckBox1={
                      <CheckBox
                        text="Dog"
                        checked={dog}
                        onChange={() => setDog(!dog)}
                      />
                    }
                    CheckBox2={
                      <CheckBox
                        text="Cat"
                        checked={cat}
                        onChange={() => setCat(!cat)}
                      />
                    }
                  />
                }
                Parameter2={
                  <Parameter
                    title="Gender"
                    CheckBox1={
                      <CheckBox
                        text="F"
                        checked={F}
                        onChange={() => setFemale(!F)}
                      />
                    }
                    CheckBox2={
                      <CheckBox
                        text="M"
                        checked={M}
                        onChange={() => setMale(!M)}
                      />
                    }
                  />
                }
                Parameter3={
                  <Parameter
                    title="Status"
                    CheckBox1={
                      <CheckBox
                        text="Sheltered"
                        checked={sheltered}
                        onChange={() => setSheltered(!sheltered)}
                      />
                    }
                    CheckBox2={
                      <CheckBox
                        text="Fostered"
                        checked={fostered}
                        onChange={() => setFostered(!fostered)}
                      />
                    }
                    CheckBox3={
                      <CheckBox
                        text="Adopted"
                        checked={adopted}
                        onChange={() => setAdopted(!adopted)}
                      />
                    }
                  />
                }
                Parameter4={
                  <Parameter
                    title="Height (cm)"
                    CheckBox1={
                      <CheckBox
                        text="0-20"
                        checked={h20}
                        onChange={() => setH20(!h20)}
                      />
                    }
                    CheckBox2={
                      <CheckBox
                        text="21-40"
                        checked={h40}
                        onChange={() => setH40(!h40)}
                      />
                    }
                    CheckBox3={
                      <CheckBox
                        text="41-60"
                        checked={h60}
                        onChange={() => setH60(!h60)}
                      />
                    }
                    CheckBox4={
                      <CheckBox
                        text="61-80"
                        checked={h80}
                        onChange={() => setH80(!h80)}
                      />
                    }
                  />
                }
                Parameter5={
                  <Parameter
                    title="Weight (kg)"
                    CheckBox1={
                      <CheckBox
                        text="0-10"
                        checked={w10}
                        onChange={() => setW10(!w10)}
                      />
                    }
                    CheckBox2={
                      <CheckBox
                        text="11-20"
                        checked={w20}
                        onChange={() => setW20(!w20)}
                      />
                    }
                    CheckBox3={
                      <CheckBox
                        text="21-30"
                        checked={w30}
                        onChange={() => setW30(!w30)}
                      />
                    }
                    CheckBox4={
                      <CheckBox
                        text="31-40"
                        checked={w40}
                        onChange={() => setW40(!w40)}
                      />
                    }
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
