'use client'

import {ChangeEvent, useState} from "react";
import {TodoItem} from "@/app/lib/models/todoItem";

export default function Home() {
    const [isAdding, setIsAdding] = useState<boolean>(true)
    const [todoItems, setTodos] = useState<TodoItem[]>([]);
    const [todoItem, setTodo] = useState<TodoItem>({
        id: 0,
        title: '',
        description: '',
        starting: '',
        ending: '',
        isDone: false
    });

    const handleTodoChanges = (event: ChangeEvent<any>) => {
        event.preventDefault()

        setTodo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const addTodItem = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (isAdding) {
            let todo: TodoItem = {
                id: todoItems.length + 1,
                title: todoItem.title,
                description: todoItem.description,
                starting: todoItem.starting,
                ending: todoItem.ending,
                isDone: false
            };

            let addTodoItemIn = [...todoItems, todo];
            setTodos(addTodoItemIn);

        } else {
            let fromList = todoItems.find(t => t.id == todoItem.id)
            if (fromList) {
                let update = [...todoItems];
                update[todoItems.indexOf(fromList)] = todoItem
                setTodos(update)
            }
        }
        
        setIsAdding(true)
        setTodo({id: 0, title: '', description: '', starting: '', ending: '', isDone: false})
    }

    const deleteTodoItem = (id: number) => {
        let todo = todoItems.find(t => t.id == id);
        if (!todo) {
            alert('todo not found')
        } else {
            if (confirm(`would you like to delete ${todo.title}`)) {
                let todos = [...todoItems.filter(t => t.id != id)]
                setTodos(todos)
            }
        }

    }

    const updateTodoItem = (todo: TodoItem) => {
        if (todo) {
            setIsAdding(false)
            setTodo(todo)
        }
    }

    const handleMarkAsDone = (id: number, event: ChangeEvent<any>) => {
        let todo = todoItems.find(t => t.id == id);
        if (!todo) {
            alert('todo not found')
        } else {
            if (confirm(`would you like to mark this ${todo.title} as done??`)) {
                todo.isDone = event.target.checked;

                let updated = [...todoItems];
                updated[todoItems.indexOf(todo)] = todo

                setTodos(updated);
            }
        }
    }


    return (
        <div className="grid-cols-2 overflow-hidden">
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

                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid grid-cols-1">
                            <label className="mx-4">Start</label>
                            <input type="date" name="starting" value={todoItem.starting}
                                   onChange={handleTodoChanges}
                                   className="mx-4 w-full focus:outline-blue-500 p-2 border border-blue-600 rounded"/>
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="mx-4">End</label>
                            <input type="date" name="ending" value={todoItem.ending}
                                   onChange={handleTodoChanges}
                                   className="mx-4 w-full focus:outline-blue-500 p-2 border border-blue-600 rounded"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1">
                        <label className="mx-4">description</label>
                        <textarea rows={5} name="description" value={todoItem.description} onChange={handleTodoChanges}
                                  placeholder="enter todo-item descrition"
                                  className="mx-4 w-full focus:outline-blue-500 p-2 border border-blue-600 rounded"
                                  required/>
                    </div>

                    <input type="submit" title="Save" value="Save"
                           className="self-center mx-4 my-4 w-[100px] rounded-[8px] bg-blue-600 text-white font-mono p-2 content-center hover:bg-blue-700 active:bg-blue-600"/>
                </form>
            </div>
            <div className="mx-4 overflow-y-scroll h-full w-full">
                <h1 className="text-3xl text-center font-bold justify-center flex-auto">todos</h1>

                <ul role="list" className="p-6 divide-y divide-slate-200">
                    {
                        todoItems.map(todo =>

                            <li key={todo.id} className="flex justify-between py-4 first:pt-0 last:pb-0">
                                <div className="ml-3 overflow-hidden mx-4">
                                    <p className="text-sm font-medium text-slate-900">{todo.title}</p>
                                    <p className="text-sm text-slate-500 truncate">{todo.description}</p>
                                    <p className="text-sm text-slate-500 truncate">
                                        <span>from: {todo.starting}</span>
                                        <span> end: {todo.ending}</span>
                                    </p>
                                </div>
                                <div className="flex">
                                    <input type="checkbox" name="isDone" title="mark as done" checked={todo.isDone}
                                           onChange={(e) => handleMarkAsDone(todo.id, e)}/>
                                    <button onClick={() => updateTodoItem(todo)}
                                            className="bg-blue-800 rounded-xl w-[85px] h-[80%] mx-4 text-white hover:bg-blue-900 active:border-2 border-blue-950">Edit
                                    </button>

                                    <button onClick={() => deleteTodoItem(todo.id)}
                                            className="bg-orange-600 rounded-xl w-[85px] h-[80%] text-white hover:bg-orange-700 active:border-2 border-b-orange-600">Delete
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