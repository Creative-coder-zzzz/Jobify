"use client"

import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function HomePageButtonControls({user,profileInfo}) {
  const router = useRouter()

  useEffect(()=> {
        router.refresh()
  },[])
  return (
    <div>
         <div className='flex space-x-4'>
            
                  <Button onClick={()=> router.push('/jobs')} className={"flex h-11 items-center justify-center px-5"}>
                    { user ? 
                        profileInfo?.role === "candidate"
                        ? "Browse Jobs"
                        : "Jobs Dashboard"
                        : "Find Jobs"
                    }
                  </Button>
                  <Button onClick={()=> router.push( user ? profileInfo?.role === 'candidate' ? '/activity' : '/jobs' : "/jobs")} className={"flex h-11 items-center justify-center px-5"}>
                    {
                        user ? profileInfo?.role === 'candidate' ? "Your Activity" : "Post New Jobs" : "Post New Job"
                    }
                  </Button>
                </div>
    </div>
  )
}

export default HomePageButtonControls
