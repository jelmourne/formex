import React from "react";
import { useContext, useState, useMemo, useEffect } from "react";
import { useParams } from "react-router";

import ExportButton from "../components/ExportButton";
import TF3 from "../exports/TF3";

import FormBuilder from "../models/FormBuilder";

import api from "../config/api";

import formContext from "../contexts/formContext";

const formBuilder = new FormBuilder();

formBuilder
  .bind("ajwt_tooling_pk")
  .label("Tooling ID")
  .inline()
  .input("text")
  .type("string")
  .placeholder("xx-xxx-xxxx")
  .add();

formBuilder
  .bind("oem_fk")
  .label("Manufacturer")
  .inline()
  .input("text")
  .type("string")
  .placeholder("example...")
  .add();

formBuilder
  .bind("sn")
  .label("SN")
  .inline()
  .input("text")
  .type("string")
  .placeholder("123abc")
  .add();

formBuilder
  .bind("ftn")
  .label("FTN")
  .placeholder("123abc")
  .inline()
  .input("text")
  .type("string")
  .add();

formBuilder
  .bind("description")
  .label("Description")
  .placeholder("example...")
  .input("text")
  .type("string")
  .add();

formBuilder
  .bind("model")
  .label("Model Number")
  .placeholder("example...")
  .input("text")
  .type("string")
  .add();

formBuilder
  .bind("wo")
  .label("WO Number")
  .placeholder("wo1234")
  .inline()
  .input("text")
  .type("string")
  .add();

formBuilder
  .bind("customer")
  .label("Customer")
  .placeholder("example...")
  .inline()
  .input("text")
  .type("string")
  .add();

formBuilder
  .bind("tempurature")
  .label("Tempurature")
  .placeholder("12.3°C")
  .inline()
  .input("text")
  .type("string")
  .add();

formBuilder
  .bind("humidity")
  .label("Humidity")
  .placeholder("12% RH")
  .inline()
  .input("text")
  .type("string")
  .add();

formBuilder
  .bind("verification_date")
  .label("Verification Date")
  .placeholder("yyyy-mm-dd")
  .inline()
  .input("date")
  .type("string")
  .add();

formBuilder
  .bind("calibration_date")
  .label("Calibration Date")
  .placeholder("yyyy-mm-dd")
  .inline()
  .input("date")
  .type("string")
  .add();

formBuilder
  .bind("init_res")
  .label("Initial Results")
  .inline()
  .input("radio")
  .type("string")
  .headers(["In Tolerance", "Out of Tolerance"])
  .add();

formBuilder
  .bind("final_res")
  .label("Final Results")
  .inline()
  .input("radio")
  .type("string")
  .headers(["In Tolerance", "Out of Tolerance"])
  .add();

formBuilder
  .bind("remarks")
  .label("Remarks")
  .placeholder("example...")
  .input("textarea")
  .type("string")
  .add();

formBuilder
  .bind("standards")
  .label("table")
  .input("table")
  .headers(["ITEM I.D.", "SERIAL NO.", "DESCRIPTION", "DUE DATE"])
  .model({
    item_id: "",
    serial_no: "",
    desc: "",
    due_date: "",
  })
  .add();

function CalibrationCert() {
  // get id from params and init api data
  const { id } = useParams();
  const [data, setData] = useState({});
  const [form, setForm] = useState();

  const loadData = useMemo(
    () => async () => {
      try {
        // get tooling data
        if (id != "new") {
          const response = await api.get(`/tooling/${id}`);
          setData(response.data);
        }
        setForm(formBuilder.build());
      } catch (error) {
        console.error(error);
      }
    },
    [0]
  );

  const value = useMemo(() => ({ data, setData }), [data]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // new record
  if (id != "new") {
    /* reponse -> after response useFrom (setForm) */
    return (
      <>
        <div className="flex justify-between items-center mb-2 p-4 border-b">
          <p className="font-semibold text-xl">
            <a href="/#/calibration_certificate">Calibration Certification </a>/{" "}
            {data.ajwt_tooling_pk}
          </p>
          <ExportButton
            data={data}
            title={`TF3 ${data.ajwt_tooling_pk} ${data.sn}(${
              data.ftn
            }) ${new Date().getUTCDate()}`}
            doc={data ? <TF3 data={data} /> : ""}
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
        <div className="flex justify-between items-center mb-2 p-4 border-b">
          <p className="font-semibold text-xl">
            <a href="/#/calibration_certificate">Calibration Certification </a>/
            New
          </p>
          <ExportButton
            title={
              data
                ? `TF3 ${data.ajwt_tooling_pk} ${data.sn}(${
                    data.ftn
                  }) ${new Date().getUTCDate()}`
                : ""
            }
            pdfDoc={data ? <TF3 data={data} /> : ""}
          />
        </div>
        <formContext.Provider value={value}>
          <div className="px-4 pb-10">{form}</div>
        </formContext.Provider>
      </>
    );
  }
}

export default CalibrationCert;
