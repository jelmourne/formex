import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ajwt from "/ajwt_document.png";

const style = StyleSheet.create({
  page: { padding: 10 },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12",
    padding: 5,
    backgroundColor: "#e5e7eb",
    color: "#000000",
  },
  tableHeader: {
    backgroundColor: "#009FD9",
    color: "#ffffff",
    display: "flex",
    flexDirection: "row",
    fontSize: "10",
    paddingVertical: 5,
  },
  tableRow: {
    color: "#0000000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "10",
    borderBottom: "1",
    borderColor: "#e5e7eb",
    paddingBottom: 15,
    marginTop: 15,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "75",
  },
  subHeader: {
    display: "flex",
    fontSize: "11",
    gap: "12",
    borderTop: "1",
    borderBottom: "1",
    padding: 10,
    borderColor: "#e5e7eb",
  },
  subHeaderDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function TableHeader() {
  return (
    <View style={style.tableHeader}>
      <Text style={{ width: "15%", textAlign: "center" }}>Part Number</Text>
      <Text style={{ width: "20%", textAlign: "center" }}>Description</Text>
      <Text style={{ width: "10%", textAlign: "center" }}>Vendor</Text>
      <Text style={{ width: "20%", textAlign: "center" }}>Assessment</Text>
      <Text style={{ width: "15%", textAlign: "center" }}>AJWT Tool Id</Text>
      <Text style={{ width: "25%", textAlign: "center" }}>
        AJWT Tool Description
      </Text>
    </View>
  );
}

function TableRow({ items }) {
  var rows = items.map((item, index) => (
    <View style={style.tableRow} key={index}>
      <Text style={{ width: "15%", textAlign: "center" }}>
        {item.tooling_pn}
      </Text>
      <Text style={{ width: "20%", textAlign: "center" }}>{item.desc}</Text>
      <Text style={{ width: "10%", textAlign: "center" }}>{item.vendor}</Text>
      <Text style={{ width: "20%", textAlign: "center" }}>
        {item.assessment}
      </Text>
      <Text style={{ width: "15%", textAlign: "center" }}>
        {item.ajwt_tooling_fk}
      </Text>
      <Text style={{ width: "25%", textAlign: "center" }}>{item.comment}</Text>
    </View>
  ));
  return <>{rows}</>;
}

function Table({ items }) {
  return (
    <View style={{ marginTop: "12" }}>
      {<TableHeader />}
      {<TableRow items={items} />}
    </View>
  );
}

function TTE(props) {
  return (
    <Document>
      <Page style={style.page} size={"A4"} orientation="landscape">
        <View style={style.header}>
          <Image src={ajwt} style={{ aspectRatio: "auto", width: "50%" }} />
          <Text>Tooling Equivalency</Text>
        </View>
        <View style={style.subHeader}>
          <View style={style.subHeaderDetails}>
            <Text>CMM: {true && props.data.ata}</Text>
            <Text>OEM: {true && props.data.oem}</Text>
            <Text>Description: {true && props.data.desc}</Text>
            <Text>Revision: {true && props.data.rev}</Text>
            <Text>Date: {true && props.data.rev_date}</Text>
          </View>
          <Text style={{ textOverflow: "ellipsis", width: "93%" }}>
            OEM P/N:{" "}
            {props.data.pn != undefined
              ? props.data.pn.map((pn) => {
                  return `${pn.pn}, `;
                })
              : ""}
          </Text>
          <View
            style={[
              style.subHeaderDetails,
              { marginBottom: "-6", fontSize: "9" },
            ]}
          >
            <Text>Released By: Justin</Text>
            <Text>Release Date: {new Date().toISOString().split("T")[0]}</Text>
          </View>
        </View>
        {true && props.data.tte_tooling ? (
          <Table items={props.data.tte_tooling} />
        ) : (
          <></>
        )}
        <View
          style={style.footer}
          render={({ pageNumber, totalPages }) => (
            <>
              <Text>
                {props.data.ata != undefined
                  ? `${true && props.data.ata} ${
                      true && props.data.oem.toUpperCase()
                    } ${true && props.data.desc.toUpperCase()} `
                  : ""}
              </Text>
              <Text>
                {pageNumber} of {totalPages}
              </Text>
            </>
          )}
          fixed
        />
      </Page>
    </Document>
  );
}

export default TTE;
