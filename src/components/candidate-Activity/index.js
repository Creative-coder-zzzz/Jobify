
"use client"

import React from 'react'
import { Tabs , TabsList, TabsTrigger} from '../ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import CommonCard from '../common-card';
import JobIcon from '../job-icon';


function CandidateActivity({jobList, jobApplicants}) {
    const uniqueStatusArray = [...new Set(jobApplicants.map(jobApplicantItem => jobApplicantItem.status).flat(1))]
    console.log(uniqueStatusArray);
  return (
    <div className="mx-auto max-w-7xl">
    <Tabs defaultValue="Applied" className="w-full">
      <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
          Your Activity
        </h1>
        <TabsList>
          {uniqueStatusArray.map((status, index) => (
            <TabsTrigger key={index} value={status}>{status}</TabsTrigger>
          ))}
        </TabsList>
      </div>
      <div className="pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="flex flex-col gap-4">
            {uniqueStatusArray.map((status, index) => (
              <TabsContent value={status} key={index}>
                {jobList
                  .filter(
                    (jobItem) =>
                      jobApplicants
                        .filter(
                          (jobApplication) =>
                            jobApplication.status.indexOf(status) > -1
                        )
                        .findIndex(
                          (filteredItemByStatus) =>
                            jobItem._id === filteredItemByStatus.jobId
                        ) > -1
                  )
                  .map((finalFilteredItem, index) => (
                    <CommonCard
                      icon={<JobIcon />}
                      title={finalFilteredItem?.title}
                      description={finalFilteredItem?.companyName}
                      key={index}
                    />
                  ))}
              </TabsContent>
            ))}
          </div>
        </div>
      </div>
    </Tabs>
  </div>
);
}
export default CandidateActivity
