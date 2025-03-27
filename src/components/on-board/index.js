"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createProfile } from "@/actions";

export default function OnBoard() {
    const [currentTab, setCurrentTab] = useState("candidate");
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);

    function handleRecruiterFormValidation(){
      return recruiterFormData.name && recruiterFormData.name.trim() !== "" && recruiterFormData.companyName.trim() !== "" && recruiterFormData.companyRole.trim() !== "" 
    }

    function handleCandidateFormValidation(){
      return Object.keys(candidateFormData).every((key)=> {
       const value = candidateFormData[key];
       return value !== "" && value !== null && value!==undefined
      })
    }

    const currentAuthUser = useUser();
    const {user} = currentAuthUser
    console.log(currentAuthUser)

    async function createProfileAction(){
      const data = {
        recruiterInfo : recruiterFormData,
        role: "recruiter",
        userId: user?.id,
        isPremiumUser: false,
        email: user?.primaryEmailAddress?.emailAddress
      }

      await createProfile(data, '/onboard')
    }

    handleCandidateFormValidation();
    return (
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Welcome to onboarding
                        </h1>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                <TabsContent value="candidate">
                    <CommonForm
                        formControls={candidateOnboardFormControls}
                        formData={candidateFormData}
                        setFormData={setCandidateFormData}
                        buttonText="Onboard as Candidate"
                        isBtnDisabled={!handleCandidateFormValidation()}
                    />
                </TabsContent>

                <TabsContent value="recruiter">
                    <CommonForm
                        formControls={recruiterOnboardFormControls}
                        formData={recruiterFormData}
                        setFormData={setRecruiterFormData}
                        buttonText="Onboard as Recruiter"
                        isBtnDisabled={!handleRecruiterFormValidation()}
                        action = {createProfileAction}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
