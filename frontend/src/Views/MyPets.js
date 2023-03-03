import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { authContext } from "../Context/authContext";
import { ToggleBox } from "../Components/ToggleBox";
import logo from "../Images/DogCats.png";
import { SearchResults } from "../Components/SearchResults";
import { getUserPetsFromAPI } from "../API/petsAPI";

export const MyPets = () => {
  const navigate = useNavigate();
  const { authState, apiKey } = useContext(authContext);
  const [savedPets, setSavedPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [fosteringPets, setFosteringPets] = useState([]);

  if (!authState.status) navigate("/login");

  useEffect(() => {
    if (apiKey) {
      getUserPets();
    }
  }, [apiKey]);

  const getUserPets = async () => {
    const results = await getUserPetsFromAPI(apiKey, authState.userName);
    if (results.success) {
      setSavedPets(results.saved);
      setAdoptedPets(results.adopted);
      setFosteringPets(results.fostering);
    } else {
      console.log("not success");
    }
  };

  return (
    <div>
      <ToggleBox
        tabLeft="Yours"
        tabRight="Saved"
        title={{
          left: "Your Pets",
          right: "Saved",
        }}
        logo={logo}
        body={{
          left: (
            <>
              {/* <h2 style={{ textAlign: "center", margin: "0px" }}>Adopted</h2> */}
              <SearchResults
                pets={adoptedPets}
                noResults={"No adopted pets."}
              />
              {/* <h3 style={{ textAlign: "center" }}>Fostering</h3> */}
              <SearchResults
                pets={fosteringPets}
                noResults={"No fostered pets."}
              />
            </>
          ),
          right: (
            <SearchResults
              pets={savedPets}
              noResults={`You didn’t save any pets yet.`}
            />
          ),
        }}
      />
    </div>
  );
};
