import { useContext } from "react";
import { ThemeContext } from "../App";

export const Nav = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <nav>
      <h1>Where in the world?</h1>
      <div className="changemode" onClick={toggleTheme}>
        <i className="fa-regular fa-moon" />
        <h2>Dark Mode</h2>
      </div>
    </nav>
  );
};
