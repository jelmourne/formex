import React from "react";

function TableList({ items, headers }) {
  return (
    <table className="items-center bg-transparent w-full">
      <thead>
        <tr className="sticky top-16 bg-white">
          {Object.keys(headers).map((v, _) => {
            return (
              <th
                className="px-6 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                key={"header-" + v}
              >
                {v}
              </th>
            );
          })}
          <th className="px-6 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {items.length &&
          items.map((r, _) => {
            return (
              <tr
                className="border-b border-solid border-blueGray-100"
                key={"row-" + r[0]}
              >
                {Object.values(headers).map((c, _) => {
                  return (
                    <td
                      key={r[c]}
                      className="px-6 align-middle whitespace-nowrap p-4 text-left text-blueGray-700 "
                    >
                      {formatTitle(r[c])}
                    </td>
                  );
                })}
                <td className="px-6 align-middle whitespace-nowrap p-4">
                  <input
                    type="submit"
                    value="Modify"
                    onClick={() =>
                      location.replace(
                        `/#/tooling_equivalence/${
                          r[Object.values(headers).find("pk")]
                        }`
                      )
                    }
                    className="text-blue-500 cursor-pointer"
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default TableList;
