import React from "react";
import { useContext, useState, useMemo, useEffect } from "react";

import ExportButton from "../components/ExportButton";
import TTE from "../exports/TTE";

import FormBuilder from "../models/FormBuilder";

import api from "../config/api";

import formContext from "../contexts/formContext";

import { useParams } from "react-router";

const formBuilder = new FormBuilder();

formBuilder
  .bind("ata")
  .label("ATA")
  .inline()
  .input("text")
  .type("string")
  .placeholder("12-34-56")
  .add();

formBuilder
  .bind("oem")
  .label("OEM")
  .inline()
  .input("text")
  .type("string")
  .placeholder("example...")
  .add();

formBuilder
  .bind("rev")
  .label("CMM Revision")
  .inline()
  .input("text")
  .type("string")
  .placeholder("1")
  .add();

formBuilder
  .bind("rev_date")
  .label("Revision Date")
  .inline()
  .input("date")
  .type("string")
  .add();

formBuilder
  .bind("desc")
  .label("Unit Description")
  .input("text")
  .type("string")
  .placeholder("example...")
  .add();

formBuilder
  .bind("pn")
  .label("Part Numbers")
  .input("text")
  .type("array")
  .placeholder("123,456,..")
  .add();

formBuilder
  .bind("tte_tooling")
  .input("table")
  .type("object")
  .headers([
    "PN",
    "DESCRIPTION",
    "VENDOR",
    "ASSESSMENT",
    "AJWT ID",
    "AJWT DESCRIPTION",
    "TOOL TYPE",
  ])
  .model({
    tooling_pn: "",
    desc: "",
    vendor: "",
    assessment: "",
    ajwt_tooling_fk: "",
    comment: "",
    tool_type: "",
  })
  .add();

function ToolingEquiv() {
  // get id from params and init api data
  const { id } = useParams();
  const [data, setData] = useState({});
  const [form, setForm] = useState();

  // memo api call and form builder
  const loadData = useMemo(
    () => async () => {
      try {
        // get cmm data
        if (id != "new") {
          const response = await api.get(`/cmm/${id}`);
          setData(response.data);
        }
        setForm(formBuilder.build());
      } catch (error) {
        console.error(error);
      }
    },
    [0]
  );

  // memo to save state of data reduces unessassary reloads
  const value = useMemo(() => ({ data, setData }), [data]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (id != "new") {
    return (
      <>
        <div className="flex justify-between items-center mb-2 p-4 border-b top-0 sticky bg-white">
          <p className="font-semibold text-xl">
            <a className="cursor-pointer" href="/#/tooling_equivalence">
              Tooling Equivalence{" "}
            </a>
            / {data.ata}
          </p>
          {/* id is cmm pk */}
          <ExportButton
            del={async () => {
              const response = await api.delete(`/cmm/${id}`);
            }}
            save={async (e) => {
              e.preventDefault();
              const response = await api.patch(`/cmm/${id}`, data);
            }}
            title={`${data.ata} ${data.oem} ${data.desc}`}
            doc={data ? <TTE data={data} /> : ""}
          />
        </div>
        <formContext.Provider value={value}>
          <div className="px-4 pb-10">{form}</div>
        </formContext.Provider>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-between items-center mb-2 p-4 border-b top-0 sticky bg-white">
          <p className="font-semibold text-xl">
            <a className="cursor-pointer" href="/#/tooling_equivalence">
              Tooling Equivalence{" "}
            </a>
            / New
          </p>
          <ExportButton
            save={async (e) => {
              e.preventDefault();
              const response = await api.post(`/cmm/`, data);
            }}
            title={`${data.ata} ${data.oem} ${data.desc}`}
            doc={data ? <TTE data={data} /> : ""}
          />
        </div>
        <formContext.Provider value={value}>
          <div className="px-4 pb-10">{form}</div>
        </formContext.Provider>
      </>
    );
  }
}

export default ToolingEquiv;
