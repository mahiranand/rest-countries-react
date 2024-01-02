import { createContext, useState } from "react";
import { Body } from "./components/Body";
import { Nav } from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Detail from "./components/Detail";

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
    <ThemeContext.Provider value={toggleTheme}>
      <div id={theme}>
        <Nav />
        <Routes>
          <Route path="/" element={<Body />}></Route>
          <Route path="/country/:id" element={<Detail />}></Route>
          <Route path="*" element={<h1>Invalid Request</h1>} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
