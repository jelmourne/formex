import React, { useState } from "react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import Modal from "./Modal";
import Button from "./Button";

import {
  DocumentIcon,
  ArrowDownOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function ExportButton({ doc, title, save, del = undefined }) {
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <div className="flex gap-5 justify-end py-1">
      <PDFDownloadLink document={doc} fileName={title}>
        <DocumentIcon height={16} />
      </PDFDownloadLink>
      <ArrowDownOnSquareIcon height={16} onClick={save} />
      {del ? (
        <TrashIcon
          height={16}
          onClick={() => {
            setDeleteModal((prev) => !prev);
          }}
        />
      ) : (
        ""
      )}

      {deleteModal ? (
        <Modal
          title={"Delete"}
          body={
            "Are you sure you want to delete this record? These changes are permanent and cannot be undone."
          }
          action={() => {
            setDeleteModal((prev) => !prev);
          }}
          button={
            <Button
              value={"Delete"}
              color={"#ef4444"}
              action={() => {
                del();
                setDeleteModal((prev) => !prev);
              }}
            />
          }
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ExportButton;
