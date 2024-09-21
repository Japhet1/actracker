import { Value } from "@radix-ui/react-select"
import { Children, createContext, ReactNode, useReducer } from "react"
import { Models } from 'node-appwrite';


const SET_CATEGORY = "SET_CATEGORY"
const ADD_CATEGORY = "ADD_CATEGORY"
const EDIT_CATEGORY = "EDIT_CATEGORY"
const DELETE_CATEGORY = "DELETE_CATEGORY"
const SET_TASK = "SET_TASK"
const ADD_TASK = "ADD_TASK"
const EDIT_TASK = "EDIT_TASK"
const DELETE_TASK = "DELETE_TASK"
const SET_USERS = "SET_USERS"

interface Category {
    $id?: string
    category: string
}

interface Task {
    $id?:string
    userId: string | null;
    task: string;
    description: string;
    assignTo: string;
    assignDate: Date | null;
    submissionDate: Date | null;
    status: string
    category: string
}

interface State {
    category: Category[]
    task: Task[]
    user: string[]
}

interface Action {
    type: string,
    payload?: any
}

interface AppContextProp {
    state: State,
    dispatch: React.Dispatch<Action>
}

export const setUser = (users: Models.User<Models.Preferences>[] | undefined): Action => ({
    type: SET_USERS,
    payload: users
})
export const setCategory = (categories: Models.Document[] | undefined): Action => ({
    type: SET_CATEGORY,
    payload: categories
})
export const addCategory = (categories: Models.Document): Action => ({
    type: ADD_CATEGORY,
    payload: categories
})
export const editCategory = (categories: Category): Action => ({
    type: SET_TASK,
    payload: categories
})
export const deleteCategory = (categoryId: string | undefined) => ({
    type: DELETE_CATEGORY,
    payload: categoryId
})

export const setTask = (task: Models.Document[] | undefined): Action => ({
    type: SET_TASK,
    payload: task
})
export const addTask = (task: Models.Document): Action => ({
    type: ADD_TASK,
    payload: task
})
export const editTask = (task: Models.Document | undefined): Action => ({
    type: EDIT_TASK,
    payload: task
})
export const deleteTask = (taskId: string | undefined) => ({
    type: DELETE_TASK,
    payload: taskId
})


const initialState: State = {
    category: [],
    task: [],
    user: []
}

const contextReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case SET_USERS: 
            return { ...state, user: action.payload}
        case SET_CATEGORY: 
            return { ...state, category: action.payload}
        case ADD_CATEGORY:
            return { ...state, category: [...state.category, action.payload]}
        case DELETE_CATEGORY:
            return { ...state, category: state.category.filter(category => category.$id !== action.payload)}
        case SET_TASK: 
            return { ...state, task: action.payload}
        case ADD_TASK:
            return { ...state, task: [...state.task, action.payload]}
        case EDIT_TASK: 
            return { ...state, task: state.task.map(task => task.$id === action.payload.$id ? action.payload : task)}
        case DELETE_TASK:
            return { ...state, task: state.task.filter(task => task.$id !== action.payload)}
        default:
            return state
    }
}

export const TaskContext = createContext<AppContextProp | undefined>(undefined)

interface AppProviderProps {
    children: ReactNode;
  }
  
  export const TaskContextProvider = ({ children }: AppProviderProps) => {
    const [state, dispatch] = useReducer(contextReducer, initialState);
  
    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children} 
        </TaskContext.Provider>
    )
  }