import React, { useContext, useEffect, useState } from 'react';
import { Priority, Status, TasksFilter, TasksContextType } from '../../types/tasksTypes';
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { TasksContext } from '../../context/tasksContext';
import { priorityOptions, statusesOptions } from '../../constants/constants';
import { Task } from '../../classes/Task';

interface TasksFiltersTableProps {
    setTasks(newTasks: Task[]): void;
}

const TasksFiltersTable = ({ setTasks }: TasksFiltersTableProps) => {
    const { tasks } = useContext(TasksContext) as TasksContextType;
    const [filters, setFilters] = useState<TasksFilter>({
        selectedFilterStatus: "",
        selectedFilterPriority: "",
    });

    useEffect(() => {
        setTasks(filteredTasks());
    }, [filters, tasks])

    const filteredTasks = (): Task[] => {
        return tasks.filter((task: Task) => {
            return (filters.selectedFilterPriority === "" || task.priority === filters.selectedFilterPriority)
                && (filters.selectedFilterStatus === "" || task.status === filters.selectedFilterStatus)
        })
    }

    return (
        <>
            <Select
                style={{ width: "12%", height: "40px", marginLeft: "9px", marginRight: "9px" }}
                value={filters.selectedFilterStatus}
                onChange={(event: SelectChangeEvent<string>) => setFilters({ ...filters, selectedFilterStatus: event.target.value as Status })}
                name="status"
                displayEmpty
            >
                <MenuItem value="">All Statuses</MenuItem>
                {
                    statusesOptions.map((statusOption: Status) => <MenuItem value={statusOption}>{statusOption}</MenuItem>)
                }
            </Select>

            <Select
                style={{ width: "12%", height: "40px", marginLeft: "9px", marginRight: "9px" }}
                value={filters.selectedFilterPriority}
                onChange={(event: SelectChangeEvent<string>) => setFilters({ ...filters, selectedFilterPriority: event.target.value as Priority })}
                name="priority"
                displayEmpty
            >
                <MenuItem value="">All Priorities</MenuItem>
                {
                    priorityOptions.map((priorityOption: Priority) => <MenuItem value={priorityOption}>{priorityOption}</MenuItem>)
                }
            </Select>
        </>
    );
};

export default TasksFiltersTable;

