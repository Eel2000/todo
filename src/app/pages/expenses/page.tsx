'use client'

import {useEffect, useState} from "react";
import {Expense} from "@/app/lib/models/expense";
import {getExpenses, removeExpense} from "@/app/lib/services/expenseService";
import {useRouter} from "next/navigation";
import {UUID} from "node:crypto";

export default function Page() {
    const router = useRouter()

    const [expenses, setExpenses] = useState<Expense[]>([])

    const getData = async () => {
        try {
            await getExpenses()
                .then(res => {
                    setExpenses([...res])
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData().catch(error => {
            console.log(error)
        })
    }, []);

    const gotToCreate = () => {
        router.push("/pages/expenses/create")
    }

    const gotToEdit = (id: UUID) => {
        router.push(`/pages/expenses/edit/${id}`)
    }

    const formatDate = (date: string) => {
        let converted = new Date(date)
        return converted.toLocaleDateString()
    }

    const getExpensesSum = () => {
        let sum = 0
        expenses.forEach(expense => {
            sum += expense.amount
        })

        return sum
    }


    const deleteExpense = async (id: UUID) => {
        if(window.confirm("would you like to remove the current record???")){
            removeExpense(id).then(() => {
                getData().catch((error) => console.log(error))
            }).catch((error) => console.log(error))
        }
    }

    return (
        <div className="grid-cols-1 m-4">
            <h1 className="text-blue-500 text-2xl text-center">Welcome to the weather forecast</h1>
            <div className="h-full flex gap-6">
                <button onClick={() => getData()}
                        className="bg-green-800 rounded w-[95px] h-[50px] mx-0 text-white hover:bg-green-900 active:border-2 border-green-950">
                    refresh
                </button>
                <button onClick={() => gotToCreate()}
                        className="bg-blue-800 rounded w-[95px] h-[50px] mx-0 text-white hover:bg-blue-900 active:border-2 border-blue-950">
                    Create
                </button>
            </div>
            <div className="relative overflow-x-auto my-4">
                <table className="table-auto w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Created At</th>
                        <th scope="col" className="px-6 py-3">Expense Amount($)</th>
                        <th scope="col" className="px-6 py-3">Summary</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        expenses.map(e =>
                            <tr key={e.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{formatDate(e.date)}</td>
                                <td className="px-6 py-4">{e.amount}</td>
                                <td scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{e.reason}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="hover:text-orange-400 hover:font-bold active:text-gray-500"
                                                onClick={() => gotToEdit(e.id)}>Edit
                                        </button>
                                        <button className="hover:text-red-600 hover:font-bold"
                                                onClick={() => deleteExpense(e.id)}>remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                    <tfoot>
                    <tr>
                        <td></td>
                        <td className="px-6 py-0 font-bold">Total :<span
                            className="text-gray-500"> {getExpensesSum()} $</span></td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}