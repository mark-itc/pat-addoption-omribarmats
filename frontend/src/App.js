import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./Views/Styles/App.css";
import "./Components/Styles/Navbar.css";
import { LoggedOut } from "./Views/LoggedOut";
import { LoginSignup } from "./Views/Login";
import { Search } from "./Views/Search";
import { Profile } from "./Views/Profile";
import { MyPets } from "./Views/MyPets";
import { NotSignedIn } from "./Views/NotSignedIn";
import { AdminsOnly } from "./Views/AdminsOnly";
import { Pet } from "./Views/Pet";
import { Admin } from "./Views/Admin";
import { NewPet } from "./Views/NewPet";
import { Page404 } from "./Views/404";
import logo from "./Images/DogCats.png";
import { authContext } from "./Context/authContext";
import Cookies from "js-cookie";

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
      {authState.role === "admin" ? (
        <div className="Navbar-admin">
          <div className="Navbar-menu-admin">
            Hello, {authState.role}
            <NavLink activeClassName="active" className={"tab"} to={"/admin"}>
              Dashboard
            </NavLink>
            <NavLink activeClassName="active" className={"tab"} to={"/new-pet"}>
              New pet
            </NavLink>
          </div>
        </div>
      ) : null}

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
            <NavLink
              activeClassName="active"
              className={"tab"}
              to={`/profile/${authState.userName}`}
            >
              Profile
            </NavLink>
          ) : (
            <a className="non-active">Profile</a>
          )}
        </div>
        {authState.status ? (
          <div className="navbar-profile">
            <p>{authState.userName} |&nbsp;</p>

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
        <Route path="/pet" element={<Pet />}>
          <Route path=":name" element={<Pet />} />
        </Route>

        {authState.status ? (
          <>
            <Route path="/profile" element={<Profile />}>
              <Route path=":userName" element={<Profile />} />
            </Route>
            <Route path="/my-pets" element={<MyPets />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<NotSignedIn />} />
            <Route path="/my-pets" element={<NotSignedIn />} />
          </>
        )}

        {authState.role === "admin" ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/new-pet" element={<NewPet />} />
          </>
        ) : (
          <>
            <Route path="/admin" element={<AdminsOnly />} />
            <Route path="/new-pet" element={<AdminsOnly />} />
          </>
        )}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
