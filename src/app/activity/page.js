

import { fetchJobApplicationForCandidate, fetchJobsForCandidateAction } from '@/actions';
import CandidateActivity from '@/components/candidate-Activity';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

 async function Activity() {
    const user = await currentUser();
    const joblist = await fetchJobsForCandidateAction();
    const jobApplicants = await fetchJobApplicationForCandidate(user?.id)
  return (
     <CandidateActivity jobList = {joblist} jobApplicants={jobApplicants}/>
  )
}

export default Activity
