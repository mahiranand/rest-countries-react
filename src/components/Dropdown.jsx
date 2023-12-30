import PropTypes from "prop-types";
import { useState } from "react";
export const Dropdown = ({ set, data }) => {
  Dropdown.propTypes = {
    set: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    set(event.target.value);
  };
  return (
    <div className="dropdown">
      <select
        className={data.className}
        name={data.name}
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        {data.optionsText.map((text, i) => {
          return (
            <option value={data.optionsValue[i]} key={i}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
};
