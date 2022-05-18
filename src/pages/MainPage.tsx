import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useMemo, useState } from "react";
import DashboardFiltersTable from "../components/DashboardFiltersTable/DashboardFiltersTable";
import EventsFiltersTable from "../components/EventsFiltersTable/EventsFiltersTable";
import TasksFiltersTable from "../components/TasksFiltersTable/TasksFiltersTable";
import { ItemFormContext } from "../context/itemFormContext";
import { TasksContextType } from "../types/tasksTypes";
import { EventsContextType } from "../types/eventsTypes";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ItemForm from "../components/ItemForm/ItemForm";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import { columnsForEventsTable, columnsForTasksTable, columnsForTodayTasksAndEventsTable, customRenderers, customRenderersEvents, otherColumnForTasksTable, otherColumnForTodayTasksAndEventsTable, Type } from "../constants/constants";
import DeleteForm from "../components/DeleteForm/DeleteForm";
import { DeleteItemFormContext } from "../context/deleteItemFormContext";
import { DeleteItemFormContextType, ItemFormContextType } from "../types/generalTypes";
import { EventsContext } from "../context/eventsContext";
import { TasksContext } from "../context/tasksContext";
import { makeStyles, createStyles } from "@mui/styles";
import { Task } from "../classes/Task";
import { Event } from "../classes/Event";
import { Basic } from "../classes/Basic";
import SearchField from "../components/SearchField/SearchField";
import { filterTodayItems } from "../utils/utils";

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

interface MainPageProps {
    type?: Type;
}

const MainPage = ({ type }: MainPageProps) => {
    const classes = useStyles();
    const { events } = useContext<EventsContextType>(EventsContext);
    const { tasks } = useContext<TasksContextType>(TasksContext);
    const todayTasks = filterTodayItems(tasks);
    const todayEvents = filterTodayItems(events);

    const [allDataTable, setAllDataTable] = useState<Basic[]>([]);
    const [dataTableToShow, setDataTableToShow] = useState<Basic[]>([]);
    const [search, setSearch] = useState<string>("");
    const { isFormDialogOpen, handleOpenCreateForm, handleOpenUpdateForm } = useContext<ItemFormContextType>(ItemFormContext);
    const { isDeleteDialogOpen, itemToDelete, handleOpenDeleteDialog } = useContext<DeleteItemFormContextType>(DeleteItemFormContext);

    useEffect(() => {
        if (!type) {
            const allData = [...todayTasks, ...todayEvents]
            setAllDataTable(allData)
            setDataTableToShow(allData)
        } else if (type === Type.Task) {
            setAllDataTable(tasks)
            setDataTableToShow(tasks)
        } else if (type === Type.Event) {
            setAllDataTable(events)
            setDataTableToShow(events)
        }
    }, [type])

    useEffect(() => {
        if (!type) {
            const allData = [...todayTasks, ...todayEvents]
            setAllDataTable(allData)
            setDataTableToShow(allData)
        } else if (type === Type.Event) {
            setAllDataTable(events)
            setDataTableToShow(events)
        }
    }, [events])

    useEffect(() => {
        if (!type) {
            const allData = [...todayTasks, ...todayEvents]
            setAllDataTable(allData)
            setDataTableToShow(allData)
        } else if (type === Type.Task) {
            setAllDataTable(tasks)
            setDataTableToShow(tasks)
        }
    }, [tasks])

    const getHeaders = () => {
        if (type === Type.Task) {
            return columnsForTasksTable;
        }
        else if (type === Type.Event) {
            return columnsForEventsTable;

        } else {
            return columnsForTodayTasksAndEventsTable;
        }
    }

    const getOtherColumns = () => {
        if (type === Type.Task) {
            return otherColumnForTasksTable;
        }
        else if (type === Type.Event) {
            return undefined;

        } else {
            return otherColumnForTodayTasksAndEventsTable;
        }
    }

    const renderFilters = () => {
        return <Box display="flex" style={{ marginTop: 20 }}>
            <div className={classes.filtersTitle}>Quick Filters:</div>
            {
                !type ?
                    <DashboardFiltersTable setDataTable={setDataTableToShow} allData={allDataTable} />
                    :
                    type === Type.Task ?
                        <TasksFiltersTable setTasks={(tasks: Task[]) => setDataTableToShow(tasks)} />
                        :
                        <EventsFiltersTable setEvents={(events: Event[]) => setDataTableToShow(events)} />
            }
        </Box>
    }

    const renderSubTitle = () => {
        return (type ?
            <h4 className={classes.subTitle}>Total num of {type.toLowerCase()}s: {allDataTable.length}</h4>
            :
            <h4 className={classes.subTitle}>Total num of tasks: {todayTasks.length} Total num of events: {todayEvents.length}</h4>
        )
    }

    return (
        <>
            <h1>{type ? type + "s" : "Events and Tasks For Today"} Management</h1>
            <SearchField search={search} setSearch={setSearch} />
            <Button variant="contained" className={classes.addButton} onClick={handleOpenCreateForm} startIcon={type === Type.Event ? <CalendarMonthRoundedIcon /> : <AddTaskIcon />}>
                Add {type}
            </Button>
            {renderFilters()}
            {renderSubTitle()}
            {isFormDialogOpen &&
                <ItemForm type={type ? type : Type.Task} enableSwitchType={type ? false : true} />}
            <ItemsTable headers={getHeaders()} otherColumn={getOtherColumns()} items={dataTableToShow}
                setItems={(newItems: Task[]) => setDataTableToShow(newItems)}
                customRenderers={type === Type.Event ? customRenderersEvents : customRenderers}
                deleteItem={handleOpenDeleteDialog} editItem={handleOpenUpdateForm} search={search} searchableProperties={["title"]} />
            {isDeleteDialogOpen && itemToDelete != "" &&
                <DeleteForm item={itemToDelete} />}
        </>
    );
};

export default MainPage;

