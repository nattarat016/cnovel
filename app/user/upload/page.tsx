import { upload } from '@/app/actions'
import { SubmitButton } from '@/app/submit-button'
import React from 'react'

function page() {
    <div>
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="name">
          Name
        </label>
        <input
        type="file"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder="yourname"
          required
        />
        <SubmitButton
          formAction={upload}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Registing..."
        >
          Register
        </SubmitButton>
       
      </form>
        </div>
  return (
    <div>page</div>
  )
}

export default page