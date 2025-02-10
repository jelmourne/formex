import React from "react";

function InputRadio(props) {
  return (
    <div className="flex flex-col w-full my-1">
      <label className="block text-sm/6 font-medium text-gray-900">
        {props.label}
      </label>
      <div className="border p-3 rounded-md">
        <div
          className="flex items-center justify-between"
          onChange={(e) => {
            console.log(e.target.name);
            console.log(e.target.value);
          }}
        >
          <p>{props.headers[0]}</p>
          <input
            type="radio"
            name={`${props.name}`}
            className="scale-110"
            value={true}
          />
        </div>
        <div
          className="flex items-center justify-between"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          <p>{props.headers[1]}</p>
          <input
            type="radio"
            name={`${props.name}`}
            className="scale-110"
            value={false}
          />
        </div>
      </div>
    </div>
  );
}

export default InputRadio;
