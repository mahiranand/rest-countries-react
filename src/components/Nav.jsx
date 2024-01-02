import PropTypes from "prop-types";
export const Nav = ({ toggleTheme }) => {
  Nav.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
  };
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
