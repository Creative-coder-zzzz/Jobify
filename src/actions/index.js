"use server"

import { connectToDB } from "@/database";
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