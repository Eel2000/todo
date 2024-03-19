import {Expense} from "@/app/lib/models/expense";
import {UUID} from "node:crypto";
import {NewExpense} from "@/app/lib/models/newExpense";

const BASE_API_URL: string = "https://localhost:7108/Expense/"

export async function getExpenses(): Promise<Expense[]> {
    const response = await fetch(BASE_API_URL + "get-expenses")

    if (!response.ok) {
        console.log(response.statusText)
        return []
    } else {
        return response.json()
    }
}

export async function removeExpense(id: UUID): Promise<any> {
    const response = await fetch(BASE_API_URL + "remove/" + id, {
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

export async function getExpense(id: UUID): Promise<any> {
    const response = await fetch(BASE_API_URL + "get/" + id, {
        method: 'GET',
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

export async function addExpense(expense: NewExpense): Promise<boolean> {
    const response = await fetch(BASE_API_URL + "Add", {
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
    const response = await fetch(BASE_API_URL + "Edit", {
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