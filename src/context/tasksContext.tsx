import * as React from 'react';
import { TodoContextType, ITask } from '../types/todoTypes';

export const TodoContext = React.createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<React.ReactNode> = ({ children }) => {
    let [todos, setTodos] = React.useState<ITask[]>([
        {
            id: "1",
            title: 'post 1',
            description: 'this is a description',
            status: "Open",
            priority: "Low",
            estimatedTime: "3d"
        },
        {
            id: "2",
            title: 'post 2',
            description: 'this is a description',
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

        for (i = 0; i < todos.length; i++) {
            if (todos[i].id === todo.id) {
                todos[i] = todo;
                console.log(todos[i])
            }
        }
    };

    const deleteToDo = (id: string) => {
        todos.map((todo, index) => {
            if (todo.id === id) {
                todos.splice(index, 1);
            }
        })
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