import React from "react";

function Button({ color, value, href }) {
  return (
    <a
      style={{ backgroundColor: color }}
      className="px-3 py-1 rounded-lg hover:brightness-90 transition-all shadow-md font-medium items-center flex cursor-pointer"
      href={href}
    >
      {value}
    </a>
  );
}

export default Button;
