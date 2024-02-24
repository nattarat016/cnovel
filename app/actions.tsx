"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';




export const upload =async (formData: FormData) => {
    const supabase = createClient();
    const id = cookies().get('id')?.value
    const file = formData.get("file") as File;
    const pathfile =  id+"/"+uuidv4()
    if (!id) {
        return 'no user'
    }

    const { data, error } = await supabase.storage.from('img').upload(pathfile, file, {
        contentType: 'image/jpeg',
      })
    if (error) {
        console.log(error)
      return error
    }
    const {data : url } = supabase.storage.from('img').getPublicUrl(pathfile)

console.log(url.publicUrl)

  }