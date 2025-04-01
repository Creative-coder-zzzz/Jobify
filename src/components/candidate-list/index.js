"use client"
import React, { Fragment } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { getCandidateDetailsByIDAction } from '@/actions'

function CandidateList({jobApplicants, setCurrentCandidateDetails,currentCandidateDetails,setShowCurrentCandidateDetailsModal,showCurrentCandidateDetailsModal}) {


  async function handleFetchCandidateDetails(getCurrentCandidateId){
 
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId)

    console.log(data, "data", getCurrentCandidateId, "current candidate id")

    if(data){
      setCurrentCandidateDetails(data)
      setShowCurrentCandidateDetailsModal(true)
    }

  }

  console.log(currentCandidateDetails, "candidate details")


  return (
   <Fragment>
    <div className='grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3'>
      {
        jobApplicants && jobApplicants.length> 0?
        jobApplicants.map(jobApplicantItem=> 
        <div className='bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4'>
          <div className='px-4 my-6 flex justify-between items-center'>
            <h3 className='text-lg font-bold'>
              {
                jobApplicantItem?.name
              }
            </h3>
            <Button onClick={() => handleFetchCandidateDetails(jobApplicantItem?.candidateUserId)}  className="disabled:opacity-60 flex h-11 items-center justify-center px-5">View Profile
              
            </Button>
            </div>
        </div>)
        :null
      }
    </div>
    <Dialog open={showCurrentCandidateDetailsModal}
     onOpenChange={
      ()=> {
        setCurrentCandidateDetails(null)
        setShowCurrentCandidateDetailsModal(false)
      }
     }>
    
      <DialogContent>
      <DialogTitle>
        Candidate List
      </DialogTitle>
        <div>
        <h1><strong>Name : </strong> {currentCandidateDetails?.candidateInfo?.name}</h1>
          <h1><strong>Email : </strong> {currentCandidateDetails?.email}</h1>
          <h1><strong>College : </strong> {currentCandidateDetails?.candidateInfo?.college}</h1>
          <h1><strong>College Location</strong> {currentCandidateDetails?.candidateInfo?.collegeLocation}</h1>
          <h1><strong>Current Company</strong> {currentCandidateDetails?.candidateInfo?.currentCompany}</h1>
          <h1><strong>Current Job Location :  </strong> {currentCandidateDetails?.candidateInfo?.currentJobLocation}</h1>
          <h1><strong>Current Salary</strong> {currentCandidateDetails?.candidateInfo?.currentSalary}</h1>
          <h1><strong>Github Profile :  </strong> {currentCandidateDetails?.candidateInfo?.githubProfile}</h1>
          <h1><strong>Linked In Profile : </strong> {currentCandidateDetails?.candidateInfo?.linkedinProfile}</h1>
          <h1><strong>Current Company</strong> {currentCandidateDetails?.candidateInfo?.currentCompany}</h1>
          <h1><strong>Notice Period : </strong> {currentCandidateDetails?.candidateInfo?.noticePeriod}</h1>
          <h1><strong>
          Previous companies : </strong> {currentCandidateDetails?.candidateInfo?.
          previousCompanies}</h1>
          <h1><strong>Skills : </strong> {currentCandidateDetails?.candidateInfo?.currentCompany}</h1>
          <h1><strong>Total Experience : </strong> {currentCandidateDetails?.candidateInfo?.totalExperience}</h1>

        </div>
      </DialogContent>
    </Dialog>
   </Fragment>
  )
}

export default CandidateList
