import PropTypes from 'prop-types';
// eslint-disable-next-line react/prop-types
export const Dropdown = ({ set, data}) => {
  Dropdown.propTypes = {
    set : PropTypes.func.isRequired,
    data : PropTypes.object.isRequired
  }
  return (
    <div className="dropdown">
      <select
        className={data.className}
        name={data.name}
        onChange={(e) => set(e.target.value)}
      >
        {data.optionsText.map((text, i) => {
          return <option value={data.optionsValue[i]} key = {i}>{text}</option>;
        })}
      </select>
    </div>
  );
};
