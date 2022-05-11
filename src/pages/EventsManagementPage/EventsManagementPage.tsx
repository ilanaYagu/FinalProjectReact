import React, { useContext, useState } from 'react';
import Button from "@mui/material/Button";
import { Box, TextField } from '@mui/material';
import DeleteForm from '../../components/DeleteForn/DeleteForm';
import { columnsForEventsTable, customRenderersEvents } from '../../constants/constants';
import ItemsTable from '../../components/ItemsTable/ItemsTable';
import { EventsContext } from '../../context/eventsContext';
import { EventsContextType, IEvent } from '../../types/eventsTypes';
import FiltersEventsTable from '../../components/FiltersEventsTable/FiltersEventsTable';
import DialogForm from '../../components/ItemUpdateAndCreateForm/ItemUpdateAndCreateForm';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { ItemFormContext } from '../../context/itemFormContext';
import { DeleteItemFormContextType, ItemFormContextType } from '../../types/generalTypes';
import { DeleteItemFormContext } from '../../context/deleteItemFormContext';
import './EventsManagementPage.css';

const EventsManagementPage = () => {
    const { events, deleteEvent } = useContext(EventsContext) as EventsContextType;
    const [tableData, setTableData] = useState<IEvent[]>(events);
    const [search, setSearch] = useState("");
    const { isFormDialogOpen, handleOpenCreateForm, handleOpenUpdateForm } = useContext(ItemFormContext) as ItemFormContextType;
    const { isDeleteDialogOpen, itemToDelete, handleOpenDeleteDialog, handleCloseDeleteDialog } = useContext(DeleteItemFormContext) as DeleteItemFormContextType;

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
                onClick={handleOpenCreateForm} startIcon={<CalendarMonthRoundedIcon />}>
                Add Event
            </Button>
            <FiltersEventsTable setEvents={setTableData} />
            <h4>Total num of events: {events.length}</h4>

            <ItemsTable
                headers={columnsForEventsTable}
                items={tableData}
                customRenderers={customRenderersEvents}
                deleteItem={handleOpenDeleteDialog}
                editItem={handleOpenUpdateForm}
                search={search}
                searchableProperties={["title"]}

            />

            {isFormDialogOpen &&
                <DialogForm type="Event" />}


            {isDeleteDialogOpen &&
                <DeleteForm item={itemToDelete} handleDelete={handleDelete} />}
        </Box>
    );
};

export default EventsManagementPage;



