import React from 'react'
import { MdDashboard, MdSignalWifiStatusbarConnectedNoInternet4, MdOutlineSettings } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskList from './TaskList';

interface SideBarProp {
    useridref: string
}

const SideBar = ({useridref}: SideBarProp) => {
    return (
        <main className='container'>
            <Tabs defaultValue="Task" className="">
                <TabsList>
                    <TabsTrigger value="Task" className=' bg-white'>Task</TabsTrigger>
                    {/* <TabsTrigger value="password">Password</TabsTrigger> */}
                </TabsList>
                <TabsContent value="Task" className='py-5 bg-light-200 rounded-md px-4'><TaskList useridref={useridref}/></TabsContent>
                {/* <TabsContent value="password">Change your password here.</TabsContent> */}
            </Tabs>
        </main>
    )
}

export default SideBar