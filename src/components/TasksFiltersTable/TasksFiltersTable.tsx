import React, { useEffect, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Task } from '../../classes/Task';

interface TasksFiltersTableProps {
    setTasks(newTasks: Task[]): void;
    allData: Task[];
}
enum StatusFilter {
    Open = "Open",
    InProgress = "In Progress",
    Done = "Done",
    All = "All Statuses"
}

enum PriorityFilter {
    Top = "Top",
    Regular = "Regular",
    Low = "Low",
    All = "All Priorities"
}

interface TasksFilters {
    statusFilter: StatusFilter,
    priorityFilter: PriorityFilter
}

const TasksFiltersTable = ({ setTasks, allData }: TasksFiltersTableProps) => {
    const [filters, setFilters] = useState<TasksFilters>({
        statusFilter: StatusFilter.All,
        priorityFilter: PriorityFilter.All,
    });

    useEffect(() => {
        setTasks(filteredTasks());
    }, [filters, allData])

    const filteredTasks = (): Task[] => {
        return allData.filter((task: Task) => {
            return (filters.priorityFilter === PriorityFilter.All || task.priority as string === filters.priorityFilter)
                && (filters.statusFilter === StatusFilter.All || task.status as string === filters.statusFilter)
        })
    }

    return (
        <>
            <Select style={{ width: "12%", height: "40px", marginLeft: "9px", marginRight: "9px" }}
                value={filters.statusFilter} onChange={(event: SelectChangeEvent<string>) => setFilters({ ...filters, statusFilter: event.target.value as StatusFilter })}>
                {
                    Object.values(StatusFilter).map((value) => {
                        return <MenuItem value={value}>{value}</MenuItem>
                    })
                }
            </Select>

            <Select style={{ width: "12%", height: "40px", marginLeft: "9px", marginRight: "9px" }}
                value={filters.priorityFilter} onChange={(event: SelectChangeEvent<string>) => setFilters({ ...filters, priorityFilter: event.target.value as PriorityFilter })}>
                {
                    Object.values(PriorityFilter).map((value) => {
                        return <MenuItem value={value}>{value}</MenuItem>
                    })
                }
            </Select>
        </>
    );
};

export default TasksFiltersTable;

