import React, { useContext, useEffect, useState } from 'react';
import { IPriority, IStatus, ITask, TodoContextType } from '../../../types/tasksTypes';
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { TodoContext } from '../../../context/tasksContext';
import { priorityOptions, statusesOptions } from '../../../constants/constants';

interface FiltersTasksTableProps {
    setTasks(newTasks: ITask[]): void;
}

const FiltersTasksTable = ({ setTasks }: FiltersTasksTableProps) => {
    const { todos } = useContext(TodoContext) as TodoContextType;

    const [filters, setFilters] = useState({
        selectedFilterStatus: "",
        selectedFilterPriority: "",
    });

    useEffect(() => {
        setTasks(todos.filter((item: ITask) => {
            return (item.priority === filters.selectedFilterPriority || filters.selectedFilterPriority === "")
                && (item.status === filters.selectedFilterStatus || filters.selectedFilterStatus === "")
        }));
    }, [todos])


    useEffect(() => {
        setTasks(todos.filter((item: ITask) => {
            return (item.priority === filters.selectedFilterPriority || filters.selectedFilterPriority === "")
                && (item.status === filters.selectedFilterStatus || filters.selectedFilterStatus === "")
        }));
        console.log("changed")
    }, [filters, todos])



    return (
        <Box display="flex" style={{ marginTop: 20 }}>
            <div>Quick Filters:</div>

            <Select
                style={{ width: "12%", height: "40px", marginLeft: "9px", marginRight: "9px" }}
                value={filters.selectedFilterStatus}
                onChange={(event: SelectChangeEvent<string>) => setFilters({ ...filters, selectedFilterStatus: event.target.value })}
                name="status"
                displayEmpty
            >
                <MenuItem value="">All Statuses</MenuItem>
                {
                    statusesOptions.map((statusOption: IStatus) => <MenuItem value={statusOption}>{statusOption}</MenuItem>)
                }
            </Select>

            <Select
                style={{ width: "12%", height: "40px", marginLeft: "9px", marginRight: "9px" }}
                value={filters.selectedFilterPriority}
                onChange={(event: SelectChangeEvent<string>) => setFilters({ ...filters, selectedFilterPriority: event.target.value })}
                name="priority"
                displayEmpty
            >
                <MenuItem value="">All Priorities</MenuItem>
                {
                    priorityOptions.map((priorityOption: IPriority) => <MenuItem value={priorityOption}>{priorityOption}</MenuItem>)
                }
            </Select>
        </Box>
    );
};

export default FiltersTasksTable;

