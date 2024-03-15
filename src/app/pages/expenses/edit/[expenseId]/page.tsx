'use client'

import {UUID} from "node:crypto";
import {Expense} from "@/app/lib/models/expense";
import {ChangeEvent, useEffect, useState} from "react";
import {editExpense, getExpense} from "@/app/lib/services/expenseService";
import {useRouter} from "next/navigation";

export default function Page({params}: { params: { expenseId: UUID } }) {
    const router = useRouter()

    const exp: Expense = {
        amount: 0.0,
        reason: '',
        date: '',
        id: params.expenseId
    }
    const [expense, setExpense] = useState<Expense>(exp)

    const getSingle = async () => {
        getExpense(params.expenseId)
            .then(res => {
                setExpense(res)
            }).catch((error) => console.log(error))
    }

    useEffect(() => {
        getSingle().catch((error) => console.log(error))
    }, []);

    const handleChanges = (event: ChangeEvent<any>) => {
        event.preventDefault()
        setExpense((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const performEdit = async (expense: Expense) => {
        editExpense(expense).catch((error) => console.log(error))
    }

    const editExpenseData = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        performEdit(expense).catch((error) => console.log(error))
        setExpense(exp)

        router.push("/pages/expenses/")
    }


    return (
        <div className="grid-cols-1 gap-2">
            <h1 className="text-xl text-center">New Expenses</h1>

            <div className="">
                <form onSubmit={editExpenseData} className="grid gap-3 justify-evenly m-4">
                    <div className="grid grid-cols-1">
                        <label className="mx-4">amount</label>
                        <input type="number" value={expense.amount} onChange={handleChanges}
                               placeholder="enter todo-item title" name="amount"
                               className="mx-4 w-full focus:outline-blue-500 p-2 border border-blue-600 rounded"
                               required/>
                    </div>

                    <div className="grid grid-cols-1">
                        <label className="mx-4">Reason</label>
                        <textarea rows={5} name="reason" value={expense.reason} onChange={handleChanges}
                                  placeholder="enter the expense reason"
                                  className="mx-4 w-full focus:outline-blue-500 p-2 border border-blue-600 rounded"
                                  required/>
                    </div>

                    <input type="submit" title="Save" value="Save"
                           className="self-center mx-4 my-4 w-[100px] rounded-[8px] bg-blue-600 text-white font-mono p-2 content-center hover:bg-blue-700 active:bg-blue-600"/>
                </form>
            </div>
        </div>
    )
}