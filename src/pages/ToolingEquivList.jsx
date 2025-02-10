import React, { useEffect, useMemo, useState } from "react";

import InputSearch from "../components/InputSearch";
import Button from "../components/Button";

import formatTitle from "../helpers/formatTitle";

import api from "../config/api";
import TableList from "../components/TableList";

function ToolingEquivList({ page = 0 }) {
  const [cmms, setCmms] = useState({});
  const [currPage, setCurrPage] = useState(page);

  const headers = {
    Ata: "ata",
    Rev: "rev",
    Oem: "oem",
    Desc: "desc",
  };

  const getCmmList = useMemo(
    () => async () => {
      try {
        if (!cmms["count"]) {
          const count = await api.get(`/cmm/count/`);
          setCmms((prevCmm) => ({ ...prevCmm, ["count"]: count.data }));
        }
        const response = await api.get(`/cmm?offset=${currPage}`);
        setCmms((prevCmm) => ({ ...prevCmm, ["cmms"]: response.data }));
      } catch (error) {
        console.error(error);
      }
    },
    [setCurrPage, currPage]
  );

  useEffect(() => {
    getCmmList();
  }, [getCmmList]);

  return (
    <>
      <div className="flex justify-between items-center mb-2 p-4 top-0 sticky bg-white">
        <p className="font-semibold text-xl">Tooling Equivalence</p>

        <div className="flex gap-4">
          <Button
            value={"Add Record"}
            color={"#4ade80"}
            href={"/#/tooling_equivalence/new"}
          />
          <InputSearch
            search={async (e) => {
              const response = await api.get(`/cmm/search/?cmm=${e}`);
              setCmms((prevCmm) => ({
                ...prevCmm,
                ["cmms"]: response.data,
              }));
            }}
          />
        </div>
      </div>
      <TableList items={cmms} headers={headers} />
    </>
  );
}

export default ToolingEquivList;
