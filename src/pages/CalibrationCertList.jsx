import React, { useContext, useEffect, useMemo, useState } from "react";
import InputSearch from "../components/InputSearch";
import Button from "../components/Button";

import formatTitle from "../helpers/formatTitle";

import api from "../config/api";
import TableList from "../components/TableList";

function CalibrationCertList({ page = 0 }) {
  const [currPage, setCurrPage] = useState(page);
  const [tools, setTooling] = useState([]);

  const headers = {
    "Tooling ID": "ajwt_tooling_pk",
    Sn: "sn",
    Ftn: "ftn",
    Oem: "oem_fk",
  };

  const getToolingList = useMemo(
    () => async () => {
      try {
        const response = await api.get(`/tooling?offset=${currPage}`);
        setTooling(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [setCurrPage, currPage]
  );

  useEffect(() => {
    getToolingList();
  }, [getToolingList]);

  return (
    <>
      <div className="flex justify-between items-center mb-2 p-4 top-0 sticky bg-white">
        <p className="font-semibold text-xl">Calibration Certification</p>
        <div className="flex gap-4">
          <Button
            value={"Add Record"}
            color={"#4ade80"}
            href={"/#/calibration_certificate/new"}
          />
          <InputSearch />
        </div>
      </div>
      <TableList items={tools} headers={headers} />
    </>
  );
}

export default CalibrationCertList;
