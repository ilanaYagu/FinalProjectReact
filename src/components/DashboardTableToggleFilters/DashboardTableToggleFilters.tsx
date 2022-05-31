import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { BasicItem } from '../../classes/BasicItem';
import { Task } from '../../classes/Task';
import { Event } from '../../classes/Event';
import { PriorityType, StatusType } from '../../types/tasksTypes';

enum TodayTableFilterType {
    TasksOnly = "Tasks",
    EventsOnly = "Events",
    UncompletedTasks = "Uncompleted tasks",
    HighPriorityTasks = "High priority tasks"
}

interface DashboardTableFilter {
    active: boolean;
    filter: TodayTableFilterType;
    checkMatch: (item: BasicItem) => boolean;
}

interface DashboardTableToggleFiltersProps {
    setDataTable(newData: BasicItem[]): void;
    data: { tasks: Task[], events: Event[] };
}

const DashboardTableToggleFilters = ({ setDataTable, data }: DashboardTableToggleFiltersProps) => {
    const allTodayEventsAndTasks = [...data.tasks, ...data.events];
    const [filters, setFilters] = useState<DashboardTableFilter[]>([
        { active: false, filter: TodayTableFilterType.TasksOnly, checkMatch: (item: BasicItem) => item instanceof Task },
        { active: false, filter: TodayTableFilterType.EventsOnly, checkMatch: (item: BasicItem) => item instanceof Event },
        { active: false, filter: TodayTableFilterType.UncompletedTasks, checkMatch: (item: BasicItem) => item instanceof Task && item.status !== StatusType.Done },
        { active: false, filter: TodayTableFilterType.HighPriorityTasks, checkMatch: (item: BasicItem) => item instanceof Task && item.priority === PriorityType.Top }]);

    useEffect(() => {
        setDataTable(filteredData())
    }, [filters, data])

    const filteredData = (): BasicItem[] =>
        allTodayEventsAndTasks.filter(isItemMatchFilters)

    const isItemMatchFilters = (item: (Task | Event)): boolean => {
        let matchFilter = true;
        filters.map((filter: DashboardTableFilter) => {
            if (filter.active) {
                matchFilter = matchFilter && filter.checkMatch(item);
            }
        })
        return matchFilter;
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
                    <Button sx={{ mr: "1%", fontSize: "12px", height: "80%", backgroundColor: filter.active ? "#b599b0" : "#78536d" }} variant="contained"
                        onClick={() => onClickFilter(filter)}>{filter.filter}</Button>
                )
            }
        </Box>
    );
};

export default DashboardTableToggleFilters;

