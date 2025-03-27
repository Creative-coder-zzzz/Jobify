import { fetchProfileAction } from '@/actions';
import OnBoard from '@/components/on-board';

import { currentUser } from '@clerk/nextjs/server';

import { redirect } from 'next/navigation';
import React from 'react'

async function OnBoardPage() {
     const user = await currentUser();
       
    
        const profile = null ;
    
        if(!user && !profile?._id){
          redirect('/')
        }

        const profileInfo = await fetchProfileAction(user?.id);

        if(profileInfo?._id){
          if(profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser) redirect('/membership')
            else redirect('/')
        }else return <OnBoard/>
    

  return (
   <div>
    <OnBoard/>
   </div>
  )
}

export default OnBoardPage
