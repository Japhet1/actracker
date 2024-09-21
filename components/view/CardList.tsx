import { useRef, useState } from 'react'
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,
} from "@/components/ui/card"
import { Pencil, Trash2, Plus, MoreHorizontal, CreditCard, TableProperties, MoveRight } from 'lucide-react'
import CreateTaskDialog from '../form/CreateTaskDialog';
import DeleteTask from '../DeleteTask'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import GetUseContext from '@/components/context/GetUseContext';

export interface CardListProp {
    // key: string | undefined,
    id: string | undefined,
    task: string,
    description: string,
    assign: string,
    createdAt: Date | null,
    submissionDate: Date | null,
    status: string | undefined,
    category: string | undefined
}

const CardList = ({id, task, description, assign, createdAt, submissionDate, status, category}: CardListProp) => {

    const [showDlg, setShowDlg] = useState(false)
    const [deleteDlg, setDeleteDlg] = useState(false)
    const { state } = GetUseContext()
    const title = useRef("")
    const editData = useRef<CardListProp>()
    const taskId = useRef<string | undefined>("")
    
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

    return (
        <div className="w-[400px] col-span-4 border bg-white rounded-lg" key={id}>
                    <CardHeader >
                        {/* <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                        <div className='flex justify-between'>
                            <div>
                                <Label className='text-lg font-bold'>{category}</Label>
                            </div>
                            <div>
                                <Label>{status}</Label>
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
                                    <DropdownMenuTrigger asChild className="bg-light-200 p-2 cursor-pointer">
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white w-40">
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
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>Status Update</DropdownMenuLabel>
                                        <DropdownMenuItem><span className='flex items-center gap-x-3 cursor-pointer text-red-700'><MoveRight size={10} />Pending</span></DropdownMenuItem>
                                        <DropdownMenuItem><span className='flex items-center gap-x-3 cursor-pointer text-orange-700'><MoveRight size={10} />In Progress</span></DropdownMenuItem>
                                        <DropdownMenuItem><span className='flex items-center gap-x-3 cursor-pointer text-green-700'><MoveRight size={10} />Complete</span></DropdownMenuItem>
                                    </DropdownMenuContent>
                                    {showDlg && (<CreateTaskDialog title={title} editData={editData} showDlg={showDlg} toggleDlg={toggleShowDlg} />)}
                                    {deleteDlg && (<DeleteTask showDlg={deleteDlg} deleteId={taskId} toggleDeleteDlg={toggleDeleteDlg} />)}
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className='space-y-2'>
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
                            {/* <div className='text-sm'>
                                <Label className=''>Assigned Date</Label>
                                <p className='text-dark-700'>{createdAt ? createdAt.toLocaleDateString() : 'No Assigned Date'}</p>
                            </div>
                            <div className='text-sm'>
                                <Label className=''>Submission Date</Label>
                                <p className='text-dark-700'>{submissionDate ? submissionDate.toLocaleDateString() : 'No Submission Date'}</p>
                            </div> */}
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