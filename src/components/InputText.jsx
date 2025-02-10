import React, { useContext, useEffect, useState, useRef } from "react";
import formContext from "../contexts/formContext";

import debounce from "../helpers/debounce";

function InputText(props) {
  const { data, setData } = useContext(formContext);
  const [value, setValue] = useState("");

  // create debounce ref takes in setState and duration in ms
  const debouncedSetData = useRef(
    debounce((newData) => {
      setData(newData);
    }, 500)
  ).current;

  // input handlers
  const inputChangeHandler = (e) => {
    // split target of change
    var { value, id } = e.target;
    const [name, type] = id.split("-");

    if (type == "array") {
      value = value.split(",").map((v) => {
        return { [name]: v.trim() };
      });
    }

    debouncedSetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data[props.name] == undefined) {
      return setValue("");
    }

    if (props.type == "string") {
      setValue(data[props.name]);
    } else {
      setValue(
        data[props.name].map((v) => {
          return v.pn;
        })
      );
    }
  }, [setValue]);
  // id: objectAttribute-type | name: objectAttribute
  return (
    <div className="flex flex-col w-full my-1">
      <label className="block text-sm/6 font-medium text-gray-900">
        {props.label}
      </label>
      <input
        id={`${props.name}-${props.type}`}
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        className="border focus:outline-blue-500 rounded-md p-1"
        defaultValue={value}
        onChange={inputChangeHandler}
      />
    </div>
  );
}

export default InputText;
