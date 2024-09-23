"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdAddTask } from "react-icons/md";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import CustomFormField from "./CustomFormFields"
import { FormFieldType } from "./CustomFormFields"
import SubmitButton from "./SubmitButton"
import { useState } from "react"
import { FormValidation } from "@/lib/validation"
// import { createUser, updateTask } from "@/lib/actions/user.action"
import { useRouter } from "next/navigation"
import { SelectItem } from "../ui/select"
import { taskCategories, teamMembers } from "@/constant"
import { createTask, updateTask } from "@/lib/actions/user.action"
import GetUseContext from '@/components/context/GetUseContext';
import { addTask, editTask } from "../context/GetContext"
import { parseStringify } from "@/lib/utils"
import { CardListProp } from "../view/CardList"


interface CreateTaskDialogProp {
    toggleDlg: () => void
    showDlg: boolean
    title: React.MutableRefObject<string>
    editData?: React.MutableRefObject<CardListProp | undefined>
}

const CreateTaskDialog = ({toggleDlg, showDlg, title, editData}:CreateTaskDialogProp) => {


    const [ isLoading, setIsLoading ] = useState(false)
    const { state, dispatch } = GetUseContext()

    // console.log("document id", editData?.current?.id)
    const users =  state.user.filter(item => item.name !== "Admin").map(item => item.name) 


     // 1. Define your form.
    const form = useForm<z.infer<typeof FormValidation>>({
        resolver: zodResolver(FormValidation),
        defaultValues: {
            task: title.current !== "Edit task" ?   "" : editData?.current?.task ,
            assignTo: title.current !== "Edit task" ?   "" : editData?.current?.assign ,
            category: title.current !== "Edit task" ?   "" : editData?.current?.category ,
            assignDate: title.current !== "Edit task" ?   null : editData?.current?.createdAt ,
            submissionDate: title.current !== "Edit task" ?   null : editData?.current?.submissionDate ,
            description: title.current !== "Edit task" ?   "" : editData?.current?.description ,
            status: "" ,
            userId:  "",
        },
    })

    const userId = sessionStorage.getItem('userId');
 
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof FormValidation>) {
        // setIsLoading(true)
        try {
            if (title.current == "Edit task") {
                // const result = await updateTask( editData?.current?.id, )
                const data = {
                    $id: editData?.current?.id,
                    task: values.task,
                    assignTo: values.assignTo,
                    category: values.category,
                    assignDate: values.assignDate,
                    submissionDate: values.submissionDate,
                    description: values.description,
                    status: "Pending",
                    userId: userId
                };
                const result = await updateTask(data.$id!, data)
                dispatch(editTask(result))
                // console.log(values)
            } else {
                const data = {
                    task: values.task,
                    assignTo: values.assignTo,
                    category: values.category,
                    assignDate: values.assignDate,
                    submissionDate: values.submissionDate,
                    description: values.description,
                    status: "Pending",
                    userId: userId
                };
                // console.log(data)
                const result = await createTask(data)
                console.log(result)
                dispatch(addTask(result))
                // console.log(result)
            }
            
        } catch(error) {
            console.log(error)
        }
        form.reset()
        toggleDlg()
    }

    return (
        <Dialog open={showDlg} onOpenChange={toggleDlg}>
            <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                    <DialogTitle>{title.current}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                        <CustomFormField 
                            control={form.control} 
                            fieldType={FormFieldType.INPUT}
                            name="task"
                            placeholder="Task"
                        />
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField 
                                control={form.control} 
                                fieldType={FormFieldType.SELECT}
                                name="assignTo"
                                placeholder="Select a team member"
                            >
                                {users.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </CustomFormField>
                            <CustomFormField 
                                control={form.control} 
                                fieldType={FormFieldType.SELECT}
                                name="category"
                                placeholder="Select a task category"
                            >
                                {state.category.map((type) => (
                                    <SelectItem key={type.$id} value={type.category}>
                                        {type.category}
                                    </SelectItem>
                                ))}
                            </CustomFormField>
                        </div>
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField 
                                control={form.control} 
                                fieldType={FormFieldType.DATE_PICKER}
                                name="assignDate"
                                iconSrc="/assets/icons/calendar-days.svg"
                                iconAlt="calendar"
                            />
                            <CustomFormField 
                                control={form.control} 
                                fieldType={FormFieldType.DATE_PICKER}
                                name="submissionDate"
                                iconSrc="/assets/icons/calendar-days.svg"
                                iconAlt="calendar"
                            />
                        </div>
                        <CustomFormField 
                            control={form.control} 
                            fieldType={FormFieldType.TEXTAREA}
                            name="description"
                            placeholder="description"
                        />
                        <SubmitButton isLoading={isLoading}>Save</SubmitButton>
                    </form>
                </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTaskDialog
