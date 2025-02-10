import React from "react";

function InputDropdown(props) {
  if (props.search) {
    return (
      <select>
        {props.options.map((o, i) => {
          <option>{o}</option>;
        })}
      </select>
    );
  } else {
    return (
      <select>
        {props.options.map((o, i) => {
          <option>{o}</option>;
        })}
      </select>
    );
  }
}

export default InputDropdown;
