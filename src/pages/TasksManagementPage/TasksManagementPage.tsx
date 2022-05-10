import React, { useContext, useState } from 'react';
import { Actions, ITask, TodoContextType } from '../../types/tasksTypes';
import Button from "@mui/material/Button";
import { Box, TextField } from '@mui/material';
import { TodoContext } from '../../context/tasksContext';
import AddTaskIcon from '@mui/icons-material/AddTask';
import FiltersTasksTable from '../../components/Tasks/FilterTasksTable/FilterTasksTable';
import DeleteForm from '../../components/shared/DeleteForn/DeleteForm';
import { columnsForTasksTable, customRenderers, otherColumnForTasksTable } from '../../constants/constants';
import GenericTable from '../../components/GenericTable/GenericTable';
import './TasksManagementPage.css';
import DialogForm from '../../components/DialogForm/DialogForm';

const TasksManagementPage = () => {
    const { todos, deleteToDo } = useContext(TodoContext) as TodoContextType;
    const [tasks, setTasks] = useState<ITask[]>(todos);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState<ITask | "">("");
    const [itemToDelete, setItemToDelete] = useState<"" | ITask>("");
    const [action, setAction] = useState(Actions.Create);
    const [search, setSearch] = React.useState("");

    const handleCloseDialog = () => {
        setIsFormDialogOpen(false);
        setAction(Actions.Create);
        setItemToUpdate("");
    };

    const handleOpenDialog = (item: ITask) => {
        setIsFormDialogOpen(true);
        setItemToUpdate(item);
        setAction(Actions.UPDATE);
    };

    const handleOpenCreateDialog = () => {
        setIsFormDialogOpen(true);
    }

    const handleOpenDeleteDialog = (item: ITask) => {
        setIsDeleteDialogOpen(true);
        setItemToDelete(item);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setItemToDelete("");
    };
    const handleDelete = (item: ITask) => {
        deleteToDo(item.id);
        handleCloseDeleteDialog();
    }


    return (
        <Box component="main">
            <h1>Tasks Management</h1>
            <TextField id="searchBarTask" label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />

            <Button
                variant="contained"
                id='addTaskButton'
                onClick={handleOpenCreateDialog} startIcon={<AddTaskIcon />}>
                Add Task
            </Button>
            <FiltersTasksTable setTasks={setTasks} />
            <h4>Total num of tasks: {todos.length}</h4>
            {isFormDialogOpen &&
                <DialogForm type="Task" handleCloseDialog={handleCloseDialog} action={action} itm={itemToUpdate ? itemToUpdate : undefined} />}

            <GenericTable
                headers={columnsForTasksTable}
                otherColumn={otherColumnForTasksTable}
                items={tasks}
                customRenderers={customRenderers}
                deleteItem={handleOpenDeleteDialog}
                editItem={handleOpenDialog}
                search={search}
                searchableProperties={["title"]}

            />
            {isDeleteDialogOpen &&
                <DeleteForm handleCloseDeleteTaskDialog={handleCloseDeleteDialog} item={itemToDelete} handleDelete={handleDelete} />}
        </Box>
    );
};

export default TasksManagementPage;

