import { useEffect, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Task } from '../../classes/Task';

interface TasksTableFiltersProps {
    setTasks(newTasks: Task[]): void;
    data: Task[];
}

enum StatusFilterType {
    Open = "Open",
    InProgress = "In Progress",
    Done = "Done",
    All = "All Statuses"
}

enum PriorityFilterType {
    Top = "Top",
    Regular = "Regular",
    Low = "Low",
    All = "All Priorities"
}

interface TasksFilters {
    statusFilter: StatusFilterType,
    priorityFilter: PriorityFilterType
}

const TasksTableFilters = ({ setTasks, data }: TasksTableFiltersProps) => {
    const [filters, setFilters] = useState<TasksFilters>({
        statusFilter: StatusFilterType.All,
        priorityFilter: PriorityFilterType.All,
    });

    useEffect(() => {
        setTasks(filteredTasks());
    }, [filters, data])

    const filteredTasks = (): Task[] => {
        return data.filter((task: Task) => {
            return (filters.priorityFilter === PriorityFilterType.All || task.priority as string === filters.priorityFilter)
                && (filters.statusFilter === StatusFilterType.All || task.status as string === filters.statusFilter)
        })
    }

    return (
        <>
            <Select sx={{ m: "0.2%" }} size="small" value={filters.statusFilter} onChange={(event: SelectChangeEvent<string>) => setFilters({ ...filters, statusFilter: event.target.value as StatusFilterType })}>
                {
                    Object.values(StatusFilterType).map((value) => {
                        return <MenuItem value={value}>{value}</MenuItem>
                    })
                }
            </Select>

            <Select sx={{ m: "0.2%" }} size="small" value={filters.priorityFilter} onChange={(event: SelectChangeEvent<string>) => setFilters({ ...filters, priorityFilter: event.target.value as PriorityFilterType })}>
                {
                    Object.values(PriorityFilterType).map((value) => {
                        return <MenuItem value={value}>{value}</MenuItem>
                    })
                }
            </Select>
        </>
    );
};

export default TasksTableFilters;

