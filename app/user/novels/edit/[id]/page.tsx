import { SubmitButton } from "@/app/submit-button";
import React from "react";

import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { InputTag } from "./InputTag";
import { v4 as uuidv4 } from "uuid";

export default async function page({
  params,
}: {
  params: { id: number; message: string };
}) {
  const supabase = await createClient();
  let { data: Novels, error } = await supabase
    .from("Novel")
    .select("Name,Content,tagline")
    .eq("id", params.id);
  if (error) {
    return redirect("/user/novels");
  }
  console.log(Novels![0]);

  const update = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const tagline = formData.get("tagline") as string;
    const content = formData.get("content") as string;
    const file = formData.get("file") as File;
    const pathfile = params.id + "/" + uuidv4();
    let url: string | null;
    const supabase = createClient();

    let { data: img, error: er } = await supabase
      .from("Novel")
      .select("imgUrl")
      .eq("id", params.id);
    if (er) {
      return redirect("/user/novels");
    }

    if (file.size != 0) {
      const { data: fileData, error: err } = await supabase.storage
        .from("img")
        .upload(pathfile, file, {
          contentType: "image/jpeg",
        });
      if (err) {
        return err;
      }
      const { data: urls } = supabase.storage
        .from("img")
        .getPublicUrl(pathfile);

      url = urls.publicUrl;
    } else {
      console.log(img![0].imgUrl);
      url = img![0].imgUrl;
    }

    const { error } = await supabase
      .from("Novel")
      .update({ Name: name, tagline: tagline, Content: content, imgUrl: url })
      .eq("id", params.id);
    if (error) {
      return redirect("/user/novels/updata?message=update error");
    }

    return redirect("/user/novels");
  };
  return (
    <div className="flex-1 flex flex-col  w-screen px-8 sm:max-w-md gap-2">
      <form className="animate-in flex-1 flex flex-col w-screen p-10 gap-2 text-foreground">
        <label className="text-md" htmlFor="name">
          Name
        </label>
        <InputTag text={Novels![0].Name} names="name" rows={2} cols={40} />
        <label className="text-md" htmlFor="tagline">
          Tagline
        </label>

        <InputTag
          text={Novels![0].tagline}
          names="tagline"
          rows={4}
          cols={65}
        />
        <label className="text-md" htmlFor="content">
          Content
        </label>
        <InputTag
          text={Novels![0].Content}
          names="content"
          rows={10}
          cols={125}
        />
        <label className="text-md" htmlFor="file">
          Main photo
        </label>
        <input
          type="file"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="file"
          placeholder="yourname"
        />
        <SubmitButton
          formAction={update}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 w-fit"
          pendingText="Creating..."
        >
          Create
        </SubmitButton>
        {params?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {params.message}
          </p>
        )}
      </form>
    </div>
  );
}
