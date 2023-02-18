import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
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
import { authContext } from "./Context/authContext";
import Cookies from "js-cookie";

//test

function App() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(authContext);

  const handleLogout = () => {
    Cookies.set("pet-adoption-credentials", null);
    alert("You are now logged-out");
    // setAuthState({ username: "", id: 0, status: false });
    navigate("/search");
    window.location.reload(false);
    // );
  };

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
          <img width="100px" src={logo}></img>

          <NavLink activeClassName="active" className={"tab"} to={"/search"}>
            Search
          </NavLink>

          {authState.status ? (
            <NavLink activeClassName="active" className={"tab"} to={"/my-pets"}>
              Pets
            </NavLink>
          ) : (
            <div className={"non-active"}>Pets</div>
          )}
          {authState.status ? (
            <NavLink activeClassName="active" className={"tab"} to={"/profile"}>
              Profile
            </NavLink>
          ) : (
            <a className="non-active">Profile</a>
          )}
        </div>
        {authState.status ? (
          <div className="navbar-profile">
            <a style={{ opacity: "1" }} href="/profile">
              <p>{authState.username} |&nbsp;</p>
            </a>
            <a onClick={handleLogout}>Log out</a>
          </div>
        ) : (
          <NavLink activeClassName="active" className={"tab"} to={"/login"}>
            Sign in
          </NavLink>
        )}
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
