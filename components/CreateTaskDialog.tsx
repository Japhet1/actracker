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
import CustomFormField from "./form/CustomFormFields"
import { FormFieldType } from "./form/CustomFormFields"
import SubmitButton from "./form/SubmitButton"
import { useState } from "react"
import { FormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/user.action"
import { useRouter } from "next/navigation"
import { SelectItem } from "./ui/select"
import { taskCategories, teamMembers } from "@/constant"


interface CreateTaskDialogProp {
    toggleDlg: () => void
    showDlg: boolean
    title: React.MutableRefObject<string>
}

const CreateTaskDialog = ({toggleDlg, showDlg, title}:CreateTaskDialogProp) => {


    const [ isLoading, setIsLoading ] = useState(false)

     // 1. Define your form.
    const form = useForm<z.infer<typeof FormValidation>>({
        resolver: zodResolver(FormValidation),
        defaultValues: {
            teamMember: "",
            taskCategory: "",
            createdAt: null,
            expireAt: null,
            description: ""
        },
    })
 
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof FormValidation>) {
        // setIsLoading(true)
        console.log(values)
        // try {
        //     const user = {
        //         username: values.username,
        //         email: values.email,
        //         password: values.password,
        //     };
        //     const newUser = await createUser(user);
        //     if (newUser) {
        //       router.push(`/users/${newUser.$id}/register`);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        // setIsLoading(false);
        toggleDlg()
    }

    return (
        <Dialog open={showDlg} onOpenChange={toggleDlg}>
            {/* <DialogTrigger asChild>
                <Button className='text-white bg-gray-800 space-x-2'>
                    <MdAddTask/>
                    <h1>New Task</h1>
                </Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                    <DialogTitle>{title.current}</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField 
                                control={form.control} 
                                fieldType={FormFieldType.SELECT}
                                name="teamMember"
                                // label="Team Member"
                                placeholder="Select a team member"
                            >
                                {teamMembers.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </CustomFormField>
                            <CustomFormField 
                                control={form.control} 
                                fieldType={FormFieldType.SELECT}
                                name="taskCategory"
                                // label="Category"
                                placeholder="Select a task category"
                            >
                                {taskCategories.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </CustomFormField>
                        </div>
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField 
                                control={form.control} 
                                fieldType={FormFieldType.DATE_PICKER}
                                name="createdAt"
                                // label="Assign Date"
                                iconSrc="/assets/icons/calendar-days.svg"
                                iconAlt="calendar"
                            />
                            <CustomFormField 
                                control={form.control} 
                                fieldType={FormFieldType.DATE_PICKER}
                                name="expireAt"
                                // label="Submission Date"
                                iconSrc="/assets/icons/calendar-days.svg"
                                iconAlt="calendar"
                            />
                        </div>
                        <CustomFormField 
                            control={form.control} 
                            fieldType={FormFieldType.TEXTAREA}
                            name="description"
                            // label="Description"
                            placeholder="description"
                        />
                        <SubmitButton isLoading={isLoading}>Save</SubmitButton>
                    </form>
                </Form>
                </div>
                {/* <DialogFooter>
                    <Button className="bg-light-200" type="submit">Save</Button>
                    <Button className="bg-light-200" type="submit">Cancel</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}

export default CreateTaskDialog
