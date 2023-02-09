import { ToggleBox } from "../Components/ToggleBox";
import { ProfileComp } from "../Components/ProfileComp";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import logo from "../Images/DogCats.png";
import profileImage from "../Images/omri-31072022.jpg";
import "../Components/Styles/Form.css";

const user = {
  firstName: "Josh",
  lastName: "Berkman",
  userName: "berkman1010",
  image: profileImage,
  email: "joshb10@gmail.com",
  phone: "0527389454",
  password: "12345678",
  bio: "Hi, my name is Josh and I am a dog lover. In my free time, I enjoy spending time outdoors and staying active. Thank you for considering me as a potential adopter for your furry friend.",
  age: "32",
  city: "Jerusalem",
  gender: "M",
};

export const Profile = () => {
  return (
    <div>
      <ToggleBox
        tabLeft="Profile"
        tabRight="Edit"
        title={{
          left: `${user.firstName} | ${user.age} | ${user.gender} | ${user.city}`,
          right: "Edit Your Profile",
        }}
        logo={logo}
        body={{
          left: (
            <ProfileComp
              firstName={user.firstName}
              lastName={user.lastName}
              userName={user.userName}
              image={user.image}
              email={user.email}
              phone={user.phone}
              password={user.password}
              bio={user.bio}
            />
          ),
          right: (
            <div>
              <form className="RegularForm">
                <Input
                  label={"First name"}
                  type={"text"}
                  value={user.firstName}
                />
                <Input
                  label={"Last name"}
                  type={"text"}
                  value={user.lastName}
                />
                <Input label={"Email"} type={"email"} value={user.email} />
                <Input label={"Phone"} type={"tel"} value={user.phone} />
                <Input label={"Bio"} type={"text"} value={user.bio} />
                <Input label={"Password"} type={"text"} value={user.password} />
                <Input label={"Re-enter Password"} type={"text"} />
                <Button
                  text="Save"
                  type="submit"
                  style="button2"
                  backgroundColor="#a4506e"
                />
              </form>
            </div>
          ),
        }}
      />
    </div>
  );
};
