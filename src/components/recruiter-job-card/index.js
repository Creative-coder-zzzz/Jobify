"use client"

import React from 'react'
import CommonCard from '../common-card'
import JobIcon from '../job-icon'
import { Button } from '../ui/button'

function RecruiterJobCard({jobItem}) {
  return (
    <div>
      <CommonCard icon={<JobIcon/>} title={jobItem?.title} footerContent={<Button className={"flex h-11 items-center justify-center px-5"}>10 applicants</Button>}></CommonCard>
    </div>
  )
}

export default RecruiterJobCard
