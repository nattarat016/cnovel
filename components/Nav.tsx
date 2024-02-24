
import { createClient } from '@/utils/supabase/server';
import React from 'react'

import Link from 'next/link';
import ResponsiveAppBar from './Navuser';

function Nav() {
    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
          createClient();
          return true;
        } catch (e) {
          return false;
        }
      };
    
      const isSupabaseConnected = canInitSupabaseClient();
  return (
    <nav className="  min-w-full flex justify-center h-16 text-white">
        <ResponsiveAppBar/>
        {/* <div className="px-6 bg-indigo-950 min-w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div>
            Cnovel
          </div>
        <div>
            <Link href={'/user/novels'}>Your Novel</Link>
        </div>
          {isSupabaseConnected && <AuthButton />}
        </div> */}
      </nav>
  )
}

export default Nav