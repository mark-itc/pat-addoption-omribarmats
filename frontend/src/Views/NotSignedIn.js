import "./Styles/404.css";

export const NotSignedIn = () => {
  return (
    <div class="page404">
      <h2>You must be signed-in to view this page.</h2>
      <h2>
        Please sign-in <a href="/login">here</a>
      </h2>
    </div>
  );
};
