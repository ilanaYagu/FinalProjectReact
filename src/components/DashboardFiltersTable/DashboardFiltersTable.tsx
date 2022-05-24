import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Basic } from '../../classes/Basic';
import { Task } from '../../classes/Task';
import { Event } from '../../classes/Event';
import { Priority, Status } from '../../types/tasksTypes';
import { makeStyles } from "@mui/styles";

enum FilterTodayTable {
    OnlyTasks = "Tasks",
    OnlyEvents = "Events",
    UncompletedTasks = "Uncompleted tasks",
    HighPriorityTasks = "High priority tasks"
}

interface FilterDashboardTable {
    active: boolean;
    filter: FilterTodayTable;
}

interface DashboardFiltersTableProps {
    setDataTable(newData: Basic[]): void;
    allData: Basic[];
}

const useStyles = makeStyles({
    filterButton: {
        marginRight: "1% !important",
        fontSize: "12px !important",
        height: "80%"
    },
    active: {
        backgroundColor: "#b599b0 !important"
    }
});

const DashboardFiltersTable = ({ setDataTable, allData }: DashboardFiltersTableProps) => {
    const classes = useStyles();
    const [filters, setFilters] = useState<FilterDashboardTable[]>([
        { active: false, filter: FilterTodayTable.OnlyTasks }, { active: false, filter: FilterTodayTable.OnlyEvents },
        { active: false, filter: FilterTodayTable.UncompletedTasks }, { active: false, filter: FilterTodayTable.HighPriorityTasks }]);

    useEffect(() => {
        setDataTable(filteredData())
    }, [filters, allData])

    const filteredData = (): Basic[] => {
        return allData.filter((item: Basic) => {
            return isItemMatchFilters(item);
        })
    }

    const isItemMatchFilters = (item: Basic): boolean => {
        let isMatch = true;
        filters.map((filter: FilterDashboardTable) => {
            if (filter.active) {
                switch (filter.filter) {
                    case FilterTodayTable.OnlyTasks: {
                        isMatch = item instanceof Task;
                        break;
                    }
                    case FilterTodayTable.OnlyEvents: {
                        isMatch = item instanceof Event;
                        break;
                    }
                    case FilterTodayTable.UncompletedTasks:
                        isMatch = item instanceof Task && item.status !== Status.Done;
                        break;
                    case FilterTodayTable.HighPriorityTasks:
                        isMatch = item instanceof Task && item.priority === Priority.Top;
                        break;
                }
            }
        })
        return isMatch;
    }

    const onClickFilter = (filter: FilterDashboardTable): void => {
        const newActiveStatus = !filter.active;
        const nfilters = filters.slice();
        nfilters.forEach((nfilter: FilterDashboardTable) => {
            nfilter.active = filter.filter === nfilter.filter ? newActiveStatus : false;
        });
        setFilters(nfilters);
    }

    return (
        <Box display="flex">
            {
                filters.map((filter: FilterDashboardTable) =>
                    <Button className={(filter.active ? classes.active + " " : "") + classes.filterButton} variant="contained"
                        onClick={() => onClickFilter(filter)}>{filter.filter}</Button>
                )
            }
        </Box>
    );
};

export default DashboardFiltersTable;

