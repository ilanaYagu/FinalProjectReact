import { Alert, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import DashboardTableToggleFilters from "../components/DashboardTableToggleFilters/DashboardTableToggleFilters";
import EventsTableFilters from "../components/EventsTableFilters/EventsTableFilters";
import TasksTableFilters from "../components/TasksTableFilters/TasksTableFilters";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ItemForm from "../components/ItemForm/ItemForm";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import DeleteForm from "../components/DeleteForm/DeleteForm";
import { TableHeaders, ItemType } from "../types/managementTableTypes";
import { makeStyles } from "@mui/styles";
import { Task } from "../classes/Task";
import { Event } from "../classes/Event";
import { BasicItem } from "../classes/BasicItem";
import SearchField from "../components/SearchField/SearchField";
import { HttpStatusType } from "../app/store-constants";

const searchableProperties: (keyof BasicItem)[] = ["title"];
const useStyles = makeStyles({
    filtersTitle: {
        marginTop: "0.7%",
        marginRight: "0.5%"
    },
    filterBox: {
        marginTop: "2%"
    }
});

interface ManagementPageProps {
    type?: ItemType;
    data: { tasks: Task[], events: Event[] };
    headers: TableHeaders<Task> | TableHeaders<Event>;
    loading: boolean;
}

const ManagementPage = ({ type, data, headers, loading }: ManagementPageProps) => {
    const classes = useStyles();
    const [filteredData, setFilteredData] = useState<BasicItem[]>([...data.tasks, ...data.events]);
    const [search, setSearch] = useState<string>("");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [itemToDelete, setItemToDelete] = useState<BasicItem | "">("");
    const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
    const [itemToUpdate, setItemToUpdate] = useState<BasicItem | "">("");

    const handleCloseItemForm = (): void => {
        setItemToUpdate("");
        setIsFormDialogOpen(false);
    }

    const handleOpenCreateForm = (): void => {
        setIsFormDialogOpen(true);
    }

    const handleOpenUpdateForm = (itemToUpdate: BasicItem): void => {
        setItemToUpdate(itemToUpdate);
        setIsFormDialogOpen(true);
    }

    const handleOpenDeleteDialog = (itemToDelete: BasicItem): void => {
        setIsDeleteDialogOpen(true);
        setItemToDelete(itemToDelete);
    }
    const handleCloseDeleteDialog = (): void => {
        setIsDeleteDialogOpen(false);
        setItemToDelete("");
    }

    const getFilters = () =>
        <Box display="flex" className={classes.filterBox}>
            <div className={classes.filtersTitle}>Quick Filters:</div>
            {
                !type ?
                    <DashboardTableToggleFilters setDataTable={setFilteredData} data={data} />
                    :
                    type === ItemType.Task ?
                        <TasksTableFilters setTasks={(tasks: Task[]) => setFilteredData(tasks)} data={data.tasks} />
                        :
                        <EventsTableFilters setEvents={(events: Event[]) => setFilteredData(events)} data={data.events} />
            }
        </Box>

    const getSubtitle = () =>
        type ?
            <h4>Total {type}s: {[...data.tasks, ...data.events].length}</h4>
            :
            <h4>Total Tasks: {data.tasks.length}, Total Events: {data.events.length}</h4>

    const getItemsView = () =>
        <>
            {
                loading ?
                    <Box sx={{ mt: "10%", textAlign: "center", color: "#F6E7E4" }}>
                        <h1>LOADING...</h1>
                    </Box>
                    :
                    <>
                        {getSubtitle()}
                        <ItemsTable headers={headers} items={filteredData} setItems={(newItems: Task[]) => setFilteredData(newItems)}
                            handleEditItem={handleOpenUpdateForm} handleDeleteItem={handleOpenDeleteDialog}
                            search={search} searchableProperties={searchableProperties} />
                    </>
            }
        </>

    return (
        <Box>
            <h1>{type ? `${type}s` : "Today"} Management</h1>
            <SearchField setSearch={setSearch} />
            <Button variant="contained" sx={{ fontWeight: 'bold', m: '1%' }} onClick={handleOpenCreateForm} startIcon={type === ItemType.Event ? <CalendarMonthRoundedIcon /> : <AddTaskIcon />}>
                Add {type}
            </Button>
            {getFilters()}
            {isFormDialogOpen &&
                <ItemForm type={type ? type : (itemToUpdate ? (itemToUpdate instanceof Task ? ItemType.Task : ItemType.Event) : ItemType.Task)} enableSwitchType={type ? false : true} open={isFormDialogOpen} handleClose={handleCloseItemForm} itemToUpdate={itemToUpdate ? itemToUpdate : undefined} />}
            {getItemsView()}
            {isDeleteDialogOpen && itemToDelete != "" &&
                <DeleteForm item={itemToDelete} open={isDeleteDialogOpen} handleClose={handleCloseDeleteDialog} />}

        </Box>
    );
};

export default ManagementPage;

