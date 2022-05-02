import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../context/tasksContext';
import { Actions, IPriority, ITask, TodoContextType, IStatus } from '../../types/todoTypes';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import validator from "validator";
import { Autocomplete } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './TaskForm.css';
import { priorityOptions, statusesOptions } from '../../constants/constants';

interface TaskFormProps {
    action: Actions.Create | Actions.UPDATE;
    idToUpdate?: string;
    handleCloseTaskDialog(): void;
}

const useStyles = makeStyles(() => ({
    dialog: {
        height: 600,
        width: 350
    }
}));

const TaskForm = ({ action, idToUpdate, handleCloseTaskDialog }: TaskFormProps) => {
    const classes = useStyles();
    const { addToDo, updateTodo, getTask } = useContext(TodoContext) as TodoContextType;

    let [taskInputs, setTaskInputs] = useState<ITask>({
        title: "",
        id: "",
        description: "",
        status: "Open",
        estimatedTime: "",
        priority: "Low",
        review: " ",
        timeSpent: "",
        untilDate: "",
    })

    let [dialogTitle, setDialogTitle] = useState("");
    let [buttonText, setButtonText] = useState("");
    let [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (action === Actions.Create) {
            setDialogTitle("Create Task");
            setButtonText("Create");
        }
        if (action === Actions.UPDATE && idToUpdate) {
            setButtonText("Update");
            let todo: ITask | null = getTask(idToUpdate);
            setDialogTitle("Update Task");
            setDisabled(true);
            if (todo) {
                setTaskInputs({ ...taskInputs, id: todo.id, title: todo.title, description: todo.description, status: todo.status, estimatedTime: todo.estimatedTime, priority: todo.priority, timeSpent: todo.timeSpent, untilDate: todo.untilDate, review: todo.review })
            }
        }
    }, []);


    const taskFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (
            validator.trim(taskInputs.id) === "" ||
            validator.trim(taskInputs.title) === "" ||
            validator.trim(taskInputs.description) === "" ||
            validator.trim(taskInputs.status) === ""
        ) {
            alert("Please fill the Required Fields");
        }
        if (action === Actions.Create) {
            addToDo(taskInputs);
        }
        if (action === Actions.UPDATE && idToUpdate) {
            updateTodo(taskInputs);
        }
        handleCloseTaskDialog();

    }


    return (
        <Dialog
            open={true}
            onClose={handleCloseTaskDialog}
            aria-labelledby="form-dialog-title"
            id="taskForm"
            style={{
                alignItems: "center"
            }}
            classes={{ paper: classes.dialog }}

        >
            <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
            <form onSubmit={taskFormSubmit} noValidate autoComplete="off">
                <DialogContent>
                    <DialogContentText> Task Details: </DialogContentText>

                    <div className="textFieldContainer">
                        <div>
                            <TextField id="id" label="Task ID" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, id: event.target.value })} defaultValue={taskInputs.id} disabled={disabled} required />
                        </div>
                        <div>
                            <TextField id="title" label="Title" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, title: event.target.value })} defaultValue={taskInputs.title} required />
                        </div>

                        <div>Description: <br />
                            <TextareaAutosize
                                id="description"
                                placeholder="Enter desc..."
                                defaultValue={taskInputs.description}
                                onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, description: (event.target as HTMLInputElement).value })}
                                style={{ width: 250, height: 100, marginTop: 10, overflow: 'auto', backgroundColor: 'inherit', color: "white" }}
                                required />
                        </div>
                        <div>
                            <Autocomplete
                                freeSolo
                                id="status"
                                defaultValue={taskInputs.status}
                                disableClearable
                                options={statusesOptions.map((option: IStatus) => option)}
                                onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, status: (event.target as HTMLInputElement).textContent as IStatus })}

                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Status"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <TextField id="estimatedTime" label="Estimated Time" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, estimatedTime: event.target.value })} defaultValue={taskInputs.estimatedTime} />
                        </div>

                        <div>
                            <Autocomplete
                                freeSolo
                                id="priority"
                                defaultValue={taskInputs.priority}
                                disableClearable
                                options={priorityOptions.map((option: IPriority) => option)}
                                onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, priority: (event.target as HTMLInputElement).textContent as IPriority })}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Priority"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {
                            taskInputs.priority === "Top" &&
                            <div>
                                <TextField
                                    id="untilDate"
                                    label="Until Date"
                                    type="datetime-local"
                                    defaultValue={taskInputs.untilDate}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={taskInputs.untilDate}

                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                        setTaskInputs({ ...taskInputs, untilDate: event.target.value });
                                    }}
                                />
                            </div>
                        }

                        {
                            taskInputs.status === "Done" &&
                            <>
                                <div>
                                    Review:
                                    <TextareaAutosize
                                        id="review"
                                        placeholder="Enter review..."
                                        defaultValue={taskInputs.review}
                                        onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, review: (event.target as HTMLInputElement).value })}
                                        style={{ width: 250, height: 100, marginTop: 10, overflow: 'auto', backgroundColor: 'inherit', color: "white" }}
                                        required />
                                </div>
                                <div>
                                    <TextField id="timeSpent" label="Time spent" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, timeSpent: event.target.value })} defaultValue={taskInputs.timeSpent} />
                                </div>
                            </>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTaskDialog} color="secondary" variant="outlined" >
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" variant="contained">
                        {buttonText}
                    </Button>
                </DialogActions>
            </form>

        </Dialog>
    );
};

export default TaskForm;