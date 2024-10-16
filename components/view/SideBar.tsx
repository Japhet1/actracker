import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskList from './TaskList';

// interface SideBarProp {
//     useridref: string
// }

const SideBar = () => {
    return (
        <main className='px-10'>
            <Tabs defaultValue="Task" className="">
                <TabsList>
                    <TabsTrigger value="Task" className=' bg-white dark:bg-dark-200'>Task</TabsTrigger>
                    {/* <TabsTrigger value="password">Password</TabsTrigger> */}
                </TabsList>
                <TabsContent value="Task" className='py-5 bg-light-200 dark:bg-dark-200 rounded-md px-4'><TaskList /></TabsContent>
                {/* <TabsContent value="password">Change your password here.</TabsContent> */}
            </Tabs>
        </main>
    )
}

export default SideBar