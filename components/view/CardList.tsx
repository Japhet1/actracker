import { useRef, useState } from 'react'
import { Label } from "@/components/ui/label"
import {CardContent,CardHeader} from "@/components/ui/card"
import { Pencil, Trash2, MoreHorizontal, MoveRight } from 'lucide-react'
import CreateTaskDialog from '../form/CreateTaskDialog';
import DeleteTask from '../DeleteTask'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import GetUseContext from '@/components/context/GetUseContext';
import { updateTask } from '@/lib/actions/user.action'
import { editTask } from '../context/GetContext'
import { format } from 'date-fns';

export interface CardListProp {
    // key: string | undefined,
    id?: string | undefined,
    task: string,
    description: string,
    assign: string,
    createdAt: Date | null,
    submissionDate: Date | null,
    status: string,
    category: string 
}

const CardList = ({id, task, description, assign, createdAt, submissionDate, status, category}: CardListProp) => {

    const [showDlg, setShowDlg] = useState(false)
    const [deleteDlg, setDeleteDlg] = useState(false)
    const { dispatch } = GetUseContext()
    const title = useRef("")
    const editData = useRef<CardListProp>()
    const taskId = useRef<string | undefined>("")
    // const statusRef = useRef("")


    const userId = sessionStorage.getItem('userId');
    // const updateStatus = () => {

    // }

    // console.log(state.task)

    const createdAtDateString: Date | null = createdAt; // Example date
    const submissionDateString: Date | null = submissionDate; 

    const formattedCreatedAt = createdAtDateString ? format(createdAtDateString, 'MMMM d, yyyy') : 'No date available';
    const formattedSubmissionDate = submissionDateString ? format(submissionDateString, 'MMMM d, yyyy') : 'No date available';

    const taskPerUser = sessionStorage.getItem("username")
    
    const toggleShowDlg = () => {
        title.current = "Edit task"
        editData.current = {
            id: id,
            task: task,
            description: description,
            assign: assign,
            createdAt: createdAt, 
            submissionDate: submissionDate,
            status: status,
            category: category
        }
        setShowDlg(!showDlg);
    }
    const toggleDeleteDlg = () => {
        taskId.current = id
        setDeleteDlg(!deleteDlg);
    }

    // useEffect(() => {
        const updateTaskStatus = async ( statusref: string) => {
            try {
                const data = {
                    $id: id,
                    task: task,
                    assignTo: assign,
                    category: category,
                    assignDate: createdAt,
                    submissionDate: submissionDate,
                    description: description,
                    status: statusref,
                    userId: userId
                };
            const result = await updateTask(data.$id!, data)
            console.log(result)
            dispatch(editTask(result))
            } catch (error) {
                console.log(error)
            }
        }
        // updateTaskStatus()
    // }, [])

    

    

    return (
        <div className="col-span-1 border bg-white dark:bg-dark-400 dark:border-none rounded-lg" key={id}>
                    <CardHeader >
                        {/* <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                        <div className='flex justify-between text-sm'>
                            <div>
                                <Label className=' font-bold'>{category}</Label>
                            </div>
                            <div className='text-sm'>
                                <Label 
                                    className={
                                        status === "Pending"? 'text-red-500 font-semibold' : 
                                        status === "In Progress"? 'text-orange-500 font-semibold': 
                                        status === "Complete"? 'text-green-500 font-semibold': ""
                                    }
                                >
                                    {status}
                                </Label>
                            </div>
                            <div className='flex gap-3'>
                                {/* <span className='bg-light-200 p-2 cursor-pointer' onClick={toggleShowDlg}><Pencil size={15} /></span> */}
                                {/* <span className='bg-light-200 p-2 cursor-pointer'><Trash2 size={15}/></span> */}
                                {/* <span className='bg-light-200 p-2 cursor-pointer'><MoreHorizontal size={15}/></span> */}
                                {/* <ContextMenu>
                                    <ContextMenuTrigger className="bg-light-200 p-2 cursor-pointer">
                                        <MoreHorizontal size={15}/>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-40 bg-white">
                                        <ContextMenuItem  className='space-x-3'>
                                            <Pencil size={15} />
                                            <Label className='cursor-pointer' onClick={toggleShowDlg}>Edit</Label>
                                        </ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem className='space-x-3'>
                                            <Trash2 size={15}/>
                                            <Label className='cursor-pointer' onClick={toggleDeleteDlg}>Delete</Label>
                                        </ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuSub>
                                            <ContextMenuSubTrigger>Update Status</ContextMenuSubTrigger>
                                            <ContextMenuSubContent className="w-36 bg-white">
                                                <ContextMenuItem><span className='cursor-pointer text-red-700'>Pending</span></ContextMenuItem>
                                                <ContextMenuItem><span className='cursor-pointer text-orange-700'>In Progress</span></ContextMenuItem>
                                                <ContextMenuItem><span className='cursor-pointer text-green-700'>Complete</span></ContextMenuItem>
                                            </ContextMenuSubContent>
                                        </ContextMenuSub>
                                    </ContextMenuContent>
                                </ContextMenu> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="bg-light-200 dark:bg-dark-500 p-2 cursor-pointer">
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white dark:bg-dark-500 dark:border-none w-40">
                                        
                                        {taskPerUser == "Admin" && (
                                            <>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                <div className='flex items-center space-x-3 text-dark-600'>
                                                    <Pencil size={15} />
                                                    <Label className='cursor-pointer' onClick={toggleShowDlg}>Edit</Label>
                                                </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <div className='flex items-center space-x-3 text-dark-600'>
                                                        <Trash2 size={15} />
                                                        <Label className='cursor-pointer' onClick={toggleDeleteDlg}>Delete</Label>
                                                    </div>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        
                                        <DropdownMenuSeparator />
                                        {taskPerUser !== "Admin" && (
                                            <>
                                                <DropdownMenuLabel>Status Update</DropdownMenuLabel>
                                                <DropdownMenuItem><span className='flex items-center gap-x-3 cursor-pointer text-red-500' onClick={async () => await updateTaskStatus("Pending")}><MoveRight size={10} />Pending</span></DropdownMenuItem>
                                                <DropdownMenuItem><span className='flex items-center gap-x-3 cursor-pointer text-orange-500' onClick={async () => await updateTaskStatus("In Progress")}><MoveRight size={10} />In Progress</span></DropdownMenuItem>
                                                <DropdownMenuItem><span className='flex items-center gap-x-3 cursor-pointer text-green-500' onClick={async () => await updateTaskStatus("Complete") }><MoveRight size={10} />Complete</span></DropdownMenuItem>
                                            </>
                                        )}
                                        
                                    </DropdownMenuContent>
                                    {showDlg && (<CreateTaskDialog title={title} editData={editData} showDlg={showDlg} toggleDlg={toggleShowDlg} />)}
                                    {deleteDlg && (<DeleteTask showDlg={deleteDlg} deleteId={taskId} toggleDeleteDlg={toggleDeleteDlg} />)}
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className='space-y-2 text-sm'>
                        <div className=''>
                            <Label>Task</Label>
                            <p className='text-dark-700 text-sm'>{task}</p>
                        </div>
                        <div className=''>
                            <Label className=''>Description</Label>
                            <p className='text-dark-700 text-sm'>{description}</p>
                        </div>
                        <div className=''>
                            <Label>Assigned To</Label>
                            <p className='text-dark-700 text-sm'>{assign}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='text-sm'>
                                <Label className=''>Assigned Date</Label>
                                <p className='text-dark-700'>{formattedCreatedAt}</p>
                            </div>
                            <div className='text-sm'>
                                <Label className=''>Submission Date</Label>
                                <p className='text-dark-700'>{formattedSubmissionDate}</p>
                            </div>
                        </div>

                    </CardContent>
                    {/* <CardFooter className="flex justify-between">

                        <div className='space-x-2'>
                            <button className='bg-red-700 p-2 cursor-pointer'><Plus size={10} className='text-white font-bold' /></button>
                            <button className='bg-orange-700 p-2 cursor-pointer'><Plus size={10} className='text-white font-bold'  /></button>
                            <button className='bg-green-700 p-2 cursor-pointer'><Plus size={10} className='text-white font-bold'  /></button>
                        </div> 
                    </CardFooter> */}
                    
                </div>
    )
}

export default CardList