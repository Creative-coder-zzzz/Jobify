"use client"
import React, { Fragment } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/dialog'
import { getCandidateDetailsByIDAction, updateJobApplicationAction } from '@/actions'
import { createClient } from '@supabase/supabase-js'

function CandidateList({jobApplicants, setCurrentCandidateDetails,currentCandidateDetails,setShowCurrentCandidateDetailsModal,showCurrentCandidateDetailsModal}) {


  async function handleFetchCandidateDetails(getCurrentCandidateId){
 
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId)

    if(data){
      setCurrentCandidateDetails(data)
      setShowCurrentCandidateDetailsModal(true)
    }

  }
 
  const supabaseClient = createClient('https://giqboywhaanfuxxfeaan.supabase.co',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpcWJveXdoYWFuZnV4eGZlYWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDYxNDksImV4cCI6MjA1ODYyMjE0OX0.bE_9UzwyfoV0a9gzz1iqPdXqehHSfQzAGik2-69k4TQ")
 
  function handlePreviewResume(){
    const {data} = supabaseClient.storage.from('jobbo').getPublicUrl(currentCandidateDetails?.candidateInfo?.resume)

    const a = document.createElement('a')
    a.href= data?.publicUrl
    a.setAttribute('download', "resume.pdf")
    a.setAttribute('target', '_blank')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

 async function  handleJobStatusUpdate(getCurrentStatus) {
   let cpyJobApplicants = [...jobApplicants]
   const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(item => item.candidateUserId === currentCandidateDetails?.userId);
   
   const jobApplicantsToUpdate = {
    ...cpyJobApplicants[indexOfCurrentJobApplicant],
    status: [...cpyJobApplicants[indexOfCurrentJobApplicant].status, getCurrentStatus]
   }
   
   await updateJobApplicationAction(jobApplicantsToUpdate, '/jobs')

   console.log(jobApplicants)

 }
 
  
  console.log(jobApplicants)

  return (
   <Fragment>
    <div className='grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3'>
      {
        jobApplicants && jobApplicants.length> 0?
        jobApplicants.map(jobApplicantItem=> 
        <div key={jobApplicantItem?._id} className='bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4'>
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
        Candidate Information
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
          <h1><strong>Skills : </strong> {currentCandidateDetails?.candidateInfo?.skills}</h1>
          <h1><strong>Total Experience : </strong> {currentCandidateDetails?.candidateInfo?.totalExperience}</h1>
        </div>
        <DialogFooter>
        <div className='flex gap-3 '>
          <Button     className="disabled:opacity-60 flex h-11 items-center justify-center px-5" onClick={handlePreviewResume}>Resume</Button>
          <Button     className="disabled:opacity-60 flex h-11 items-center justify-center px-5" onClick={()=> handleJobStatusUpdate('select')} disabled= {
          jobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status?.includes("select") ||  jobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status?.includes("reject") 
            ? true
             : false
          }>
          {
          jobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status?.includes("select") 
            ? "Selected" 
             : "Select"
          }

          </Button>
          <Button     className="disabled:opacity-60 flex h-11 items-center justify-center px-5" onClick={()=> handleJobStatusUpdate('reject')} disabled= {
          jobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status?.includes("reject") ||  jobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status?.includes("select") 
            ? true
             : false
          }>
          {
          jobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status?.includes("reject") 
            ? "rejected" 
             : "reject"
          }
          </Button>
        </div>
      </DialogFooter>
      </DialogContent>

    </Dialog>
   </Fragment>
  )
}

export default CandidateList
