export const taskCategories = [
    "test1"
]

export const teamMembers = [
    "test1"
]

declare interface CategoryProps {
    id?: string,
    category: string
}

export type TableListProp = {
    id?: string | undefined,
    date?: string | undefined,
    task: string,
    description: string,
    status?: string | undefined,
    category?: string | undefined,
    assigned: string,
    user_id?: string | undefined,
}


export const categories: CategoryProps[] = [
    {
        id: "1",
        category: "test"
    },
    {
        id: "2",
        category: "test"
    },
    {
        id: "3",
        category: "test"
    }
]

export const tasks: TableListProp[] = [
    {
        id: "1",
        task: "test",
        description: "another",
        assigned: "john",
        date: "9-9-2024",
        status: "Pending",
        category: "Commerce"
    },
    {
        id: "2",
        task: "test",
        description: "another",
        assigned: "john",
        date: "9-9-2024",
        status: "Pending",
        category: "HR"
    },
    {
        id: "3",
        task: "test",
        description: "another",
        assigned: "john",
        date: "9-9-2024",
        status: "Pending",
        category: "Commerce"
    },
    {
        id: "4",
        task: "test",
        description: "another",
        assigned: "john",
        date: "9-9-2024",
        status: "Pending",
        category: "HR"
    },
    {
        id: "5",
        task: "test",
        description: "another",
        assigned: "john",
        date: "9-9-2024",
        status: "Pending",
        category: "Commerce"
    },
    {
        id: "6",
        task: "test",
        description: "another",
        assigned: "john",
        date: "9-9-2024",
        status: "Pending",
        category: "HR"
    },
    {
        id: "7",
        task: "test",
        description: "another",
        assigned: "john",
        date: "9-9-2024",
        status: "Pending",
        category: "Commerce"
    },
    {
        id: "8",
        task: "test",
        description: "another",
        assigned: "john",
        date: "9-9-2024",
        status: "Pending",
        category: "HR"
    },
    
]