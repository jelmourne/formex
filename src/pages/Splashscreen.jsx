import { useState, useEffect } from "react";
import { app } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/core";
import Spinner from "../components/Spinner";

function Splashscreen() {
  const [user, setUser] = useState(undefined);
  const [version, setVersion] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const init = async () => {
      const _ = await app.getVersion();
      setVersion(_);
    };

    const timer = setTimeout(() => {
      setIsUpdated(true);
    }, 2000);

    // check for update clears timeout if there is an update
    if (false) {
      clearTimeout(timer);
    }
    init();
  }, []);

  useEffect(() => {
    if (user) {
      invoke("close_splashscreen");
    }
  }, [setUser, user]);

  return (
    <div className="flex flex-col justify-between items-center p-3 col-span-full row-span-full">
      <p>Formex</p>
      {!user && isUpdated ? (
        <button
          className="flex gap-3 border border-transparent hover:border-neutral-300 p-2 px-4 cursor-pointer rounded-sm transition-all"
          onClick={() => {
            invoke("set_user", { name: "Justin" }).then((_) => setUser(_));
          }}
        >
          <img className="w-6" src="/microsoft.png" />
          <p>Sign In</p>
        </button>
      ) : (
        <Spinner />
      )}
      <p className="text-sm text-neutral-300">App Version v{version}</p>
    </div>
  );
}

export default Splashscreen;
