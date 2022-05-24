import { Status } from '../../types/tasksTypes';
import { Task } from '../../classes/Task';
import { Autocomplete, TextareaAutosize, TextField } from "@mui/material";
import { priorityOptions, statusesOptions } from "../../constants/constants";
import { getDateTextField } from './utils';

interface TaskFormProps {
    taskInputs: Omit<Task, "id" | "title" | "description">;
    setTaskInputs(newTaskInputs: Omit<Task, "id" | "title" | "description">): void;
    classField: string;
}

function TaskForm({ taskInputs, setTaskInputs, classField }: TaskFormProps) {

    const getAutoComplete = (field: keyof Omit<Task, "id" | "title" | "description">, options: string[], label: string) => {
        return <Autocomplete className={classField} freeSolo defaultValue={taskInputs[field]} options={options}
            onChange={(event: React.FormEvent) => {
                let newValue: string = (event.target as HTMLInputElement).textContent as string;
                newValue = !options.includes(newValue) ? options[0] : newValue;
                setTaskInputs({ ...taskInputs, [field]: newValue })
            }}
            renderInput={(params) => (
                <TextField {...params} label={label} InputProps={{ ...params.InputProps, type: 'search' }} />
            )}
        />
    }

    return <>
        {getAutoComplete("status", statusesOptions, "Status")}
        <TextField className={classField} label="Estimated Time" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, estimatedTime: event.target.value })} defaultValue={taskInputs.estimatedTime} />
        {getAutoComplete("priority", priorityOptions, "Priority")}
        {getDateTextField(classField, "Until Date", "untilDate", taskInputs, setTaskInputs)}
        {
            taskInputs.status === Status.Done &&
            <>
                Review: <TextareaAutosize minRows={3} maxRows={5} className={classField} placeholder="Enter review..." defaultValue={taskInputs.review}
                    onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, review: (event.target as HTMLInputElement).value })} required />
                <TextField className={classField} label="Time spent" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, timeSpent: event.target.value })} defaultValue={taskInputs.timeSpent} />
            </>
        }
    </>;
};

export default TaskForm;