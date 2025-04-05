
import { fetchJobApplicationForCandidate, 
  fetJobApplicationForRecruiter, fetchJobsForCandidateAction, fetchJobsForRecruiterAction, fetchProfileAction, 
  createFilterCategoryAction} from '@/actions';
import JobListing from '@/components/job-listing';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
    
async function JobsPage({searchParams}) {
     const searchParam = await searchParams
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)

    const jobList = profileInfo?.role === "candidate" ? await fetchJobsForCandidateAction(searchParam) :  await fetchJobsForRecruiterAction(user?.id)


    const getJobApplicationList = profileInfo?.role === "candidate" ? await fetchJobApplicationForCandidate(user?.id) : await fetJobApplicationForRecruiter(user?.id)


    const fetchFilterCategories = await createFilterCategoryAction();



  return (
    <JobListing user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} jobList={jobList}
    jobApplications={getJobApplicationList}
    filterCategory={fetchFilterCategories}/>
  )
}

export default JobsPage
