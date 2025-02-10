import React, { useContext, useEffect, useState, useRef } from "react";
import formContext from "../contexts/formContext";

import debounce from "../helpers/debounce";

function InputTable(props) {
  const { data, setData } = useContext(formContext);
  const [table, setTable] = useState([]);
  const [newData, setNewData] = useState(props.model || {});

  // create debounce ref takes in setState and duration in ms
  const debouncedSetData = useRef(
    debounce((newData) => {
      setData(newData);
    }, 500)
  ).current;

  // input handlers to reduce input lag cache array of objects too new state modify that state then debounce add to context
  const newInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewData((prevNewData) => ({
      ...prevNewData,
      [name]: value,
    }));
  };

  const inputChangeHandler = (e) => {
    // split target of change
    var { value, id } = e.target;
    const [name, type, index] = id.split("-");

    let tempArray = [...table];
    tempArray[index] = { ...tempArray[index], [e.target.name]: value };

    setTable(tempArray);

    debouncedSetData((prevData) => ({
      ...prevData,
      [name]: tempArray,
    }));
  };

  // change values outside of set state
  const inputDeleteHandler = (e) => {
    // split target of change
    var { value, id } = e.target;
    const [name, index] = id.split("-");

    var tempArray = [...table];
    tempArray.splice(index, 1);

    setTable(tempArray);

    debouncedSetData((prevData) => ({
      ...prevData,
      [name]: tempArray,
    }));
  };

  const inputAddHandler = (e) => {
    // split target of change
    const id = Object.keys(props.model)[0];

    if (table.some((o) => o[id] === newData[id])) {
      return;
    }

    var tempArray = [...table];
    tempArray.push(newData);

    setNewData(props.model);

    setTable(tempArray);

    setData((prevData) => ({ ...prevData, [e.target.id]: tempArray }));
  };

  // sort by col values
  const sortBy = (e) => {
    e.preventDefault();
    const key = Object.keys(props.model)[e.target.id];
    const isAsc = e.target.name == "asc" ? true : false;

    setTable((prevTable) => {
      var tempArray = [...prevTable];

      tempArray.sort((a, b) => {
        if (isAsc) {
          e.target.name = "dsc";
          return a[key] ? a[key].localeCompare(b[key]) : 1;
        }
        e.target.name = "asc";
        return b[key] ? b[key].localeCompare(a[key]) : -1;
      });

      return tempArray;
    });
  };

  useEffect(() => {
    if (data[props.name]) {
      setTable(data[props.name]);
    } else {
      setTable([]);
    }
  }, [setTable]);
  // id: objectAttribute-type-index  | name: objectAttribute
  return (
    <table className="bg-transparent w-full mt-5">
      {/* table header map headers th-col-index*/}
      <thead>
        <tr>
          {props.headers.map((th, i) => {
            return (
              <th
                key={`th-${th}-${i}`}
                id={i}
                name="asc"
                onClick={sortBy}
                className="select-none cursor-pointer x-6 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                {th}
              </th>
            );
          })}
          <th className="px-6 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Action
          </th>
        </tr>
      </thead>

      {/* table body map data row then column tr-unqiueId */}
      <tbody>
        {true &&
          table.map((tr, j) => {
            return (
              <tr key={`tr-${tr[Object.keys(tr)[Object.keys(tr).length - 1]]}`}>
                {/* table col trc-col-rowindex-colindex */}
                {Object.keys(props.model).map((tc, k) => {
                  return (
                    <td
                      key={`trc-${j}-${k}}`}
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 "
                    >
                      {/* td-col-rowindex-colindex*/}
                      {tc == Object.keys(tr)[0] ? (
                        <input
                          type="text"
                          name={`${tc}`}
                          key={`td-${tc}-${j}-${k}`}
                          defaultValue={tr[tc]}
                          id={`${props.name}-${props.type}-${j}`}
                          className="rounded-md p-1 w-full min-w-12 outline-none"
                          readOnly
                        />
                      ) : (
                        <input
                          type="text"
                          name={`${tc}`}
                          key={`td-${tc}-${j}-${k}`}
                          defaultValue={tr[tc]}
                          id={`${props.name}-${props.type}-${j}`}
                          className="focus:outline-blue-500 rounded-md p-1 w-full min-w-12"
                          onChange={inputChangeHandler}
                        />
                      )}
                    </td>
                  );
                })}
                <td
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  key={`trc-action-${j}`}
                >
                  <input
                    type="submit"
                    id={`${props.name}-${j}`}
                    key={`td-action-${j}`}
                    onClick={inputDeleteHandler}
                    value="Delete"
                    className="text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            );
          })}

        {/* table footer create new element */}
        <tr>
          {Object.keys(newData).map((tf, l) => {
            return (
              <td
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700"
                key={`tf-${tf}-${l}`}
              >
                <input
                  type="text"
                  id="table"
                  name={tf}
                  value={newData[tf]}
                  className="border focus:outline-blue-500 rounded-md p-1 w-full min-w-12"
                  onChange={newInputChangeHandler}
                />
              </td>
            );
          })}
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <input
              type="submit"
              id={props.name}
              value="Add"
              className="text-green-500 cursor-pointer"
              onClick={inputAddHandler}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default InputTable;

/*

  */
