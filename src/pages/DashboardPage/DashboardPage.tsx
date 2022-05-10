import React, { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable/GenericTable";
import { EventsContext } from "../../context/eventsContext";
import { TodoContext } from "../../context/tasksContext";
import { EventsContextType, IEvent } from "../../types/eventsTypes";
import { Actions, ITask, TodoContextType } from "../../types/tasksTypes";
import DeleteForm from "../../components/shared/DeleteForn/DeleteForm";
import DialogForm from "../../components/DialogForm/DialogForm";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { columnsForTodayTasksAndEventsTable, customRenderers, otherColumnForTodayTasksAndEventsTable } from "../../constants/constants";
import { Button, TextField } from "@mui/material";
import './DashboardPage.css'
import FiltersDashboardTable from "../../components/Dashboard/FiltersDashboardTable/FiltersDashboardTable";

export default function DashboardPage() {
    const { todos, deleteToDo } = React.useContext(TodoContext) as TodoContextType;
    const { events, deleteEvent } = React.useContext(EventsContext) as EventsContextType;
    const [data, setData] = React.useState<(ITask | IEvent)[]>([...events, ...todos]);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState<IEvent | ITask | "">("");
    const [itemToDelete, setItemToDelete] = useState<"" | IEvent | ITask>("");
    const [action, setAction] = useState(Actions.Create);
    const [search, setSearch] = React.useState("");

    useEffect(() => {
        setData([...events, ...todos])
    }, [todos, events])

    const handleCloseDialog = () => {
        setIsFormDialogOpen(false);
        setAction(Actions.Create);
        setItemToUpdate("");
    };

    const handleOpenDialog = (item: IEvent | ITask) => {
        setIsFormDialogOpen(true);
        setItemToUpdate(item);
        setAction(Actions.UPDATE);
    };

    const handleOpenDeleteDialog = (item: IEvent | ITask) => {
        setIsDeleteDialogOpen(true);
        setItemToDelete(item);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setItemToDelete("");
    };

    const handleDelete = (item: IEvent | ITask) => {
        "priority" in item ?
            deleteToDo(item.id) : deleteEvent(item.id);
        handleCloseDeleteDialog();
    }

    const handleOpenCreateDialog = () => {
        setIsFormDialogOpen(true);
    }

    return (
        <div className="App">
            <h1>Today Tasks and Events</h1>
            <TextField id="searchBarTaskAndEventForToday" label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />

            <Button
                variant="contained"
                id='addItemButton'
                onClick={handleOpenCreateDialog} startIcon={<AddTaskIcon />}>
                Add Item
            </Button><br />
            <FiltersDashboardTable setItems={setData} />
            <h4>You have {todos.length} tasks and {events.length} events for today</h4>
            <GenericTable
                headers={columnsForTodayTasksAndEventsTable}
                otherColumn={otherColumnForTodayTasksAndEventsTable}
                items={data}
                customRenderers={customRenderers}
                deleteItem={handleOpenDeleteDialog}
                editItem={handleOpenDialog}
                search={search}
                searchableProperties={["title"]}
            />
            {isFormDialogOpen &&
                <DialogForm choose={true} type={itemToUpdate ? "priority" in itemToUpdate ? "Task" : "Event" : "Task"} handleCloseDialog={handleCloseDialog} action={action} itm={itemToUpdate ? itemToUpdate : undefined} />}

            {isDeleteDialogOpen &&
                <DeleteForm handleDelete={handleDelete} handleCloseDeleteTaskDialog={handleCloseDeleteDialog} item={itemToDelete} />}

        </div>
    );
}
