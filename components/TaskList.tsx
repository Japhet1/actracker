import { useState } from 'react'
import SearchCategory from './SearchCategory'
import { tasks } from '@/constant'
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus, MoreHorizontal, CreditCard, TableProperties } from 'lucide-react'


import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { MdAdd } from 'react-icons/md'

import CardList from './CardList'
import TableList from './TableList'

const TaskList = () => {

    const [toggleTaskView, setToggleTaskView] = useState(true);

    
    return (
        <div className='space-y-5 remove-scrollbar'>
            <section className='flex justify-between items-center border-dashed'>
                <SearchCategory />
                <div className='flex justify-between items-center'>
                    <CreditCard size={30} className='text-dark-500 cursor-pointer' onClick={()=>setToggleTaskView(true)}/>
                    <TableProperties className='text-dark-500 cursor-pointer' onClick={()=>setToggleTaskView(false)}/>
                </div>
            </section>

            {toggleTaskView ? (
                <section className='grid grid-cols-12 gap-5 remove-scrollbar'>
                    {tasks.map(task => (
                        <CardList 
                            id = {task.id}
                            task = {task.task}
                            description = {task.description}
                            assign = {task.assigned}
                            createdAt = {task.date}
                            submissionDate = {task.date}
                            status = {task.status}
                            category = {task.category}
                        />
                    ))}
                </section>
            ) : (
                <section className=''>
                    <TableList data={tasks}/>
                </section>
            )}

            
            
            
        </div>
    )
}

export default TaskList