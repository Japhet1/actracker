import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteTask } from './context/GetContext'
import GetUseContext from '@/components/context/GetUseContext';
import { deleteTaskDocument } from '@/lib/actions/user.action';

interface DeleteTaskProp {
    showDlg: boolean,
    toggleDeleteDlg: () => void
    deleteId: React.MutableRefObject<string | undefined>
}

const DeleteTask = ({showDlg, toggleDeleteDlg, deleteId}: DeleteTaskProp) => {
    
    const { dispatch } = GetUseContext()
    const onDeleteTask = async () => {
        try {
            const result = await deleteTaskDocument(deleteId.current!)
            console.log(result)
            dispatch(deleteTask(deleteId.current))
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <AlertDialog open={showDlg} onOpenChange={toggleDeleteDlg}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your task
                        and remove your data from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDeleteTask}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteTask