import { createClient } from "@/utils/supabase/server";
import React from "react";

import Link from "next/link";
import ResponsiveAppBar from "./Navuser";
import { cookies } from "next/headers";

async function Nav() {
  let settings = [{ Text: "", path: "" }];
  let user = "";
  const supabase = createClient();
  const cookie = cookies().get("token");
  const { data, error } = await supabase
    .from("User")
    .select("name")
    .eq("sessions", cookie?.value);
  if (error) {
    user = "";
    return;
  }
  if (data[0] != undefined) {
    settings = [
      { Text: "Profile", path: "/" },
      { Text: "Account", path: "/" },
      { Text: "Dashboard", path: "/" },
      { Text: "Logout", path: "/logout" },
    ];
  } else {
    settings = [{ Text: "Login", path: "/login" }];
  }

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <nav className="  min-w-full flex justify-center h-16 text-white">
      <ResponsiveAppBar settings={settings} />
      {/* <div className="px-6 bg-indigo-950 min-w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div>
            Cnovel
          </div>
        <div>
            <Link href={'/user/novels'}>Your Novel</Link>
        </div>
          {isSupabaseConnected && <AuthButton />}
        </div> */}
    </nav>
  );
}

export default Nav;
