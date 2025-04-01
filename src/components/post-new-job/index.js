

"use client"

import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import CommonForm from "../common-form"
import { useState } from "react"
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils"
import { postNewJobAction } from "@/actions"

 function PostNewJob({profileInfo, user}){
    const [showJobDialog, setShowJobDialog] = useState(false)
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.
        recruiterInfo?.companyName
        
    })

    function handlePostNewBtnValid(){
        return Object.keys(jobFormData).every(keys =>
            jobFormData[keys]?.trim() !== ""
          
)}

async function  createNewJob() {
    await postNewJobAction({
        ...jobFormData,
        recruiterId : user?.id,
        applicants: []
    }, "/jobs")

    setJobFormData({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.
        recruiterInfo?.companyName
    });
    setShowJobDialog(false)
}

return <div>
    <Button onClick={()=> setShowJobDialog(true)}   className="disabled:opacity-60 flex h-11 items-center justify-center px-5">Post A Job</Button>
    <Dialog open={showJobDialog} onOpenChange={()=> {
        setShowJobDialog(false);
        setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName
        })
    }}>
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-y-scroll">
            <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                    Post New Job
                </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <CommonForm buttonText="Add"
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls= {postNewJobFormControls}
                isBtnDisabled={!handlePostNewBtnValid()}
                action={createNewJob}
                />
           
            </div>
        </DialogContent>
    </Dialog>
</div>
}


export default PostNewJob