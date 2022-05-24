import { useState, createContext, PropsWithChildren } from 'react';
import { Task } from '../classes/Task';
import { Priority, Status, TasksContextType } from '../types/tasksTypes';

export const TasksContext = createContext<TasksContextType>({
    tasks: [],
    addTask: () => { },
    deleteTask: () => { },
    updateTask: () => { },
    getTask: () => undefined
});

const TasksProvider = ({ children }: PropsWithChildren<{}>) => {
    let [tasks, setTasks] = useState<Task[]>([
        new Task("1", 'Do my final project', 'I need to fix some things.', "3d", Status.InProgress, Priority.Top, "", "", "2022-05-19 21:00"),
        new Task("2", 'Help my mom in the market', 'grab things, take all we need.', "1w", Status.Open, Priority.Low, "", "", ""),
        new Task("3983", 'Ask the teacher about the final project', 'The questions is on my notebook in my computer.', "3.5d", Status.Done, Priority.Top, "The teacher asked to send him the questions to his mail - and he answered the questions already!", "10d", "2022-05-12 19:00"),
        new Task("3432", 'Feed my cat', 'First I need to buy the food.', "2d", Status.Open, Priority.Regular, "", "", "2022-05-30 08:00")
    ]);
    const addTask = (newTask: Task): void => {
        const task = new Task(newTask.id, newTask.title, newTask.description,
            newTask.estimatedTime, newTask.status, newTask.priority, newTask.review, newTask.timeSpent, newTask.untilDate);
        setTasks([...tasks, task]);
    };
    const updateTask = (taskToUpdate: Task): void => {
        const tempTasks = tasks.map((task) => {
            if (task.id === taskToUpdate.id) {
                return new Task(taskToUpdate.id, taskToUpdate.title, taskToUpdate.description,
                    taskToUpdate.estimatedTime, taskToUpdate.status, taskToUpdate.priority, taskToUpdate.review, taskToUpdate.timeSpent, taskToUpdate.untilDate);
            }
            return task;
        });
        setTasks(tempTasks);
    };

    const deleteTask = (id: string): void => {
        const newTasksArr: Task[] = tasks.filter((task) => {
            return task.id !== id
        });
        setTasks(newTasksArr);
    }

    const getTask = (id: string): Task | undefined => {
        return tasks.find((task) => id === task.id);
    }

    return <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTask }}>{children}</TasksContext.Provider>;
};

export default TasksProvider;