import { useState, useEffect,useRef } from 'react'
import SearchCategory from '../SearchCategory'
import { tasks } from '@/constant'
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus, MoreHorizontal, CreditCard, TableProperties, X  } from 'lucide-react'


import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { MdAdd } from 'react-icons/md'

import CardList from './CardList'
import TableList from './TableList'
import { deleteCategoryDocument, getCategory, getTask, getUser } from '@/lib/actions/user.action';
import GetUseContext from '@/components/context/GetUseContext';
import { deleteCategory, setCategory, setTask, setUser } from '../context/GetContext'


interface TaskListProp {
    useridref: string
}

const TaskList = ({useridref}: TaskListProp) => {

    const [toggleTaskView, setToggleTaskView] = useState(true);
    const { state, dispatch } = GetUseContext()
    // const [ filter, setFilter ] = useState<string>('')

    // const f = sessionStorage.getItem('userId');
    // const userid = useRef(f)
    // console.log(state.category)
    const onDeleteCategory = async (id: string | undefined) => {
        try {
            const result = await deleteCategoryDocument(id!)
            console.log(result)
            dispatch(deleteCategory(id))
        } catch (error) {
            console.log(error)
        }
    }
    
    

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategory();
                dispatch(setCategory(response?.documents))
                console.log("category", response);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchTask = async () => {
            try {
                const response = await getTask(useridref);
                dispatch(setTask(response?.documents))
                // console.log("task", response);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchUser = async() => {
            try {
                const response = await getUser()
                dispatch(setUser(response?.users))
                // console.log("users", response?.users)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategory();
        fetchTask();
        fetchUser()
    }, []);

    // useEffect(() => {
    //     dispatch(setCategory(filter))
    // }, [filter, dispatch])


    
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
                    {state.category.map((category) => (
                        <div key={category.$id} className="flex justify-between items-center rounded-md space-x-2 text-black group px-2 py-1 hover:text-green-500">
                            <button
                                onClick={(e) => {
                                e.preventDefault();
                                // setFilter(category.category);
                                }}
                                className="flex-grow text-left text-sm"
                            >
                                {category.category}
                            </button>
                            {/* <div className=""> */}
                                <X 
                                    size={15}
                                    className="text-dark-400 text-base cursor-pointer"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onDeleteCategory(category.$id);
                                    }}
                                />
                            {/* </div> */}
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
                    {state.task.map(task => (
                        <CardList 
                            // key = {task.id}
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