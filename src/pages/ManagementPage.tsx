import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import DashboardFiltersTable from "../components/DashboardFiltersTable/DashboardFiltersTable";
import EventsFiltersTable from "../components/EventsFiltersTable/EventsFiltersTable";
import TasksFiltersTable from "../components/TasksFiltersTable/TasksFiltersTable";
import { ItemFormContext } from "../context/itemFormContext";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ItemForm from "../components/ItemForm/ItemForm";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import { customRenderers, customRenderersEvents, Type } from "../constants/constants";
import DeleteForm from "../components/DeleteForm/DeleteForm";
import { DeleteItemFormContext } from "../context/deleteItemFormContext";
import { DeleteItemFormContextType, ItemFormContextType, otherColumnProperties, TableHeaders } from "../types/generalTypes";
import { makeStyles } from "@mui/styles";
import { Task } from "../classes/Task";
import { Event } from "../classes/Event";
import { Basic } from "../classes/Basic";
import SearchField from "../components/SearchField/SearchField";

const useStyles = makeStyles({
    addButton: {
        fontWeight: 'bold !important',
        margin: '1% !important',
    },
    filtersTitle: {
        marginTop: "0.7%",
        marginRight: "0.5%"
    },
    filterBox: {
        marginTop: "2%"
    },
    noItems: {
        textAlign: "center",
        margin: "10%",
    }
});

interface ManagementPageProps {
    type?: Type;
    allDataTable: Basic[];
    todayEvents?: Basic[];
    todayTasks?: Basic[];
    headersOfTable: TableHeaders<Task> | TableHeaders<Event>;
    otherColumnOfTable?: otherColumnProperties<Task> | otherColumnProperties<Event>;
}

const ManagementPage = ({ type, allDataTable, todayEvents, todayTasks, headersOfTable, otherColumnOfTable }: ManagementPageProps) => {
    const classes = useStyles();
    const [dataTableToShow, setDataTableToShow] = useState<Basic[]>(allDataTable);
    const [search, setSearch] = useState<string>("");
    const { handleOpenCreateForm, itemToUpdate, isFormDialogOpen } = useContext<ItemFormContextType>(ItemFormContext);
    const { itemToDelete, isDeleteDialogOpen } = useContext<DeleteItemFormContextType>(DeleteItemFormContext);

    const renderFilters = () => {
        return <Box display="flex" className={classes.filterBox}>
            <div className={classes.filtersTitle}>Quick Filters:</div>
            {
                !type ?
                    <DashboardFiltersTable setDataTable={setDataTableToShow} allData={allDataTable} />
                    :
                    type === Type.Task ?
                        <TasksFiltersTable setTasks={(tasks: Task[]) => setDataTableToShow(tasks)} allData={allDataTable as Task[]} />
                        :
                        <EventsFiltersTable setEvents={(events: Event[]) => setDataTableToShow(events)} allData={allDataTable as Event[]} />
            }
        </Box>
    }

    const renderSubTitle = () => {
        return (type ?
            <h4>Total {type}s: {allDataTable.length}</h4>
            :
            <h4>Total Tasks: {todayTasks?.length}, Total Events: {todayEvents?.length}</h4>
        )
    }

    return (
        <Box>
            <h1>{type ? type + "s" : "Events and Tasks For Today"} Management</h1>
            <SearchField setSearch={setSearch} />
            <Button variant="contained" className={classes.addButton} onClick={handleOpenCreateForm} startIcon={type === Type.Event ? <CalendarMonthRoundedIcon /> : <AddTaskIcon />}>
                Add {type}
            </Button>
            {renderFilters()}
            {renderSubTitle()}
            {isFormDialogOpen &&
                <ItemForm type={type ? type : (itemToUpdate ? (itemToUpdate instanceof Task ? Type.Task : Type.Event) : Type.Task)} enableSwitchType={type ? false : true} />}

            {
                dataTableToShow.length > 0 ?
                    <ItemsTable headers={headersOfTable} otherColumn={otherColumnOfTable} items={dataTableToShow}
                        setItems={(newItems: Task[]) => setDataTableToShow(newItems)}
                        customRenderers={type === Type.Event ? customRenderersEvents : customRenderers}
                        search={search} searchableProperties={["title"]} />
                    :
                    <h1 className={classes.noItems}>NO ITEMS</h1>
            }

            {isDeleteDialogOpen && itemToDelete != "" &&
                <DeleteForm item={itemToDelete} />}
        </Box>
    );
};

export default ManagementPage;

