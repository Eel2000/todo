'use client'

import {ChangeEvent, FormEvent, useState} from "react";
import {TodoItem} from "@/app/lib/models/todoItem";

export default function Home() {
    const [todoItems, setTodos] = useState<TodoItem[]>([]);
    const [todoItem, setTodo] = useState<TodoItem>({id: 0, title: '', description: ''});

    const handleTodoChanges = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()


        setTodo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
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
                           placeholder="enter todo-item title" name="title" className="mx-4 focus:outline-blue-500 p-2"
                           required/>

                    <label className="mx-4">description</label>
                    <input type="text" name="description" value={todoItem.description} onChange={handleTodoChanges}
                           placeholder="enter todo-item title" className="mx-4 focus:outline-blue-500 p-2" required/>

                    <input type="submit" title="Save"
                           className="self-center w-[100px] rounded-[8px] bg-blue-600 text-white font-mono p-2 content-center active:bg-red-700 shadow-2xl hover:bg-blue-950"/>
                </form>
            </div>
            <div className="mx-4">
                <ul>
                    {
                        todoItems.map(i =>
                            <li key={i.id} className="text-blue-500 font-serif m-4">
                                <span className="mx-2 font-bold uppercase">{i.title} :</span>
                                <span>{i.description}</span>
                                <span className="mx-2">
                                    <button
                                        className="self-center w-[100px] rounded-[8px] bg-orange-500 text-white font-mono p-2 content-center active:bg-red-600 shadow-2xl hover:bg-red-950">delete</button>
                                </span>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}