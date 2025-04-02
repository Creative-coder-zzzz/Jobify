"use server"

import { connectToDB } from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { connect } from "mongoose";
import { revalidatePath } from "next/cache";

//create profile action

export async function createProfile(formData, pathTorevalidate){
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathTorevalidate)
}

export async function fetchProfileAction(id){
    await connectToDB();
    const result = await Profile.findOne({userId: id});
  


    return JSON.parse(JSON.stringify(result))
}

export async function postNewJobAction(formData, pathTorevalidate) {
    try {
        await connectToDB();
        await Job.create(formData);
        revalidatePath(pathTorevalidate);
    } catch (error) {
        console.error("Error posting new job:", error);
        throw new Error("Failed to post job");
    }
}


export async function fetchJobsForRecruiterAction(id){
    await connectToDB()
   
    const result = await Job.find({recruiterId: id})
    return JSON.parse(JSON.stringify(result))
}


export async function fetchJobsForCandidateAction(){
    await connectToDB();
    const result = await Job.find({})

    return JSON.parse(JSON.stringify(result));
}

//create job appication

export async function createJobApplicationAction(data, pathTorevalidate){
    await connectToDB()
    await Application.create(data);
    revalidatePath(pathTorevalidate)
}


export async function fetchJobApplicationForCandidate(candidateId){
    await connectToDB();
    const result = await Application.find({candidateUserId: candidateId})

    return JSON.parse(JSON.stringify(result))
}


export const fetJobApplicationForRecruiter = async (recruiterId) => {
    try {
        await connectToDB();
        const result = await Application.find({ recruiterUserId: recruiterId }).lean();
        return JSON.parse(JSON.stringify(result))
    } catch (error) {
        console.error("Error fetching job applications:", error);
        return []; // Return empty array in case of failure
    }
};


export async function getCandidateDetailsByIDAction(currentCandidateId){
    try {
        
        
        await connectToDB();
        const result = await Profile.findOne({userId: currentCandidateId}).lean()
    
        return JSON.parse(JSON.stringify(result))
    } catch (error) {
        console.log("Something Went Wrong", error)
    }
}

export async function updateJobApplicationAction(data, pathToRevalidate){
    await connectToDB();
    const { 
        _id, 
         recruiterUserId,
        name,
        email,
        candidateUserId,
        status,
        jobId,
        jobAppliedDate} = data

        await Application.findOneAndUpdate({_id: _id},{
            recruiterUserId, name, email, candidateUserId, status, jobId, jobAppliedDate
        }, {new: true}
    );

        revalidatePath(pathToRevalidate)

}