"use client"
import React from 'react'
import { Drawer, DrawerContent } from '../ui/drawer'
import { ScrollArea } from '../ui/scroll-area'
import CandidateList from '../candidate-list'

function JobApplicants({showApplicantsDrawer,setShowApplicantsDrawer,showCurrentCandidateDetailsModal,setShowCurrentCandidateDetailsModal,currentCandidateDetails,setCurrentCandidateDetails,jobItem,jobApplicants}) {
  return (
    
    <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
        <DrawerContent className={"max-h-50vh"}>
            <ScrollArea className="h-auto overflow-y-auto">
                 <CandidateList
                 currentCandidateDetails={currentCandidateDetails} setCurrentCandidateDetails={setCurrentCandidateDetails}
                jobApplicants={jobApplicants}
                setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
                showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}/>

               
            </ScrollArea>

        </DrawerContent>
    </Drawer>
   
  )
}

export default JobApplicants
