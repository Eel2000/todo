import {UUID} from "node:crypto";

export type Expense = {
    id: UUID,
    amount: number,
    reason: string,
    Date: string
}