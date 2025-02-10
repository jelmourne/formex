import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";

import {
  Bars3Icon,
  XMarkIcon,
  MinusIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";

import Nav from "./Nav";

import { invoke } from "@tauri-apps/api/core";
import { app } from "@tauri-apps/api";

function TitleBar() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState();

  invoke("get_menu_open").then((_) => setOpen(_));

  useEffect(() => {
    const init = async () => {
      const _ = await app.getName();
      setName(_);
    };

    init();
  }, []);

  return (
    <>
      <div className="flex justify-between px-1 items-center bg-neutral-100 z-[9999] select-none col-span-full col-start-1 row-start-1">
        <Bars3Icon
          width={20}
          className={`transition-all mx-3 ${open ? "rotate-90" : ""}`}
          onClick={async () => {
            invoke("toggle_menu").then((_) => setOpen(_));
          }}
        />
        <p>{name}</p>
        <div className="flex gap-1 w-18">
          <MinusIcon height={20} width={20} className="hover:bg-neutral-300" />
          <Square2StackIcon
            height={20}
            width={20}
            className="hover:bg-neutral-300"
          />
          <XMarkIcon
            height={20}
            width={30}
            className="hover:bg-red-500 hover:text-white transition-all"
          />
        </div>
      </div>
      {open ? <Nav /> : ""}
      <div
        className={`row-start-2 col-span-full overflow-y-auto overflow-x-hidden bg-white shadow-lg ${
          open ? "col-start-2" : "col-start-1"
        } rounded-md m-1 row-start-2 row-span-2`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default TitleBar;
