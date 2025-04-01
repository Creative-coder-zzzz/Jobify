"use client"

import React, { useState } from 'react'
import CommonCard from '../common-card'
import JobIcon from '../job-icon'
import { Button } from '../ui/button'
import JobApplicants from '../job-applicants'

function RecruiterJobCard({jobItem, jobApplications}) {

  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal] = useState(false)


  return (
    <div>
      <CommonCard icon={<JobIcon/>} title={jobItem?.title} footerContent={<Button disabled={jobApplications.filter((item)=> item.jobId === jobItem?._id).length === 0} onClick={()=>setShowApplicantsDrawer(true)} className={"disabled:opacity-65 flex h-11 items-center justify-center px-5"}>
        {
          jobApplications?.filter(item => item.jobId === jobItem?._id).length
        } Applicants
      </Button>}></CommonCard>
      <JobApplicants showApplicantsDrawer={showApplicantsDrawer}
      setShowApplicantsDrawer={setShowApplicantsDrawer}
      showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
      setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
      currentCandidateDetails={currentCandidateDetails}
      setCurrentCandidateDetails={setCurrentCandidateDetails}
      jobItem={jobItem}
      jobApplicants = {jobApplications.filter(jobApplicantItem => jobApplicantItem.jobId === jobItem?._id)}
      />
    </div>
  )
}

export default RecruiterJobCard
