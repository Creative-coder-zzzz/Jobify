"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createProfile } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient('https://giqboywhaanfuxxfeaan.supabase.co',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpcWJveXdoYWFuZnV4eGZlYWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDYxNDksImV4cCI6MjA1ODYyMjE0OX0.bE_9UzwyfoV0a9gzz1iqPdXqehHSfQzAGik2-69k4TQ")



export default function OnBoard() {
    const [currentTab, setCurrentTab] = useState("candidate");
    console.log(currentTab)
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);
    const [file, setFile] = useState(null)
    function handleRecruiterFormValidation(){
      return recruiterFormData.name && recruiterFormData.name.trim() !== "" && recruiterFormData.companyName.trim() !== "" && recruiterFormData.companyRole.trim() !== "" 
    }

    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;
        console.log(selectedFile);
        setFile(selectedFile);
    }
    
    async function handleUploadPdfToSupabase() {
        if (!file) return;
    
        const { data, error } = await supabaseClient.storage
            .from('jobbo')
            .upload(`/public/${file.name}`, file, {
                cacheControl: "3600",
                upsert: false
            });
    
        if (error) {
            console.error("File upload error:", error.message);
            return;
        }
    
        if (data) {
            setCandidateFormData((prev) => ({
                ...prev,
                resume: data.path
            }));
        }
    }
    
    useEffect(()=> {
        if(file) handleUploadPdfToSupabase();
    },[file])
     
    console.log(candidateFormData)
    function handleCandidateFormValidation(){
      return Object.keys(candidateFormData).every((key)=> 
    {  return candidateFormData[key] &&  candidateFormData[key].trim() !== ""}
      )
    }

    const currentAuthUser = useUser();
    if(!currentAuthUser) return null
    const {user} = currentAuthUser


    async function createProfileAction(){
      const data ={ 
        recruiterInfo : recruiterFormData,
        role: "recruiter",
        userId: user?.id,
        isPremiumUser: false,
        email: user?.primaryEmailAddress?.emailAddress
      }

      await createProfile(data, '/onboard')
    }

    async function createCandidateProfileAction(){
        const data =  {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
          }
          await createProfile(data, "/onboard")
    }
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
                        handleFileChange={handleFileChange}  
                       action={createCandidateProfileAction}
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
