import { createClient } from "@/utils/supabase/server";
import { Box, Paper } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
const fe = () => {};

async function page() {
  const td = " text-center border";

  const supabase = createClient();
  const id = cookies().get("id")?.value;

  let { data: Novels, error } = await supabase
    .from("Novel")
    .select("*")
    .eq("user_id", id);

  if (error) {
    return <>555</>;
  }
  return (
    <div className=" text-white p-10  bg-indigo-900 min-w-full min-h-screen r">
      <div className=" p-3 text-3xl mb-7 flex justify-between items-center">
        <div> pagenovel </div>
        <Link className=" border p-3 text-xl" href={"/user/novels/create"}>
          Create
        </Link>
      </div>
      {Novels?.map((novel, indek) => (
        <div key={novel.id} className="border w-full grid grid-cols-7">
          <span className="col-span-1  text-center py-2  items-center flex justify-center">
            {indek}
          </span>
          <span className=" border border-y-0 col-span-5 flex items-center justify-center  py-2 text-center">
            {novel.Name}
          </span>
          <span className="col-span-1 m-2 items-center py-2 gap-2  flex flex-1 justify-center">
            <Link
              className=" p-2 px-5 border bg-lime-600 hover:bg-lime-400 "
              href={`/user/novels/edit/${novel.id}`}
            >
              Edit
            </Link>
            <button className=" p-2 px-2 border bg-red-600 hover:bg-red-400">
              Delete
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default page;
