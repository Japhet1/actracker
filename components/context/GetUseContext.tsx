import React, { useContext } from 'react'
import { TaskContext } from './GetContext'

const GetUseContext = () => {
    
    const taskManagerContext = useContext(TaskContext)
    
    if(!taskManagerContext) {
        throw new Error ("GetUseContext must be use with TaskContextProvider")
    }
  
    return taskManagerContext
}

export default GetUseContext