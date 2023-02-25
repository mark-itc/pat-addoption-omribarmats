import "./Styles/ProfileComp.css";

export const ProfileComp = (props) => {
  return (
    <div className="ProfileComp">
      <div className="details">
        <img src={props.image}></img>
        {props.for == "pet" ? (
          <table>
            <tr>
              <th>Breed</th>
              <td>{props.breed}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{props.height}</td>
            </tr>
            <tr>
              <th>Weight </th>
              <td>{props.weight}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{props.color}</td>
            </tr>
            <tr>
              <th>Hypoallergenic</th>
              <td>{props.hypo}</td>
            </tr>
            <tr>
              <th>Diet restrictions</th>
              <td>{props.diet}</td>
            </tr>
          </table>
        ) : (
          <table>
            <tr>
              <th>Email</th>
              <td>{props.email}</td>
            </tr>
            <tr>
              <th>Username</th>
              <td>{props.userName}</td>
            </tr>

            <tr>
              <th>Phone number</th>
              <td>{props.phone}</td>
            </tr>
          </table>
        )}
      </div>
      <div className="bio">
        <p>{props.bio}</p>
      </div>
    </div>
  );
};
