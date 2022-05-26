import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Basic } from '../../classes/Basic';
import { Task } from '../../classes/Task';
import { Event } from '../../classes/Event';
import { Priority, Status } from '../../types/tasksTypes';
import { makeStyles } from "@mui/styles";

enum TodayTableFilter {
    OnlyTasks = "Tasks",
    OnlyEvents = "Events",
    UncompletedTasks = "Uncompleted tasks",
    HighPriorityTasks = "High priority tasks"
}

interface DashboardTableFilter {
    active: boolean;
    filter: TodayTableFilter;
}

interface DashboardTableToggleFiltersProps {
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

const DashboardTableToggleFilters = ({ setDataTable, allData }: DashboardTableToggleFiltersProps) => {
    const classes = useStyles();
    const [filters, setFilters] = useState<DashboardTableFilter[]>([
        { active: false, filter: TodayTableFilter.OnlyTasks }, { active: false, filter: TodayTableFilter.OnlyEvents },
        { active: false, filter: TodayTableFilter.UncompletedTasks }, { active: false, filter: TodayTableFilter.HighPriorityTasks }]);

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
        filters.map((filter: DashboardTableFilter) => {
            if (filter.active) {
                switch (filter.filter) {
                    case TodayTableFilter.OnlyTasks: {
                        isMatch = item instanceof Task;
                        break;
                    }
                    case TodayTableFilter.OnlyEvents: {
                        isMatch = item instanceof Event;
                        break;
                    }
                    case TodayTableFilter.UncompletedTasks:
                        isMatch = item instanceof Task && item.status !== Status.Done;
                        break;
                    case TodayTableFilter.HighPriorityTasks:
                        isMatch = item instanceof Task && item.priority === Priority.Top;
                        break;
                }
            }
        })
        return isMatch;
    }

    const onClickFilter = (filter: DashboardTableFilter): void => {
        const newActiveStatus = !filter.active;
        const nfilters = filters.slice();
        nfilters.forEach((nfilter: DashboardTableFilter) => {
            nfilter.active = filter.filter === nfilter.filter ? newActiveStatus : false;
        });
        setFilters(nfilters);
    }

    return (
        <Box display="flex">
            {
                filters.map((filter: DashboardTableFilter) =>
                    <Button className={(filter.active ? classes.active + " " : "") + classes.filterButton} variant="contained"
                        onClick={() => onClickFilter(filter)}>{filter.filter}</Button>
                )
            }
        </Box>
    );
};

export default DashboardTableToggleFilters;

