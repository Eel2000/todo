'use client'

import {ChangeEvent, useState} from "react";
import {TodoItem} from "@/app/lib/models/todoItem";

export default function Home() {
    const [todoItems, setTodos] = useState<TodoItem[]>([]);
    const [todoItem, setTodo] = useState<TodoItem>({id: 0, title: '', description: ''});

    const handleTodoChanges = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setTodo({id: 0, title: event.target.value, description: ''})
    }

    const addTodItem = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const todo: TodoItem = {id: todoItems.length + 1, title: todoItem.title, description: todoItem.description};
        const addTodoItemIn = [...todoItems, todo];
        setTodos(addTodoItemIn);

        setTodo({id: 0, title: '', description: ''})
    }

    return (
        <div className="flex-col">
            <h1 className="text-3xl text-center font-bold justify-center flex-auto">Page todo</h1>
            <div>
                <form onSubmit={addTodItem}>
                    <label className="mx-4">Title</label>
                    <input type="text" value={todoItem.title} onChange={handleTodoChanges}
                           placeholder="enter todo-item title" className="mx-4 focus:outline-blue-500 p-2" required/>
                    <input type="submit" title="Save"
                           className="self-center w-[100px] rounded-[8px] bg-blue-600 text-white font-mono p-2 content-center active:bg-red-700 shadow-2xl hover:bg-blue-950"/>
                </form>
            </div>
            <div className="mx-4">
                <ul>
                    {
                        todoItems.map(i => <li key={i.id} className="text-blue-500 font-serif">{i.title}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}