import { PetBox } from "./PetBox";
import "./Styles/PetBox.css";

export const SearchResults = (props) => {
  return (
    <>
      {props.pets.length > 0 ? (
        <div className="petsList">
          {props.pets.map((pet, index) => {
            return (
              <PetBox
                key={index}
                image={pet.file}
                name={pet.name}
                age={
                  new Date().getFullYear() -
                  new Date(pet.birthdate).getFullYear() +
                  "Y"
                }
                sex={pet.gender}
                type={pet.type}
                status={pet.status}
              />
            );
          })}
        </div>
      ) : (
        <h2 className="noResults">{props.noResults}</h2>
      )}
    </>
  );
};
