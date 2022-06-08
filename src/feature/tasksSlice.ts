import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpStatusType } from "../app/store-constants";
import { API_URL } from "../app/store-constants";
import { Task } from "../classes/Task";

interface TasksState {
    tasks: Task[];
    status: HttpStatusType;
    error?: string;
}

const initialTasksState: TasksState = {
    tasks: [],
    status: HttpStatusType.PENDING
};

const TASKS_API_URL = `${API_URL}tasks/`;

export const fetchTasks = createAsyncThunk<{ error: boolean; tasks: Task[]; }>('tasks/fetchTasks',
    async () => {
        const response = await fetch(`${TASKS_API_URL}all`,
            {
                method: 'GET',

            });
        return (await response.json());
    })

export const addTask = createAsyncThunk<{ error: boolean; task: Task; }, Task>('tasks/addTask',
    async (newTask: Task) => {
        const response = await fetch(`${TASKS_API_URL}add`,
            {
                method: 'POST',
                body: JSON.stringify({ task: newTask })

            });

        return (await response.json());
    })

export const updateTask = createAsyncThunk<{ error: boolean; task: Task; }, Task>('tasks/updateTask',
    async (task: Task) => {
        const response = await fetch(`${TASKS_API_URL}update`,
            {
                method: 'POST',
                body: JSON.stringify({ task })

            });
        return (await response.json());
    })

export const deleteTask = createAsyncThunk<{ error: boolean; _id: string; }, string>('tasks/deleteTask',
    async (_id: string) => {
        const response = await fetch(`${TASKS_API_URL}delete`,
            {
                method: 'POST',
                body: JSON.stringify({ _id })

            });
        return (await response.json());
    })

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state, action) => {
                state.status = HttpStatusType.PENDING;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                action.payload.tasks.forEach((taskFromResponse) => {
                    state.tasks.push(new Task(taskFromResponse));
                })
                state.status = HttpStatusType.FULFILLED;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(new Task(action.payload.task))
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => {
                    return task._id !== action.payload._id;
                });;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const taskToUpdate = action.payload.task;
                state.tasks = state.tasks.map((task) => {
                    if (task._id === taskToUpdate._id) {
                        return new Task(taskToUpdate);
                    }
                    return task;
                });;
            })
    }
})

export default tasksSlice.reducer;