import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../classes/Task";
import { PriorityType, StatusType } from "../types/tasksTypes";

interface TasksState {
    tasks: Task[];
}

const initialTasksState: TasksState = {
    tasks: [
        new Task("1", 'Do my final project', 'I need to fix some things.', "3d", StatusType.InProgress, PriorityType.Top, "", "", "2022-05-29 21:00"),
        new Task("2", 'Help my mom in the market', 'grab things, take all we need.', "1w", StatusType.Open, PriorityType.Low, "", "", ""),
        new Task("3983", 'Ask the teacher about the final project', 'The questions is on my notebook in my computer.', "3.5d", StatusType.Done, PriorityType.Top, "The teacher asked to send him the questions to his mail - and he answered the questions already!", "10d", "2022-05-12 19:00"),
        new Task("3432", 'Feed my cat', 'First I need to buy the food.', "2d", StatusType.Open, PriorityType.Regular, "", "", "2022-05-30 08:00")
    ]
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>): void => {
            const newTask = action.payload;
            state.tasks.push(new Task(newTask.id, newTask.title, newTask.description,
                newTask.estimatedTime, newTask.status, newTask.priority, newTask.review, newTask.timeSpent, newTask.untilDate))
        },
        updateTask: (state, action: PayloadAction<Task>): void => {
            const taskToUpdate = action.payload;
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload.id) {
                    return new Task(taskToUpdate.id, taskToUpdate.title, taskToUpdate.description,
                        taskToUpdate.estimatedTime, taskToUpdate.status, taskToUpdate.priority, taskToUpdate.review, taskToUpdate.timeSpent, taskToUpdate.untilDate);
                }
                return task;
            });;
        },
        deleteTask: (state, action: PayloadAction<string>): void => {
            state.tasks = state.tasks.filter((task) => {
                return task.id !== action.payload
            });;
        }
    }
})


export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;