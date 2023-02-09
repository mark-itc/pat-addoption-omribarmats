import { ToggleBox } from "../Components/ToggleBox";
import logo from "../Images/DogCats.png";
import { SearchResults } from "../Components/SearchResults";

const pets = [
  {
    name: "Lucy",
    age: 5,
    sex: "F",
    type: "Cat",
    status: "Fostered",
  },
  { name: "Daisy", age: 7, sex: "M", type: "Cat", status: "Adopted" },
  { name: "Daisy", age: 10, sex: "M", type: "Cat", status: "Adopted" },
];

export const MyPets = () => {
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
            <SearchResults
              pets={pets}
              noResults={"You currently do not own or foster any pets."}
            />
          ),
          right: (
            <SearchResults
              pets={pets}
              noResults={`You didn’t save any pets yet.`}
            />
          ),
        }}
      />
    </div>
  );
};
