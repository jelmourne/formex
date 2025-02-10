import React, { useState } from "react";

import { HomeIcon } from "@heroicons/react/24/outline";

import { invoke } from "@tauri-apps/api/core";

function Nav() {
  const [menu, setMenu] = useState([]);

  invoke("get_menu").then((_) => {
    setMenu(_);
  });

  return (
    <nav className="flex flex-col h-screen bg-neutral-100 items-center justify-start gap-4 col-span-1 col-start-1 row-start-1 pt-6">
      <HomeIcon
        width={40}
        title="home"
        className="cursor-pointer m-2 opacity-75"
        onClick={() => window.location.replace(`/#/`)}
      />
      {menu.map((v) => {
        return (
          <input
            type="image"
            key={v.path}
            width={40}
            alt={v.title}
            title={v.title}
            onClick={() => window.location.replace(`/#${v.path}`)}
            className={"aspect-square cursor-pointer opacity-75 m-2"}
            src={v.icon}
          />
        );
      })}
    </nav>
  );
}

export default Nav;
