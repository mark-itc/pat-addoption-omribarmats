import { Routes, Route, NavLink, useNavigate, Link } from "react-router-dom";
import "./Views/Styles/App.css";
import "./Components/Styles/Navbar.css";
import { LoggedOut } from "./Views/LoggedOut";
import { LoginSignup } from "./Views/Login";
import { Search } from "./Views/Search";
import { Profile } from "./Views/Profile";
import { MyPets } from "./Views/MyPets";
import { Pet } from "./Views/Pet";
import { Admin } from "./Views/Admin";
import { NewPet } from "./Views/NewPet";
import logo from "./Images/DogCats.png";

//test

function App() {
  return (
    <div className="App">
      {/* new nabbar start */}
      <div className="Navbar-admin">
        <div className="Navbar-menu-admin">
          Hello, Admin
          <NavLink activeClassName="active" className={"tab"} to={"/admin"}>
            Dashboard
          </NavLink>
          <NavLink activeClassName="active" className={"tab"} to={"/new-pet"}>
            New pet
          </NavLink>
        </div>
      </div>
      {/* new nabbar end */}
      <div className="Navbar">
        <div className="Navbar-menu">
          <img Width="100px" src={logo}></img>
          <NavLink activeClassName="active" className={"tab"} to={"/search"}>
            Search
          </NavLink>
          <NavLink activeClassName="active" className={"tab"} to={"/my-pets"}>
            Pets
          </NavLink>
          <NavLink activeClassName="active" className={"tab"} to={"/profile"}>
            Profile
          </NavLink>
        </div>

        <div class="navbar-profile">
          <a style={{ opacity: "1" }} href="/profile">
            <p> Hey, User name |&nbsp;</p>
          </a>
          <a>Log out</a>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<LoggedOut />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-pets" element={<MyPets />} />
        <Route path="/pet" element={<Pet />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/new-pet" element={<NewPet />} />
      </Routes>
    </div>
  );
}

export default App;
