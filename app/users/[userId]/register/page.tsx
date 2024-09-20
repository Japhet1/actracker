"use client"

import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { PiNotepad } from "react-icons/pi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
// import { getUser } from "@/lib/actions/user.action"
import CreateTaskButton from '@/components/CreateTaskButton';
import SideBar from '@/components/SideBar';
import { logoutUser } from '@/lib/appwrite.config';
import { useRouter } from 'next/navigation';


const Page = ({params: { userId }}: SearchParamProps) => {
    const { setTheme } = useTheme()
    // const user = await getUser(userId)
    console.log(userId)

    const router = useRouter()

    async function logout(): Promise<void> {
        try {
            const sessionId = sessionStorage.getItem('sessionId');
        
            if (!sessionId) {
                throw new Error('No session ID found. User may not be logged in.');
            }
            await logoutUser(sessionId);
            router.push("/")
          // Additional logout logic for your frontend
        } catch (error) {
          console.error("Logout failed:", error);
          throw error;
        }
      }

    return (
        <main className="h-screen max-h-screen remove-scrollbar">
            
            <section className='container flex justify-between items-center py-4 '>
                <div className='flex space-x-1'>
                    <PiNotepad className="text-2xl dark:text-white" />
                    <a href='/'><h1 className="">ACTRACKER</h1></a>
                </div>
                <div className='flex items-center space-x-4'>
                    <div>
                        <h1>Welcome!</h1>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className='dark:text-white'>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            System
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" className='bg-white' onClick={logout}>Logout</Button>
                </div>
            </section>
            
            <section>
                <CreateTaskButton />
            </section>

            <section>
                <SideBar />
            </section>
        </main>
    )
}

export default Page