import { Priority, Status } from '../../types/tasksTypes';
import { Task } from '../../classes/Task';
import { Autocomplete, TextareaAutosize, TextField } from "@mui/material";
import { priorityOptions, statusesOptions } from "../../constants/constants";

interface TaskFormProps {
    taskInputs: Omit<Task, "id" | "title" | "description">;
    setTaskInputs(newTaskInputs: Omit<Task, "id" | "title" | "description">): void;
    classField: string;
}

function TaskForm({ taskInputs, setTaskInputs, classField }: TaskFormProps) {

    const getAutoComplete = (onChange: (event: React.FormEvent) => void, defaultValue: string, options: string[], label: string) => {
        return <Autocomplete className={classField} freeSolo defaultValue={defaultValue} options={options}
            onChange={onChange}
            renderInput={(params) => (
                <TextField {...params} label={label} InputProps={{ ...params.InputProps, type: 'search' }} />
            )}
        />
    }

    return <>
        {getAutoComplete((event: React.FormEvent) => {
            let newStatus: Status = (event.target as HTMLInputElement).textContent as Status;
            newStatus = !statusesOptions.includes(newStatus) ? Status.Open : newStatus;
            setTaskInputs({ ...taskInputs, status: newStatus, review: newStatus !== "Done" ? "" : taskInputs.review })
        }, taskInputs.status, statusesOptions, "Status")}
        <TextField className={classField} label="Estimated Time" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, estimatedTime: event.target.value })} defaultValue={taskInputs.estimatedTime} />

        {getAutoComplete((event: React.FormEvent) => {
            let newPriority: Priority = (event.target as HTMLInputElement).textContent as Priority;
            newPriority = !priorityOptions.includes(newPriority) ? Priority.Low : newPriority;
            setTaskInputs({ ...taskInputs, priority: newPriority, untilDate: newPriority !== "Top" ? "" : taskInputs.untilDate })
        }, taskInputs.priority, priorityOptions, "Priority")}

        {
            taskInputs.priority === "Top" &&
            <TextField className={classField} label="Until Date" type="datetime-local" defaultValue={taskInputs.untilDate} sx={{ width: "85%" }}
                InputLabelProps={{ shrink: true }} value={taskInputs.untilDate?.replace(" ", "T")}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    setTaskInputs({ ...taskInputs, untilDate: event.target.value.replace("T", " ") });
                }} />
        }
        {
            taskInputs.status === "Done" &&
            <>
                Review: <TextareaAutosize className={classField} placeholder="Enter review..." defaultValue={taskInputs.review}
                    onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, review: (event.target as HTMLInputElement).value })}
                    style={{ width: 250, height: 100, marginTop: 10, overflow: 'auto', backgroundColor: 'inherit', color: "white" }} required />
                <TextField className={classField} label="Time spent" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, timeSpent: event.target.value })} defaultValue={taskInputs.timeSpent} />
            </>
        }
    </>;
};

export default TaskForm;