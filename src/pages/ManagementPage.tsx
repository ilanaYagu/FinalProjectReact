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
import { makeStyles, createStyles } from "@mui/styles";
import { Task } from "../classes/Task";
import { Event } from "../classes/Event";
import { Basic } from "../classes/Basic";
import SearchField from "../components/SearchField/SearchField";

const useStyles = makeStyles(() => createStyles({
    addButton: {
        fontWeight: 'bold !important',
        margin: '2% !important'
    },
    subTitle: {
        color: "#e4dce1"
    },
    filtersTitle: {
        marginTop: "0.5%",
        marginRight: "0.5%"
    }
}));

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
    const { handleOpenCreateForm, handleOpenUpdateForm, itemToUpdate } = useContext<ItemFormContextType>(ItemFormContext);
    const { itemToDelete, handleOpenDeleteDialog } = useContext<DeleteItemFormContextType>(DeleteItemFormContext);

    const renderFilters = () => {
        return <Box display="flex" style={{ marginTop: 20 }}>
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
            <h4 className={classes.subTitle}>Total num of {type.toLowerCase()}s: {allDataTable.length}</h4>
            :
            <h4 className={classes.subTitle}>Total num of tasks: {todayTasks?.length} Total num of events: {todayEvents?.length}</h4>
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

            <ItemForm type={type ? type : (itemToUpdate ? (itemToUpdate instanceof Task ? Type.Task : Type.Event) : Type.Task)} enableSwitchType={type ? false : true} />

            <ItemsTable headers={headersOfTable} otherColumn={otherColumnOfTable} items={dataTableToShow}
                setItems={(newItems: Task[]) => setDataTableToShow(newItems)}
                customRenderers={type === Type.Event ? customRenderersEvents : customRenderers}
                deleteItem={handleOpenDeleteDialog} editItem={handleOpenUpdateForm} search={search} searchableProperties={["title"]} />

            {itemToDelete != "" &&
                <DeleteForm item={itemToDelete} />}
        </Box>
    );
};

export default ManagementPage;

