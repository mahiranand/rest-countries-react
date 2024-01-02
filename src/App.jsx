import { createContext, useState } from "react";
import { Body } from "./components/Body";
import { Nav } from "./components/Nav";

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const body = document.querySelector("body");
    if (body.style.backgroundColor == "var(--veryDarkBlue)") {
      body.style.backgroundColor = "var(--veryLightGrey)";
    } else {
      body.style.backgroundColor = "var(--veryDarkBlue)";
    }
    const moonIcon = document.querySelector(".changemode i");
    moonIcon.classList.toggle("fa-regular");
    moonIcon.classList.toggle("fa-solid");
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider>
      <div id={theme}>
        <Nav toggleTheme={toggleTheme} />
        <Body />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
