import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import DashboardTableToggleFilters from "../components/DashboardTableToggleFilters/DashboardTableToggleFilters";
import EventsTableFilters from "../components/EventsTableFilters/EventsTableFilters";
import TasksTableFilters from "../components/TasksTableFilters/TasksTableFilters";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ItemForm from "../components/ItemForm/ItemForm";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import { customRenderers, customRenderersEvents } from "../constants";
import DeleteForm from "../components/DeleteForm/DeleteForm";
import { OtherColumnProperties, TableHeaders, Type } from "../types/managementTableTypes";
import { makeStyles } from "@mui/styles";
import { Task } from "../classes/Task";
import { Event } from "../classes/Event";
import { Basic } from "../classes/Basic";
import SearchField from "../components/SearchField/SearchField";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenCreateForm } from "../feature/itemFormSlice";
import { AppDispatch, RootState } from "../app/store";

const searchableProperties: (keyof Basic)[] = ["title"];
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
    otherColumnOfTable?: OtherColumnProperties<Task> | OtherColumnProperties<Event>;
}

const ManagementPage = ({ type, allDataTable, todayEvents, todayTasks, headersOfTable, otherColumnOfTable }: ManagementPageProps) => {
    const classes = useStyles();
    const [dataTableToShow, setDataTableToShow] = useState<Basic[]>(allDataTable);
    const [search, setSearch] = useState<string>("");

    const { isDeleteDialogOpen, itemToDelete } = useSelector(
        (state: RootState) => state.deleteItemForm
    );
    const { isFormDialogOpen, itemToUpdate } = useSelector(
        (state: RootState) => state.itemForm
    );

    const dispatch = useDispatch<AppDispatch>();

    const renderFilters = () => {
        return <Box display="flex" className={classes.filterBox}>
            <div className={classes.filtersTitle}>Quick Filters:</div>
            {
                !type ?
                    <DashboardTableToggleFilters setDataTable={setDataTableToShow} allData={allDataTable} />
                    :
                    type === Type.Task ?
                        <TasksTableFilters setTasks={(tasks: Task[]) => setDataTableToShow(tasks)} allData={allDataTable as Task[]} />
                        :
                        <EventsTableFilters setEvents={(events: Event[]) => setDataTableToShow(events)} allData={allDataTable as Event[]} />
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
            <Button variant="contained" className={classes.addButton} onClick={() => dispatch(handleOpenCreateForm())} startIcon={type === Type.Event ? <CalendarMonthRoundedIcon /> : <AddTaskIcon />}>
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
                        search={search} searchableProperties={searchableProperties} />
                    :
                    <h1 className={classes.noItems}>NO ITEMS</h1>
            }

            {isDeleteDialogOpen && itemToDelete != "" &&
                <DeleteForm item={itemToDelete} />}
        </Box>
    );
};

export default ManagementPage;

