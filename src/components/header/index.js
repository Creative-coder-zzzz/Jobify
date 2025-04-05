"use client"

import React from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import {AlignJustify} from 'lucide-react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
function Header({user, profileInfo}) {
    const menuItems = [
        {
            label: "Home",
            path: "/",
            show: true
        },
        {
            label: "Login",
            path: '/sign-in',
            show: !user
        },
        {
            label: "Register",
            path: '/sign-up',
            show: !user
        },
        {
            label: "Jobs",
            path: '/jobs',
            show: user
        },
        {
            label: "Activity",
            path: '/activity',
            show: profileInfo?.role === "candidate"
        },
        {
            label: "Membership",
            path: '/membership',
            show: user
        },
        {
            label: "Account",
            path: '/account',
            show: user
        },
    ]
  return (
    <div>
      <header className='flex h-16 w-full shrink-0 item-center'>
        <Sheet>
            <SheetTrigger asChild>
                <Button className={"lg:hidden"}>
                <AlignJustify className='h-6 w-6'/>
                <span className='sr-only'> Toggle Navigation Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-4">
                <SheetTitle className={"text-lg font-bold tracking-wider"}>Welcome to JOBIFY </SheetTitle> 
                    <Link className='mr-6 hidden lg:flex' href={"#"}>
                    <h3 className='text-2xl'>JOBIFY</h3>
                    </Link>
                    <div className='grid gap-2 py-6'>
                        {
                            menuItems.map((menuItem, index) => (menuItem.show ? <Link onClick={()=> sessionStorage.removeItem("filterParams")} href={menuItem.path} key={index} className='flex w-full items-center py-2 text-lg font-semibold'>
                            {menuItem.label}
                            </Link> :null))
                        }
                        <UserButton afterSignOutUrl='/'></UserButton>
                    </div>
                </SheetContent>
        </Sheet>

        <Link className='hidden font-bold text-4xl lg:flex mr-6 items-center' href={'/'}>
        JOBIFY
        </Link>
        <nav className='ml-auto hidden lg:flex gap-6 items-center'>
            {
                menuItems.map((menuItem, index)=> (
                    menuItem.show ?
                    <Link href={menuItem.path} className='group inline-flex h-9 w-max item-center rounded-md bg-white px-4 py-2 text-sm font-medium' key={index}>
                    {menuItem.label}
                    </Link>
                     : null
                     
                ))}
                <UserButton afterSignOutUrl='/'></UserButton>
            
        </nav>
      </header>
    </div>
  )
}

export default Header
