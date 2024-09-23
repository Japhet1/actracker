import { useState, useEffect,useRef, useCallback, useMemo } from 'react'
import SearchCategory from '../SearchCategory'
import { tasks } from '@/constant'
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus, MoreHorizontal, CreditCard, TableProperties, X  } from 'lucide-react'


import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { MdAdd } from 'react-icons/md'

import CardList from './CardList'
import TableList from './TableList'
import { deleteCategoryDocument, getCategory, getTask, getUsers } from '@/lib/actions/user.action';
import GetUseContext from '@/components/context/GetUseContext';
import { deleteCategory, setCategory, setTask, setUser, setFilterTask } from '../context/GetContext'
import { Models } from 'node-appwrite';

interface TaskListProp {
    useridref: string
}


const TaskList = ({useridref}: TaskListProp) => {

    const [toggleTaskView, setToggleTaskView] = useState(true);
    const { state, dispatch } = GetUseContext()
    const [ filter, setFilter ] = useState<string>('')

    const dd = useRef("")

    const taskPerUser = sessionStorage.getItem("username")
    const newData = state.task.filter(task => task.assignTo === taskPerUser)

    if(taskPerUser == "Admin") {

    }

    // console.log("filter base on user", state.task)
    const onDeleteCategory = async (id: string | undefined) => {
        try {
            const result = await deleteCategoryDocument(id!)
            console.log(result)
            dispatch(deleteCategory(id))
        } catch (error) {
            console.log(error)
        }
    }
   
    const fetchFilterTask = useCallback(() => {
        const filterByCategory: CreateTaskParams[] = state.task
            .filter(e => e.category === filter)
            .map(e => ({
                $id: e.$id,
                task: e.task,
                assignTo: e.assignTo,
                category: e.category,
                assignDate: e.assignDate,
                submissionDate: e.submissionDate,
                description: e.description,
                status: e.status,
                userId: e.userId
            }));
            console.log(filterByCategory)
        // Only dispatch if the filter result changes
        if (JSON.stringify(filterByCategory)) {
           dispatch(setFilterTask(filterByCategory));  // Dispatch only if there's a change
        }
    
    }, [filter, state.task]);  // Ensure all relevant state variables are included in dependencies
    // console.log(dd.current)
    useEffect(() => {
        // console.log(fetchFilterTask())
        fetchFilterTask();
    }, [filter]);

    // const filterByCategory = () => {
    //     if (filter === '') {
    //       return state.task;
    //     } else {
    //       return state.task.filter(e => e.category === filter).map(e => ({
    //         $id: e.$id,
    //         task: e.task,
    //         assignTo: e.assignTo,
    //         category: e.category,
    //         assignDate: e.assignDate,
    //         submissionDate: e.submissionDate,
    //         description: e.description,
    //         status: e.status,
    //         userId: e.userId
    //       }));
    //     }
    //   }
    //   console.log(filterByCategory)
    //   useEffect(() => {
    //     dispatch(setFilterTask(filterByCategory));
    //   }, [filterByCategory, dispatch]);


    
    return (
        <div className='space-y-5 remove-scrollbar'>
            <section className='flex justify-between items-center border-dashed'>
                <div className='flex items-center space-x-5'>
                    <div>
                        <button className='text-sm' onClick={() => setFilter('')}>All</button>
                    </div>
                    {state.category.map((category) => (
                        <div key={category.$id} className="flex justify-between items-center rounded-md space-x-2 text-black group px-2 py-1 hover:text-green-500">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setFilter(category.category)
                                    
                                }}
                                className="flex-grow text-left text-sm"
                            >
                                {category.category}
                            </button>
                            <X 
                                size={15}
                                className="text-dark-400 text-base cursor-pointer"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onDeleteCategory(category.$id);
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center'>
                    <CreditCard size={30} className='text-dark-500 cursor-pointer' onClick={()=>setToggleTaskView(true)}/>
                    <TableProperties className='text-dark-500 cursor-pointer' onClick={()=>setToggleTaskView(false)}/>
                </div>
            </section>

            {toggleTaskView ? (
                <section className='grid grid-cols-12 gap-5 remove-scrollbar'>
                    {taskPerUser == "Admin" ? state.task.map(task => (
                        <CardList 
                            key={task.$id}
                            id = {task.$id}
                            task = {task.task}
                            description = {task.description}
                            assign = {task.assignTo}
                            createdAt = {task.assignDate}
                            submissionDate = {task.submissionDate}
                            status = {task.status}
                            category = {task.category}
                        />
                    )): newData.map(task => (
                        <CardList 
                            key={task.$id}
                            id = {task.$id}
                            task = {task.task}
                            description = {task.description}
                            assign = {task.assignTo}
                            createdAt = {task.assignDate}
                            submissionDate = {task.submissionDate}
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