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
    backgroundColor: "#2b0f54",
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
    height: "100",
  },
  subHeader: {
    display: "flex",
    fontSize: "12",
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
  subHeaderDetailsCol: {
    display: "flex",
    flexDirection: "col",
    justifyContent: "space-between",
  },
  body: { fontSize: 12, display: "flex", flexDirection: "column", gap: "10" },
});

/*
function TableHeader() {
  return (
    <View style={style.tableHeader}>
      <Text style={{ width: "15%", textAlign: "center" }}>Item ID</Text>
      <Text style={{ width: "20%", textAlign: "center" }}>Serial Number</Text>
      <Text style={{ width: "55%", textAlign: "center" }}>Description</Text>
      <Text style={{ width: "20%", textAlign: "center" }}>Due Date</Text>
    </View>
  );
}

function TableRow() {
  var rows = items.map((item, index) => (
    <View style={style.tableRow} key={index}>
      <Text style={{ width: "15%", textAlign: "center" }}></Text>
      <Text style={{ width: "20%", textAlign: "center" }}></Text>
      <Text style={{ width: "10%", textAlign: "center" }}></Text>
      <Text style={{ width: "20%", textAlign: "center" }}></Text>
      <Text style={{ width: "15%", textAlign: "center" }}></Text>
      <Text style={{ width: "25%", textAlign: "center" }}></Text>
    </View>
  ));
  return <>{rows}</>;
}

function Table() {
  return <View>{<TableHeader />}</View>;
}
  */

function TF3(props) {
  return (
    <Document>
      <Page style={style.page} size={"A4"}>
        <View style={style.header}>
          <Image src={ajwt} />
          <Text>Calibration Certificate</Text>
        </View>

        <View style={style.subHeader}>
          <Text>WO: 12332132</Text>
          <View
            style={[
              style.subHeaderDetails,
              {
                borderBottom: "1",
                paddingBottom: "10",
                borderColor: "#e5e7eb",
              },
            ]}
          >
            <Text>Tempurature: </Text>
            <Text>Humidity: </Text>
            <Text>Verification Date: {props.data.verification_date}</Text>
            <Text>Calibration Date: {props.data.calibration_date}</Text>
          </View>
          <View style={style.subHeaderDetails}>
            <Text>Tooling ID: {props.data.ajwt_tooling_pk}</Text>
            <Text>Manufacturer: {props.data.oem_fk}</Text>
          </View>
          <View style={style.subHeaderDetails}>
            <Text>Serial No: {props.data.sn}</Text>
            <Text>Ftn No: {props.data.ftn}</Text>
          </View>
          <View style={style.subHeaderDetails}>
            <Text>Description: </Text>
            <Text>Model No: </Text>
          </View>
          <Text>Customer: </Text>
        </View>
        <View style={style.body}>
          <Text style={{ margin: 20 }}>
            AJW Technique certifies that the item listed above meets or exceeds
            published specifications and has been calibrated with measurements
            standards traceable to national or international measurements
            standards.
          </Text>
          <View>
            <Text>Remarks / Procedure / Special Requirements</Text>
            <Text
              style={{
                border: "1",
                padding: "10",
                borderColor: "#e5e7eb",
              }}
            >
              dsads
            </Text>
          </View>
          <View>
            <Text>Standards Used</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default TF3;
