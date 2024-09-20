"use client"

import { Button } from '@/components/ui/button';
import React, { useState, useEffect, useRef } from 'react';
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
// import { logoutUser } from '@/lib/actions/user.action';
import { useRouter } from 'next/navigation';
import { LayoutList } from "lucide-react"
import { getCategory } from '@/lib/actions/user.action';


const Page = ({params: { userId }}: SearchParamProps) => {
    const { setTheme } = useTheme()
    // const user = await getUser(userId)
    console.log(userId)

    const category = useRef<{ category: string; }[] | undefined>([]);

    const sessionEmail = sessionStorage.getItem('sessionEmail');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategory();
                // category.current = response?.documents;
                let result: string[] = []
                const a = response?.documents.map(e => (
                    // result.push(e.category)
                    {category: e.category}
                ))
                category.current = a
                console.log(category.current);
            // console.log(a);
                // console.log(response?.documents);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategory();
    }, []);

    return (
        <main className="h-screen max-h-screen remove-scrollbar">
            
            <section className='container flex justify-between items-center py-4 '>
                <div className='flex space-x-1'>
                    {/* <LayoutList /> */}
                    <a href='/'><h1 className="font-bold text-xl">ACTRACKER</h1></a>
                </div>
                <div className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-3'>
                        {/* <h1>Welcome!</h1> */}
                        <h1>{sessionEmail}</h1>
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
                    <Button variant="outline" className='bg-white'>Logout</Button>
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