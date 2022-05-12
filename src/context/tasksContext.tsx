import * as React from 'react';
import { TasksContextType, ITask } from '../types/tasksTypes';

export const TasksContext = React.createContext<TasksContextType | null>(null);

const TasksProvider: React.FC<React.ReactNode> = ({ children }) => {
    let [tasks, setTasks] = React.useState<ITask[]>([
        {
            id: "1",
            title: 'Do my final project',
            description: 'I need to fix some things.',
            status: "In Progress",
            priority: "Top",
            estimatedTime: "3d",
            untilDate: "2022-05-12 21:00"
        },
        {
            id: "2",
            title: 'Help my mom in the market',
            description: 'grab things, take all we need.',
            status: "Open",
            priority: "Low",
            estimatedTime: "1w"
        },
        {
            id: "3983",
            title: 'ask the teacher about the final project',
            description: 'The questions is on my notebook in my computer.',
            status: "Done",
            priority: "Top",
            estimatedTime: "3.5d",
            untilDate: "2022-05-12 19:00",
            timeSpent: "10d",
            review: "The teacher asked to send him the questions to his mail - and he answered the questions already!"
        },
        {
            id: "3432",
            title: 'Feed my cat',
            description: 'First I need to buy the food.',
            status: "Open",
            priority: "Regular",
            estimatedTime: "2d",
            untilDate: "2022-05-30 08:00"
        }
    ]);
    const addTask = (newTask: ITask) => {
        setTasks([...tasks, newTask]);
    };
    const updateTask = (taskToUpdate: ITask) => {
        let i: number;
        const temp = [...tasks];
        for (i = 0; i < temp.length; i++) {
            if (temp[i].id === taskToUpdate.id) {
                temp[i] = taskToUpdate;
            }
        }
        setTasks(temp);
    };

    const deleteTask = (id: string) => {

        const newTasksArr: ITask[] = tasks.filter((task, index) => {
            return task.id !== id
        });
        setTasks(newTasksArr);
    }

    const getTask = (id: string): ITask | null => {
        for (const task of tasks) {
            if (task.id === id) {
                return task;
            }
        }
        return null;
    }


    return <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTask }}>{children}</TasksContext.Provider>;
};

export default TasksProvider;