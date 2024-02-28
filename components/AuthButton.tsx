import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/dist/client/components/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
export const signOut = async () => {
  "use server";
  cookies().delete("token");
  cookies().delete("id");
  return redirect("/");
};
// export async function AuthButton() {
//   return user ? (
//     <div className="flex items-center gap-4">
//       Hey, {user.name} !
//       <form action={signOut}>
//         <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
//           Logout
//         </button>
//       </form>
//     </div>
//   ) : (
//     <Link
//       href="/login"
//       className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
//     >
//       Login
//     </Link>
//   );
// }
