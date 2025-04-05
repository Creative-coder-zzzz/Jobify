import { fetchProfileAction } from '@/actions';
import HomePageButtonControls from '@/components/homepage-button-controls';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';
import homePage from '../../public/homepage.jpg'
import Image from 'next/image';

export default async function Home() {
    const user = await currentUser();
    if(user && !user?.id){
      redirect('/onboard')
    }

    const profileInfo = await fetchProfileAction(user?.id); 
    if(user && !profileInfo?._id) redirect ('/onboard')

  return (
 <Fragment>
  <div className='bg-white'>
    <div className='relative-w-full'>
      <div className='min-h-screen flex'>
        <div className="container m-auto p-0">
          <div className='flex items-center flex-wrap gap-12 lg:gap-0'>
              <div className="lg:w-5/12 space-y-8">
                <span className='flex space-x-2'>
                  <span className='block w-14 border-b-2 border-gray-700'>
                  </span>
                  <span className='font-medium text-gray-600'>
                    Right Place to find Jobs
                  </span>
                </span>
                <h1 className='text-4xl font-bold md-text-6xl'>
                  The Best <br>
                  </br>
                  Job Portal App

                </h1>
                <p className='text-xl text-gray-700'>
                  Find best jobs from Top Product Based companies and build your carrer
                </p>
                <HomePageButtonControls user={JSON.parse(JSON.stringify(user))}  profileInfo={JSON.parse(JSON.stringify(profileInfo))}/>
              </div>
              <div className='hidden relative md:block lg:w-7/12'>
                <Image src={homePage} alt="job portal" className='relative ml-auto'/>
                
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </Fragment>
  );
}
