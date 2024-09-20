"use client"

import { useRef, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, Trash2, MoveRight, MoveLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import CreateTaskDialog from './CreateTaskDialog';
import DeleteTask from './DeleteTask'



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

export const columns: ColumnDef<TableListProp>[] = [
    {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    // {
    //     accessorKey: "date",
    //     header: "Assigned Date",
    //     cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("date")}</div>
    //     ),
    // },
    {
        accessorKey: "task",
        header: "Task",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("task")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("category")}</div>
        ),
    },
    {
        accessorKey: "assigned",
        header: "Assign To",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("assigned")}</div>
        ),
    },
    {
        accessorKey: "date",
        header: "Submission Date",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("date")}</div>
        ),
    },
    // {
    //     accessorKey: "email",
    //     header: ({ column }) => {
    //     return (
    //         <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //         Email
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //         </Button>
    //     )
    //     },
    //     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    // },
    // {
    //     accessorKey: "amount",
    //     header: () => <div className="text-right">Amount</div>,
    //     cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue("amount"))

    //     // Format the amount as a dollar amount
    //     const formatted = new Intl.NumberFormat("en-US", {
    //         style: "currency",
    //         currency: "USD",
    //     }).format(amount)

    //     return <div className="text-right font-medium">{formatted}</div>
    //     },
    // },
    {
        id: "actions",
        header: "Action",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            const [showDlg, setShowDlg] = useState(false)
            const [deleteDlg, setDeleteDlg] = useState(false)

            const title = useRef("")

            const toggleShowDlg = () => {
                title.current = "Edit task"
                setShowDlg(!showDlg);
            }
            const toggleDeleteDlg = () => {
                setDeleteDlg(!deleteDlg);
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
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
                    {showDlg && (<CreateTaskDialog title={title} showDlg={showDlg} toggleDlg={toggleShowDlg} />)}
                    {deleteDlg && (<DeleteTask showDlg={deleteDlg} toggleDeleteDlg={toggleDeleteDlg} />)}
                </DropdownMenu>
            )
        },
    },
]

const TableList = ({ data }: { data: TableListProp[] }) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        // tableData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                {/* <Input
                    placeholder="Filter categories..."
                    value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("category")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white"
                /> */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="bg-white">
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                        {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="font-bold">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                        >
                        No results.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex flex-row space-x-2">
                <Button
                    
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="bg-white cursor-pointer"
                >
                    <span className="flex gap-x-2 items-center"><MoveLeft /> Previous</span>
                </Button>
                <Button
                    
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="bg-white cursor-pointer"
                >
                    <span className="flex gap-x-2 items-center">Next <MoveRight /></span>
                </Button>
            </div>
        </div>
        </div>
    )
}


export default TableList
