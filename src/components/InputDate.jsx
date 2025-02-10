import React, { useContext } from "react";
import formContext from "../contexts/formContext";

function InputDate(props) {
  const { data, setData } = useContext(formContext);

  // input handlers
  const inputChangeHandler = (e) => {
    var { value, id } = e.target;

    setData((prevFormData) => {
      return { ...prevFormData, [id]: value };
    });
  };
  // id: objectAttribute | name: objectAttribute

  return (
    <div className="flex flex-col w-full my-1">
      <label className="block text-sm/6 font-medium text-gray-900">
        {props.label}
      </label>
      <input
        id={props.name}
        name={props.name}
        type="date"
        placeholder={props.placeholder}
        className="border focus:outline-blue-500 rounded-md p-1"
        defaultValue={data[props.name]}
        onChange={inputChangeHandler}
      />
    </div>
  );
}

export default InputDate;
