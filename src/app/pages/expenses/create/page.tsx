'use client'

import {ChangeEvent, useState} from "react";
import {NewExpense} from "@/app/lib/models/newExpense";
import {addExpense} from "@/app/lib/services/expenseService";
import {useRouter} from "next/navigation";

export default function page() {
    const router = useRouter()
    
    const exp: NewExpense = {
        amount: 0.0,
        reason: '',
        Date: new Date(Date.now()),
    }
    const [expense, setExpense] = useState<NewExpense>(exp)

    const handleChanges = (event: ChangeEvent<any>) => {
        event.preventDefault()
        setExpense((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const performAdd = async (expense: NewExpense) => {
        addExpense(expense).catch((error) => console.log(error))
    }

    const addExpenseData = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        performAdd(expense).catch((error) => console.log(error))
        setExpense(exp)

        router.push("/pages/expenses/")
    }

    return (
        <div className="grid-cols-1 gap-2">
            <h1 className="text-xl text-center">New Expenses</h1>

            <div className="">
                <form onSubmit={addExpenseData} className="grid gap-3 justify-evenly m-4">
                    <div className="grid grid-cols-1">
                        <label className="mx-4">amount</label>
                        <input type="text" value={expense.amount} onChange={handleChanges}
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