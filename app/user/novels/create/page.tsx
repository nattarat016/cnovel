import { SubmitButton } from '@/app/submit-button';
import { generateToken } from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';
import { log } from 'console';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

function page() {
    const create = async (formData: FormData) => {
        "use server";
        const Name = formData.get("name") as string;
        const Content = formData.get("content") as string;
        const supabase = createClient();
        const id = cookies().get('id')?.value
    
        const {data,error } = await supabase
          .from("Novel")
          .insert([{ Name, Content, user_id : id}])
        if (error) {
            log(error)
        //   return redirect("/login?message=Could not authenticate user");
        }
        
        // return redirect("/login?message=Check email to continue sign in process");
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
            <label className="text-md" htmlFor="content">
              Content
            </label>
            <textarea 
            rows={10} cols={140 }
              className="rounded-md px-4 py-2 bg-inherit border mb-6 w-fit"
              name="content"
              placeholder="..."
              required
            />
            <SubmitButton
              formAction={create}
              className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
              pendingText="Creating..."
            >
              Create
            </SubmitButton>
          </form>
        </div>
      );
}

export default page