import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/dist/client/components/redirect";

export default async function deletenovel({
  params,
}: {
  params: { id: string };
}) {
  "use server";
  const supabase = await createClient();
  const { error } = await supabase.from("Novel").delete().eq("id", params.id);
  if (error) {
    console.log(error);
    console.log(params.id);

    return redirect("/");
  }
  return redirect("/user/novels");
}
