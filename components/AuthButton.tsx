
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  let user = null
  const supabase = createClient();
  const cookie = cookies().get('token')
  const { data, error } = await supabase
      .from("User")
      .select("name")
      .eq("sessions", cookie?.value);
    if (error) {
      return
    }
    if (data[0] != undefined) user = data[0] 
      
  const signOut = async () => {
    "use server";
    cookies().delete('token')
    cookies().delete('id')
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.name} !
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
