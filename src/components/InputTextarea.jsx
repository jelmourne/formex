import React, { useContext, useState, useEffect } from "react";
import formContext from "../contexts/formContext";

function InputTextarea(props) {
  const { data, setData } = useContext(formContext);
  const [value, setValue] = useState("");

  const inputChangeHandler = (e) => {
    // split target of change
    var { value, id } = e.target;
    const [name, type] = id.split("-");

    if (type == "array") {
      value = value.split(",").map((v) => {
        return { [name]: v.trim() };
      });
    }

    setData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  useEffect(() => {
    if (data[props.name] == undefined) {
      return setValue("");
    }
  }, []);
  return (
    <div className=" my-2">
      <label className="block text-sm/6 font-medium text-gray-900">
        {props.label}
      </label>
      <textarea
        className="w-full border focus:outline-blue-500 rounded-md p-1"
        placeholder={props.placeholder}
        id={props.name}
        name={props.name}
        defaultValue={data[name]}
        onChange={inputChangeHandler}
      />
    </div>
  );
}

export default InputTextarea;
