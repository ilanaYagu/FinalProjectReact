import * as React from 'react';
import { TodoContextType, ITask } from '../types/tasksTypes';

export const TodoContext = React.createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<React.ReactNode> = ({ children }) => {
    let [tasks, setTasks] = React.useState<ITask[]>([
        {
            id: "1",
            title: 'Do my final project',
            description: 'I need to fix some things.',
            status: "In Progress",
            priority: "Top",
            estimatedTime: "3d",
            untilDate: "2022-05-11 21:00"
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
            id: "3",
            title: 'Go to the doctor for PCR',
            description: 'I have a meeting with the doctor before the PCR itself.',
            status: "Dnoe",
            priority: "Top",
            estimatedTime: "3d",
            untilDate: "2022-05-08 23:15"
        }
    ]);
    const addToDo = (newTodo: ITask) => {
        setTasks([...tasks, newTodo]);
    };
    const updateTodo = (todo: ITask) => {
        let i: number;
        const temp = [...tasks];

        for (i = 0; i < temp.length; i++) {
            if (temp[i].id === todo.id) {
                temp[i] = todo;
                console.log(temp[i])
            }
        }
        setTasks(temp);
    };

    const deleteToDo = (id: string) => {

        const newTodoArr: ITask[] = tasks.filter((task, index) => {
            return task.id !== id
        });
        setTasks(newTodoArr);
    }

    const getTask = (id: string): ITask | null => {
        for (const todo of tasks) {
            if (todo.id === id) {
                return todo;
            }
        }
        return null;
    }


    return <TodoContext.Provider value={{ tasks, addToDo, updateTodo, deleteToDo, getTask }}>{children}</TodoContext.Provider>;
};

export default TodoProvider;