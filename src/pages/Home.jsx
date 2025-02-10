import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function Home() {
  const [menu, setMenu] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    invoke("get_menu").then((_) => {
      setMenu(_);
    });

    invoke("get_user").then((_) => {
      setUser(_);
    });
  }, []);

  return (
    <div className="flex justify-start gap-10 p-10 items-start">
      {menu.map((v) => {
        return (
          <div className="flex flex-col w-1/12 min-w-36" key={v.path}>
            <input
              type="image"
              key={v.path}
              onClick={() => window.location.replace(`/#${v.path}`)}
              src={v.icon}
              className="aspect-square border flex justify-center items-center rounded-lg shadow-lg cursor-pointer p-12 opacity-75"
            />
            <p className="text-sm text-center text-nowrap">{v.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
