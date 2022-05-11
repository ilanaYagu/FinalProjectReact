import React, { useContext, useState } from 'react';
import { ITask, TodoContextType } from '../../types/tasksTypes';
import Button from "@mui/material/Button";
import { Box, TextField } from '@mui/material';
import { TodoContext } from '../../context/tasksContext';
import AddTaskIcon from '@mui/icons-material/AddTask';
import FiltersTasksTable from '../../components/FiltersTasksTable/FiltersTasksTable';
import DeleteForm from '../../components/DeleteForn/DeleteForm';
import { columnsForTasksTable, customRenderers, otherColumnForTasksTable } from '../../constants/constants';
import ItemsTable from '../../components/ItemsTable/ItemsTable';
import DialogForm from '../../components/ItemUpdateAndCreateForm/ItemUpdateAndCreateForm';
import { DeleteItemFormContextType, ItemFormContextType } from '../../types/generalTypes';
import { ItemFormContext } from '../../context/itemFormContext';
import { DeleteItemFormContext } from '../../context/DeleteItemFormContext';
import './TasksManagementPage.css';

const TasksManagementPage = () => {
    const { tasks, deleteToDo } = useContext(TodoContext) as TodoContextType;
    const [dataTable, setDataTable] = useState<ITask[]>(tasks);
    const [search, setSearch] = useState<string>("");
    const { isFormDialogOpen, handleOpenCreateForm, handleOpenUpdateForm } = useContext(ItemFormContext) as ItemFormContextType;
    const { isDeleteDialogOpen, itemToDelete, handleOpenDeleteDialog, handleCloseDeleteDialog } = useContext(DeleteItemFormContext) as DeleteItemFormContextType;

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
                onClick={handleOpenCreateForm} startIcon={<AddTaskIcon />}>
                Add Task
            </Button>
            <FiltersTasksTable setTasks={setDataTable} />
            <h4>Total num of tasks: {tasks.length}</h4>

            {isFormDialogOpen &&
                <DialogForm type="Task" />}

            <ItemsTable
                headers={columnsForTasksTable}
                otherColumn={otherColumnForTasksTable}
                items={dataTable}
                customRenderers={customRenderers}
                deleteItem={handleOpenDeleteDialog}
                editItem={handleOpenUpdateForm}
                search={search}
                searchableProperties={["title"]}
            />
            {isDeleteDialogOpen &&
                <DeleteForm item={itemToDelete} handleDelete={handleDelete} />}
        </Box>
    );
};

export default TasksManagementPage;

