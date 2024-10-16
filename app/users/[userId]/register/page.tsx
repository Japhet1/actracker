"use client"

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import CreateTaskButton from '@/components/CreateTaskButton';
import SideBar from '@/components/view/SideBar';
// import { logoutUser } from '@/lib/actions/user.action';
import { useRouter } from 'next/navigation';
import { TaskContextProvider } from '@/components/context/GetContext';
// import GetUseContext from '@/components/context/GetUseContext';
import User from '@/components/User';






const Page = ({params: { userId }}: SearchParamProps) => {

    // const { state, dispatch } = GetUseContext()
    const { setTheme } = useTheme()

    const router = useRouter()

    //const useridref = useRef(userId);

    const logout = () => {
        try {
            sessionStorage.removeItem('sessionEmail');
            sessionStorage.removeItem('sessionId');
            sessionStorage.removeItem('username');
            document.cookie = "appwriteSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

            router.push(`/`);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContextProvider>
        <main className="h-screen max-h-screen remove-scrollbar">
            
            <section className='flex justify-between px-10 items-center py-4 '>
                <div className='flex space-x-1'>
                    {/* <LayoutList /> */}
                    <a href='/'><h1 className="font-bold text-xl">ACTRACKER</h1></a>
                </div>
                <div className='flex items-center space-x-4'>
                    <User useriderf={userId}/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button size="icon" className='dark:text-white'>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='dark:border-dark-500'>
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
                    <Button variant="outline" className='dark:border-dark-500 dark:text-white'onClick={logout}>Logout</Button>
                </div>
            </section>

            <section className='mb-5 py-10'>
                <CreateTaskButton />
            </section>

                
            <section>
                <SideBar/>
            </section>
            
        </main>
        </TaskContextProvider>
    )
}

export default Page