'use client'

import {useState} from "react";

export default function Counter() {

    const [count, setCount] = useState(0)

    return (
        <div className="flex flex-col">
            <h1 className="text-center text-blue-500 text-4xl font-bold">the counter page is here to stay</h1>
            <h4 className="text-center text-blue-500 text-4xl font-normal m-4">count {count}</h4>
            <button onClick={() => setCount(count + 1)}
                    className="self-center w-[100px] rounded-[8px] bg-blue-600 text-white font-mono p-2 content-center active:bg-red-700 shadow-2xl hover:bg-blue-950">
                Count
            </button>
        </div>
    )
}