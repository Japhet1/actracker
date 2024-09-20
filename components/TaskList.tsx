import { useState } from 'react'
import SearchCategory from './SearchCategory'
import { tasks } from '@/constant'
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus, MoreHorizontal, CreditCard, TableProperties } from 'lucide-react'


import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { MdAdd } from 'react-icons/md'

import CardList from './CardList'
import TableList from './TableList'


interface TaskListProp {
}

const TaskList = () => {

    const [toggleTaskView, setToggleTaskView] = useState(true);


    
    return (
        <div className='space-y-5 remove-scrollbar'>
            <section className='flex justify-between items-center border-dashed'>
                {/* <SearchCategory /> */}
                <div className='flex items-center space-x-5'>
                    <div>
                        <button className='text-sm'>
                            All
                        </button>
                    </div>
                    {/* <h1>{category}</h1> */}
                    {/* {category?.map((category) => (
                        <div className="flex justify-between items-center rounded-md space-x-2 text-black group px-2 py-1">
                            <button
                                onClick={(e) => {
                                e.preventDefault();
                                // setFilter(category.category);
                                }}
                                className="flex-grow text-left text-sm"
                            >
                                {category.category}
                            </button>
                            <div className="">
                                
                            </div>
                        </div>
                    ))} */}
                </div>
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