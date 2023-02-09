import { ToggleBox } from "../Components/ToggleBox";
import { ProfileComp } from "../Components/ProfileComp";
import { Button } from "../Components/Button";
import logo from "../Images/DogCats.png";
import profileImage from "../Images/2.png";

export const Pet = () => {
  const pet = {
    name: "Pizza",
    age: "2",
    gender: "F",
    type: "Cat",
    status: "Fostered",
    bio: "Meet Pizza, a grey mix breed cat currently in a foster home. She stands at 25cm and weighs 10kg. Pizza is hypoallergenic and has no dietary restrictions. Come meet this sweet feline and give her a loving forever home.",
    image: profileImage,
    breed: "grey mix breed",
    height: "25cm",
    weight: "10kg",
    color: "Grey",
    hypo: "Yes",
    diet: "None",
  };

  return (
    <div>
      <ToggleBox
        title={{
          left: `${pet.name} | ${pet.age} | ${pet.gender} | ${pet.status}`,
        }}
        logo={logo}
        body={{
          left: (
            <div>
              <ProfileComp
                for="pet"
                firstName={pet.name}
                breed={pet.breed}
                image={pet.image}
                bio={pet.bio}
                height={pet.height}
                weight={pet.weight}
                color={pet.color}
                hypo={pet.hypo}
                diet={pet.diet}
              />
              <div className="buttons">
                <Button
                  text="Adopt"
                  type="submit"
                  style="button3"
                  backgroundColor="#a4506e"
                />
                <Button
                  text="Foster"
                  type="submit"
                  style="button3"
                  backgroundColor="#a4506e"
                />
                <Button
                  text="Save"
                  type="submit"
                  style="button3"
                  backgroundColor="#a4506e"
                />
                <Button
                  text="Return"
                  type="submit"
                  style="button3"
                  backgroundColor="#a4506e"
                />
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};
