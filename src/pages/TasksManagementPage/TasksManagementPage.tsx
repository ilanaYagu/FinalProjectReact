import React, { useContext, useEffect, useState } from 'react';
import { Actions, IPriority, IStatus, ITask, TodoContextType } from '../../types/todoTypes';
import Button from "@mui/material/Button";
import TaskForm from '../../components/TaskForm/TaskForm';
import DeleteTaskForm from '../../components/DeleteTaskForn/DeleteTaskForm';
import { Box, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { TasksTable } from '../../components/TasksTable/TasksTable';
import { TodoContext } from '../../context/tasksContext';
import AddTaskIcon from '@mui/icons-material/AddTask';
import './TasksManagementPage.css';
import { priorityOptions, statusesOptions } from '../../constants/constants';

const TasksManagementPage = () => {
    const { todos, deleteToDo } = useContext(TodoContext) as TodoContextType;
    const [tasks, setTasks] = useState<ITask[]>(todos);
    const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
    const [isTaskFormDialogOpen, setIsTaskFormDialogOpen] = useState(false);
    const [idTaskToUpdate, setIdTaskToUpdate] = useState("");
    const [idTaskToDelete, setIdTaskToDelete] = useState("");
    const [action, setAction] = useState(Actions.Create);
    const [search, setSearch] = React.useState("");
    const [filters, setFilters] = useState({
        selectedFilterStatus: "",
        selectedFilterPriority: "",
    });


    useEffect(() => {
        setTasks(todos.filter((item: ITask) => {
            return (item.priority === filters.selectedFilterPriority || filters.selectedFilterPriority === "")
                && (item.status === filters.selectedFilterStatus || filters.selectedFilterStatus === "")
        }));
    }, [filters, todos])

    const handleOpenTaskDialog = () => {
        setIsTaskFormDialogOpen(true);
    };

    const handleCloseTaskDialog = () => {
        setIsTaskFormDialogOpen(false);
        setAction(Actions.Create);
        setIdTaskToUpdate("");
    };

    const handleOpenUpdateTaskDialog = (id: string) => {
        setIsTaskFormDialogOpen(true);
        setIdTaskToUpdate(id);
        setAction(Actions.UPDATE);
    };

    const handleOpenDeleteTaskDialog = (id: string) => {
        setIsDeleteTaskDialogOpen(true);
        setIdTaskToDelete(id);

    };

    const handleCloseDeleteTaskDialog = () => {
        setIsDeleteTaskDialogOpen(false);
        setIdTaskToDelete("");
    };

    const handleDeleteTask = (id: string) => {
        deleteToDo(id);
        handleCloseDeleteTaskDialog();
        setTasks(
            tasks.filter(task => task.id !== id)
        );
    }

    const renderQuickFilters = () => {
        return <Box display="flex">
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
    }



    return (
        <Box component="main">
            <h1>Tasks Management</h1>
            <TextField id="searchBarTask" label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />

            <Button
                variant="contained"
                id='addTaskButton'
                onClick={handleOpenTaskDialog} startIcon={<AddTaskIcon />}>
                Add Task
            </Button>
            {renderQuickFilters()}
            <h4>Total num of tasks: {todos.length}</h4>
            {isTaskFormDialogOpen &&
                <TaskForm handleCloseTaskDialog={handleCloseTaskDialog} action={action} idToUpdate={idTaskToUpdate} />}
            <TasksTable handleOpenDeleteTaskDialog={handleOpenDeleteTaskDialog} handleOpenUpdateTaskDialog={handleOpenUpdateTaskDialog} items={tasks} search={search} />
            {isDeleteTaskDialogOpen &&
                <DeleteTaskForm handleCloseDeleteTaskDialog={handleCloseDeleteTaskDialog} handleDeleteTask={handleDeleteTask} id={idTaskToDelete} />}
        </Box>
    );
};

export default TasksManagementPage;

