import { useState } from 'react'
import { CreditCard, TableProperties, X  } from 'lucide-react'

import CardList from './CardList'
import { deleteCategoryDocument} from '@/lib/actions/user.action';
import GetUseContext from '@/components/context/GetUseContext';
import { deleteCategory } from '../context/GetContext'


const TaskList = () => {

    const [toggleTaskView, setToggleTaskView] = useState(true);
    const { state, dispatch } = GetUseContext()
    // const [ filter, setFilter ] = useState<string>('')


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
   
    // const fetchFilterTask = () => {
    //     const filterByCategory: CreateTaskParams[] = state.task
    //         .filter(e => e.category === filter)
    //         .map(e => ({
    //             $id: e.$id,
    //             task: e.task,
    //             assignTo: e.assignTo,
    //             category: e.category,
    //             assignDate: e.assignDate,
    //             submissionDate: e.submissionDate,
    //             description: e.description,
    //             status: e.status,
    //             userId: e.userId
    //         }));
    //         console.log(filterByCategory)
    //     // Only dispatch if the filter result changes
    //     if (JSON.stringify(filterByCategory)) {
    //        dispatch(setFilterTask(filterByCategory));  // Dispatch only if there's a change
    //     }
    
    // };  // Ensure all relevant state variables are included in dependencies
    // console.log(dd.current)
    // useEffect(() => {
    //     // console.log(fetchFilterTask())
    //     fetchFilterTask();
    // });

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
                        <button className='text-sm' >All</button>
                    </div>
                    {state.category.map((category) => (
                        <div key={category.$id} className="flex justify-between items-center rounded-md space-x-2 text-black dark:text-white group px-2 py-1 hover:text-green-500">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    // setFilter(category.category)
                                    
                                }}
                                className="flex-grow text-left text-sm"
                            >
                                {category.category}
                            </button>
                            <X 
                                size={15}
                                className="shad-primary-btn text-base cursor-pointer"
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
                <section className='grid grid-cols-3 gap-4 remove-scrollbar'>
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
                    {/* <TableList data={tasks}/> */}
                </section>
            )}  
        </div>
    )
}

export default TaskList