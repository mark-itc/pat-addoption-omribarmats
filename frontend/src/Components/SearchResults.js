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
                name={pet.name}
                age={pet.age}
                sex={pet.sex}
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
