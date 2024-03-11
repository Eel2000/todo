'use client'

import {ChangeEvent, useState} from "react";
import {TodoItem} from "@/app/lib/models/todoItem";

export default function Home() {
    const [todoItems, setTodos] = useState<TodoItem[]>([]);
    const [todoItem, setTodo] = useState<TodoItem>({id: 0, title: '', description: ''});

    const handleTodoChanges = (event: ChangeEvent<any>) => {
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
        <div className="flex content-stretch">
            <div className="m-4 ml-6 shadow-2xl w-full h-full rounded ">
                <h1 className="text-3xl text-center font-bold justify-center flex-auto">Page todo</h1>

                <form onSubmit={addTodItem} className="grid gap-3 justify-evenly m-4">
                    <div className="grid grid-cols-1">
                        <label className="mx-4">Title</label>
                        <input type="text" value={todoItem.title} onChange={handleTodoChanges}
                               placeholder="enter todo-item title" name="title"
                               className="mx-4 w-full focus:outline-blue-500 p-2 border border-blue-600 rounded"
                               required/>
                    </div>

                    <div className="grid grid-cols-1">
                        <label className="mx-4">description</label>
                        <textarea rows={5} name="description" value={todoItem.description} onChange={handleTodoChanges}
                               placeholder="enter todo-item descrition"
                               className="mx-4 w-full focus:outline-blue-500 p-2 border border-blue-600 rounded" required/>
                    </div>

                    <input type="submit" title="Save"
                           className="self-center mx-4 w-[100px] rounded-[8px] bg-blue-600 text-white font-mono p-2 content-center hover:bg-blue-700 active:bg-blue-600"/>
                </form>
            </div>
            <div className="mx-4">
                <h1 className="text-3xl text-center font-bold justify-center flex-auto">todos</h1>

                <ul role="list" className="p-6 divide-y divide-slate-200">
                    {
                        todoItems.map(todo =>

                            <li key={todo.id} className="flex justify-between py-4 first:pt-0 last:pb-0">
                                <div className="ml-3 overflow-hidden mx-4">
                                    <p className="text-sm font-medium text-slate-900">{todo.title}</p>
                                    <p className="text-sm text-slate-500 truncate">{todo.description}</p>
                                </div>
                                <div className="flex">
                                    <input type="checkbox"/>
                                    <button
                                        className="bg-blue-600 rounded-xl w-[90px] mx-4 text-white hover:bg-blue-700 active:border-2 border-b-blue-600">Delete
                                    </button>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}