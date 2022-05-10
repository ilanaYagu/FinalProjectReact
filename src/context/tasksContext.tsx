import * as React from 'react';
import { TodoContextType, ITask } from '../types/tasksTypes';

export const TodoContext = React.createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<React.ReactNode> = ({ children }) => {
    let [todos, setTodos] = React.useState<ITask[]>([
        {
            id: "1",
            title: 'Do my final project',
            description: 'I need to fix some things.',
            status: "In Progress",
            priority: "Top",
            estimatedTime: "3d",
            untilDate: "2022-06-24 21:00"
        },
        {
            id: "2",
            title: 'Help my mom in the market',
            description: 'grab things, take all we need.',
            status: "Open",
            priority: "Low",
            estimatedTime: "1w"
        },
    ]);
    const addToDo = (newTodo: ITask) => {
        setTodos([...todos, newTodo]);
    };
    const updateTodo = (todo: ITask) => {
        let i: number;
        const temp = [...todos];

        for (i = 0; i < temp.length; i++) {
            if (temp[i].id === todo.id) {
                temp[i] = todo;
                console.log(temp[i])
            }
        }
        setTodos(temp);
    };

    const deleteToDo = (id: string) => {

        const newTodoArr: ITask[] = todos.filter((todo, index) => {
            return todo.id !== id
        });
        setTodos(newTodoArr);
    }

    const getTask = (id: string): ITask | null => {
        for (const todo of todos) {
            if (todo.id === id) {
                return todo;
            }
        }
        return null;
    }


    return <TodoContext.Provider value={{ todos, addToDo, updateTodo, deleteToDo, getTask }}>{children}</TodoContext.Provider>;
};

export default TodoProvider;