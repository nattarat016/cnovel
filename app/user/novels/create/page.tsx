import { SubmitButton } from "@/app/submit-button";
import { generateToken } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server";
import { log } from "console";
import { url } from "inspector";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const create = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const tagline = formData.get("tagline") as string;
    const content = formData.get("content") as string;
    const file = formData.get("file") as File;
    let url: string | null;

    const supabase = createClient();
    const id = cookies().get("id")?.value;
    if (!id) {
      return "no user";
    }
    const pathfile = id + "/" + uuidv4();
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
      url = null;
    }

    const { data, error } = await supabase.from("Novel").insert([
      {
        Name: name,
        tagline,
        Content: content,
        user_id: id,
        imgUrl: url,
      },
    ]);
    if (error) {
      return redirect("/user/novels/create?message=create error");
    }

    return redirect("/user/novels");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md gap-2">
      <form className="animate-in flex-1 flex flex-col w-full p-10 gap-2 text-foreground">
        <label className="text-md" htmlFor="name">
          Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder="yourname"
          required
        />
        <label className="text-md" htmlFor="tagline">
          Tagline
        </label>
        <textarea
          rows={4}
          cols={65}
          className="rounded-md px-4 py-2 bg-inherit border mb-6 w-fit"
          name="tagline"
          placeholder="tagline..."
          required
        />
        <label className="text-md" htmlFor="content">
          Content
        </label>
        <textarea
          rows={10}
          cols={125}
          className="rounded-md px-4 py-2 bg-inherit border mb-6 w-fit"
          name="content"
          placeholder="..."
          required
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
          formAction={create}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Creating..."
        >
          Create
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
