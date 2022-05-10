import React, { useContext, useState } from 'react';
import { Actions } from '../../types/tasksTypes';
import Button from "@mui/material/Button";
import { Box, TextField } from '@mui/material';
import DeleteForm from '../../components/shared/DeleteForn/DeleteForm';
import { columnsForEventsTable, columnsForTodayTasksAndEventsTable, customRenderers, customRenderersEvents, otherColumnForTasksTable } from '../../constants/constants';
import GenericTable from '../../components/GenericTable/GenericTable';
import './EventsManagementPage.css';
import { EventsContext } from '../../context/eventsContext';
import { EventsContextType, IEvent } from '../../types/eventsTypes';
import FiltersEventsTable from '../../components/Events/FilterEventsTable/FilterEventsTable';
import DialogForm from '../../components/DialogForm/DialogForm';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const EventsManagementPage = () => {
    const { events, deleteEvent } = useContext(EventsContext) as EventsContextType;
    const [tableData, setTableData] = useState<IEvent[]>(events);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState<IEvent | "">("");
    const [itemToDelete, setItemToDelete] = useState<"" | IEvent>("");
    const [action, setAction] = useState(Actions.Create);
    const [search, setSearch] = React.useState("");

    const handleCloseDialog = () => {
        setIsFormDialogOpen(false);
        setAction(Actions.Create);
        setItemToUpdate("");
    };

    const handleOpenDialog = (item: IEvent) => {
        setIsFormDialogOpen(true);
        setItemToUpdate(item);
        setAction(Actions.UPDATE);
    };

    const handleOpenCreateDialog = () => {
        setIsFormDialogOpen(true);
    }

    const handleOpenDeleteDialog = (item: IEvent) => {
        setIsDeleteDialogOpen(true);
        setItemToDelete(item);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setItemToDelete("");
    };
    const handleDelete = (item: IEvent) => {
        deleteEvent(item.id);
        handleCloseDeleteDialog();
    }


    return (
        <Box component="main">
            <h1>Events Management</h1>
            <TextField id="searchBarEvent" label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />

            <Button
                variant="contained"
                id='addTaskButton'
                onClick={handleOpenCreateDialog} startIcon={<CalendarMonthRoundedIcon />}>
                Add Event
            </Button>
            <FiltersEventsTable setEvents={setTableData} />
            <h4>Total num of events: {events.length}</h4>

            <GenericTable
                headers={columnsForEventsTable}
                items={tableData}
                customRenderers={customRenderersEvents}
                deleteItem={handleOpenDeleteDialog}
                editItem={handleOpenDialog}
                search={search}
                searchableProperties={["title"]}

            />

            {isFormDialogOpen &&
                <DialogForm type="Event" handleCloseDialog={handleCloseDialog} action={action} itm={itemToUpdate ? itemToUpdate : undefined} />}


            {isDeleteDialogOpen &&
                <DeleteForm handleCloseDeleteTaskDialog={handleCloseDeleteDialog} item={itemToDelete} handleDelete={handleDelete} />}
        </Box>
    );
};

export default EventsManagementPage;



