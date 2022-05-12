import React, { useEffect, useState, useContext } from "react";
import { EventsContext } from "../../context/eventsContext";
import { TasksContext } from "../../context/tasksContext";
import { EventsContextType, IEvent } from "../../types/eventsTypes";
import { ITask, TasksContextType } from "../../types/tasksTypes";
import DeleteForm from "../../components/DeleteForn/DeleteForm";
import ItemUpdateAndCreateForm from "../../components/ItemUpdateAndCreateForm/ItemUpdateAndCreateForm";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { columnsForTodayTasksAndEventsTable, customRenderers, filterTodaysEvents, filterTodaysTasks, otherColumnForTodayTasksAndEventsTable } from "../../constants/constants";
import { Button, TextField } from "@mui/material";
import FiltersDashboardTable from "../../components/FiltersDashboardTable/FiltersDashboardTable";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import { ItemFormContext } from "../../context/itemFormContext";
import { DeleteItemFormContextType, ItemFormContextType } from "../../types/generalTypes";
import { DeleteItemFormContext } from "../../context/deleteItemFormContext";
import './DashboardPage.css';

const DashboardPage = () => {
    const { tasks, deleteTask } = useContext(TasksContext) as TasksContextType;
    let { events, deleteEvent } = useContext(EventsContext) as EventsContextType;
    const [data, setData] = useState<(ITask | IEvent)[]>([...filterTodaysEvents(events), ...filterTodaysTasks(tasks)]);
    const [search, setSearch] = useState<string>("");
    const { isFormDialogOpen, itemToUpdate, handleOpenCreateForm, handleOpenUpdateForm } = useContext(ItemFormContext) as ItemFormContextType;
    const { isDeleteDialogOpen, itemToDelete, handleOpenDeleteDialog, handleCloseDeleteDialog } = useContext(DeleteItemFormContext) as DeleteItemFormContextType;

    useEffect(() => {
        setData([...filterTodaysEvents(events), ...filterTodaysTasks(tasks)])
    }, [tasks, events])

    const handleDelete = (item: IEvent | ITask): void => {
        "priority" in item ?
            deleteTask(item.id) : deleteEvent(item.id);
        handleCloseDeleteDialog();
    }

    return (
        <div className="App">
            <h1>Today Tasks and Events</h1>
            <TextField id="searchBarTaskAndEventForToday" label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />

            <Button
                variant="contained"
                id='addItemButton'
                onClick={handleOpenCreateForm} startIcon={<AddTaskIcon />}>
                Add Item
            </Button><br />
            <FiltersDashboardTable setDataTable={setData} />
            <h4>You have {filterTodaysTasks(tasks).length} tasks and {filterTodaysEvents(events).length} events for today</h4>
            <ItemsTable
                headers={columnsForTodayTasksAndEventsTable}
                otherColumn={otherColumnForTodayTasksAndEventsTable}
                items={data}
                setItems={(newItems: (IEvent | ITask)[]) => setData(newItems)}
                customRenderers={customRenderers}
                deleteItem={handleOpenDeleteDialog}
                editItem={handleOpenUpdateForm}
                search={search}
                searchableProperties={["title"]}
            />
            {isFormDialogOpen &&
                <ItemUpdateAndCreateForm enableSwitchType={true} type={itemToUpdate ? "priority" in itemToUpdate ? "Task" : "Event" : "Task"} />}

            {isDeleteDialogOpen &&
                <DeleteForm handleDelete={handleDelete} item={itemToDelete} />}

        </div>
    );
}

export default DashboardPage;
