import LogoutButton from "./LogoutButton";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Postify</h1>
      <LogoutButton />
    </header>
  );
};

export default Header;
