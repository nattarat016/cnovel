import Nav from "@/components/Nav";
import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "./submit-button";
import { upload } from "./actions";
import Navuser from "@/components/Navuser";

export default async function Index() {
  const supabase = createClient();
  let { data: Novel, error } = await supabase.from("Novel").select("*");

  const novellist = () => {
    return Novel?.map((text) => <p key={text.id}>{text.Name}</p>);
  };

  return (
    <>
      <Nav />
      <main className=" text-white p-10 flex-col flex bg-indigo-900 min-w-full min-h-screen items-center">
        <div className=" text-3xl">Novel</div>

        <div>{novellist()}</div>
        <div>
          {/* <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <SubmitButton
              formAction={upload}
              className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
              pendingText="loading..."
            >
              Upload
            </SubmitButton>
          </form> */}
          <img
            src="https://jzjsrxltbucdnslpadgi.supabase.co/storage/v1/object/public/img/14/8ab550a0-c643-4b58-be22-25f6e6609402"
            alt="adsd"
          />
        </div>
      </main>
    </>
  );
}
