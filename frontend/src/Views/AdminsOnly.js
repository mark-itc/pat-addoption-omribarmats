import "./Styles/404.css";

export const AdminsOnly = () => {
  return (
    <div class="page404">
      <h2>This page is for admins only.</h2>
      <h2>
        Please sign-in <a href="/login">here</a>
      </h2>
    </div>
  );
};
