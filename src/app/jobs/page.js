
import { fetchJobsForRecruiterAction, fetchProfileAction } from '@/actions';
import JobListing from '@/components/job-listing';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
    
async function JobsPage() {
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)

    const jobList = await fetchJobsForRecruiterAction(user?.id)

  return (
    <JobListing user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} jobList={jobList}/>
  )
}

export default JobsPage
