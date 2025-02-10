import React, { useState } from "react";

function InputSearch(props) {
  const [search, setSearch] = useState("");
  return (
    <div className="relative border rounded-lg w-64">
      <input
        type="text"
        className="rounded-md p-2 w-full focus:outline-blue-500"
        placeholder="Search Here..."
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            props.search(search);
          }
        }}
        onChange={(e) => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
      />

      <button
        type="submit"
        className="absolute right-2 top-2"
        onClick={() => {
          props.search(search);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}

export default InputSearch;
