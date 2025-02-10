import React, { useState } from "react";
import Button from "./Button";

function Modal({ title, body, button, action }) {
  return (
    <div className="absolute left-0 right-0 m-auto top-0 bottom-0 bg-white max-w-72 rounded-lg border h-fit flex items-center shadow-lg flex-col justify-between p-2 gap-5">
      <div className="flex justify-between border-b border-slate-200 w-full font-semibold text-xl pb-3 items-center">
        <p>{title}</p>
        <img
          src={close}
          className="h-7 aspect-square cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            action();
          }}
        />
      </div>
      <div className="border-b border-slate-200 w-full pb-3">{body}</div>
      <div className="flex justify-end w-full gap-2">
        <Button value={"Close"} color={"#e5e7eb"} action={action} />
        {button}
      </div>
    </div>
  );
}

export default Modal;
