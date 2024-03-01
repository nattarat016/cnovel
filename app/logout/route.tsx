import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  "use server";
  cookies().delete("token");
  cookies().delete("id");
  return redirect("/login");
}
