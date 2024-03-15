import {Expense} from "@/app/lib/models/expense";
import {UUID} from "node:crypto";

export async function getExpenses(): Promise<Expense[]> {
    const response = await fetch("https://localhost:7108/Expense/get-expenses")

    if (!response.ok) {
        console.log(response.statusText)
        return []
    } else {
        return response.json()
    }
}

export async function removeExpense(id: UUID): Promise<any> {
    const response = await fetch("https://localhost:7108/Expense/remove/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        console.log(response.statusText)
    } else {
        return response.json()
    }
}

export async function addExpense(expense: Expense): Promise<boolean> {
    const response = await fetch("https://localhost:7108/Expense/Add", {
        method: 'POST',
        body: JSON.stringify(expense),
        headers: {'Content-Type': 'application/json'}
    })

    if (!response.ok) {
        console.log(response.statusText)
        return false
    } else {
        return response.json()
    }
}

export async function editExpense(expense: Expense): Promise<any> {
    const response = await fetch("https://localhost:7108/Expense/Edit", {
        method: 'PUT',
        body: JSON.stringify(expense),
        headers: {'Content-Type': 'application/json'}
    })

    if (!response.ok) {
        console.log(response.statusText)
    } else {
        return response.json()
    }
}