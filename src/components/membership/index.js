"use client"
import { membershipPlans } from '@/utils'
import React from 'react'
import { Button } from '../ui/button'
import CommonCard from '../common-card'
import JobIcon from '../job-icon'
import { useEffect } from "react"
import { createRazorpayOrder, updateProfileAction } from "@/actions/"
import { useSearchParams } from "next/navigation"
function Membership({profileInfo}) {

 
    const searchParams = useSearchParams()
    useEffect(() => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      document.body.appendChild(script)
    }, [])
  
    useEffect(() => {
      if (searchParams.get("status") === "success") {
        updateProfile()
      }
    }, [searchParams])
  
    const handleRazorpayPayment = async (plan) => {
      const res = await createRazorpayOrder(plan)
  
      if (!res?.orderId) return alert("Order creation failed")
  
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_CLIENT_ID,
        amount: plan.price * 100,
        currency: "INR",
        name: "JOBIFY",
        description: plan.heading,
        order_id: res.orderId,
        handler: function (response) {
          sessionStorage.setItem("currentPlan", JSON.stringify(plan))
          window.location.href = "/membership?status=success"
        },
        prefill: {
          name: "Sandesh Adhikari",
          email: "test@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#121212",
        },
      }
  
      const rzp = new window.Razorpay(options)
      rzp.open()
    }
  
    const updateProfile = async () => {
      const currentPlan = JSON.parse(sessionStorage.getItem("currentPlan"))
  
      await updateProfileAction(
        {
          ...profileInfo,
          isPremiumUser: true,
          memberShipType: currentPlan?.type,
          memberShipStartDate: new Date().toString(),
          memberShipEndDate: new Date(
            new Date().getFullYear() +
              (currentPlan?.type === "basic"
                ? 1
                : currentPlan?.type === "teams"
                ? 2
                : 5),
            new Date().getMonth(),
            new Date().getDate()
          ),
        },
        "/membership"
      )
    }
  
  return (
    <div className='mx-auto max-w-7xl'>
      <div className='flex items-baseline dark:border-white justify-between border-b pb-6 pt-24'>
        <h1 className='text-4xl font-bold dark:text-white tracking-tight text-gray-950'>
          {
            profileInfo?.isPremiumUser 
            ?  "You are a premium user"
            : "Choose Your Best Plan"
          }
        </h1>
        <div>
          {profileInfo?.isPremiumUser ? (
            <Button className="flex h-11 items-center justify-center px-5">
              {
                membershipPlans.find(
                  (planItem) => planItem.type === profileInfo?.memberShipType
                ).heading
              }
            </Button>
          ) : null}
        </div>
      </div>
      <div className='py-20 pb-24 pt-6'>
        <div className='container mx-auto p-0 space-y-8'>
          <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
            {
              membershipPlans.map((plan, index)=> (
                <CommonCard
                key={index}
                icon={<div className='flex justify-between'>
                  <div >
                      <JobIcon/>
                  </div>
                  <h1 className='font-bold text-2xl'>
                    {plan.heading}
                  </h1>
                </div>}
                  title={`$ ${plan.price} /yr`}
                  description={plan.type}
                  footerContent={
                    profileInfo?.memberShipType === "enterprise" ||
                    (profileInfo?.memberShipType === "basic" && index === 0) ||
                    (profileInfo?.memberShipType === "teams" &&
                    index >= 0 &&
                    index < 2 ? null : (
                      <Button
                        onClick={() => handleRazorpayPayment(plan)}
                        className="disabled:opacity-65 dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                      >
                        {profileInfo?.memberShipType === "basic" ||
                        profileInfo?.memberShipType === "teams"
                          ? "Update Plan"
                          : "Get Premium"}
                      </Button>
                    ))
                  }
                >

                </CommonCard>
              ))
            }
          </div>
        </div>
      </div>


    </div>
  )
}

export default Membership
