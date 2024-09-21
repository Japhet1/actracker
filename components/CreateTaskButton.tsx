import { useRef, useState } from 'react'
// import { MdNoteAdd } from 'react-icons/md'
import { MdAddTask } from "react-icons/md";
import React from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import CreateTaskDialog from './form/CreateTaskDialog';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { CategoryValidation } from "@/lib/validation"
import CustomFormField from "./form/CustomFormFields"
import { FormFieldType } from "./form/CustomFormFields"
import SubmitButton from "./form/SubmitButton"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FileCheck2, List } from "lucide-react"
import { createCategory } from '@/lib/actions/user.action';
import GetUseContext from '@/components/context/GetUseContext';
import { addCategory, setCategory } from './context/GetContext';

const CreateTaskButton: React.FC = () => {

    const [showDlg, setShowDlg] = useState(false)
    const [showDrp, setShowDrp] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const { dispatch } = GetUseContext()

    const title = useRef("")
    
    const form = useForm<z.infer<typeof CategoryValidation>>({
        resolver: zodResolver(CategoryValidation),
        defaultValues: {
            category: "",
        }
    })

    async function onSubmit(values: z.infer<typeof CategoryValidation>) {
        console.log(values)
        try {
            const result = await createCategory(values)
            dispatch(addCategory(result))
            console.log(result)
        } catch(error) {
            console.log(error)
        }
        form.reset()
    }

    const toggleDialog = () => {
        title.current = "Add a task"
        setShowDlg(!showDlg);
    }

    const toggleDropdown = () => {
        setShowDrp(!showDrp);
    }


    return (
        <main className='container'>
            <div className='flex justify-center items-center space-x-4 rounded-md'>
                <div>
                    <Button variant="outline" className='bg-white space-x-2'
                        onClick={toggleDialog}
                    >
                        <FileCheck2 size={15}/>
                        <h1>New Task</h1>
                    </Button>
                </div>
                <div>
                    <DropdownMenu open={showDrp} onOpenChange={setShowDrp}>
                        <DropdownMenuTrigger asChild className="bg-light-200 p-2 cursor-pointer">
                            <Button variant="outline" className="space-x-2 bg-white">
                                <span className="sr-only">Open menu</span>
                                <List size={15}/>
                                <h1>New Category</h1>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                            align="end" 
                            className="bg-white w-[280px] p-2"
                        >
                            <DropdownMenuSeparator />
                                <Form {...form} >
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex-1">
                                        <div >
                                            <CustomFormField 
                                                control={form.control} 
                                                fieldType={FormFieldType.CATEGORYINPUT}
                                                name="category"
                                                placeholder="Add new category"
                                            />
                                        </div>
                                        <SubmitButton isLoading={isLoading} click={toggleDropdown}>Add</SubmitButton>
                                    </form>
                                </Form>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {showDlg && (<CreateTaskDialog title={title} showDlg={showDlg} toggleDlg={toggleDialog} />)}
        </main>
    )
}

export default CreateTaskButton