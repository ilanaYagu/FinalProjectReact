import { IPriority, IStatus } from "../types/todoTypes";

export const columnsForTasksTable = [
    { label: "Type", accessor: "type", sortable: true },
    { label: "Priority", accessor: "priority", sortable: false },
    { label: "Title", accessor: "title", sortable: true },
    { label: "Status", accessor: "status", sortable: true },
    { label: "Other", accessor: "-", sortable: false },
    { label: "Actions", accessor: "-", sortable: false }
];


export const statusesOptions: IStatus[] = ['Open', 'In Progress', 'Done'];

export const priorityOptions: IPriority[] = ['Low', 'Top', 'Regular'];