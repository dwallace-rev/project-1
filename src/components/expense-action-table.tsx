import axios from "axios";
import { useEffect, useState } from "react";
import { Expense } from "../dtos/dtos";
import ExpenseActionRow from "./expense-action-row";



export default function ExpenseActionTable(){

    const [expenses, setExpenses] = useState([]);
    const tableRows = expenses.map(e => <ExpenseActionRow key={e.id} expense={e} refresh={getExpenses}/>)


    async function getExpenses(){
        const expenses: Expense[] = await (await axios.get("http://localhost:5000/expenses")).data
        const pending = expenses.filter(e=> e.pending === true )
        setExpenses(pending);
    }

    useEffect(()=>{
        getExpenses();
    }, [])



    return(<table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Requested By</th>
                <th className="expenseHeader">Reason</th>
                <th>Approved?</th>
                <th>Action</th>
                <th>Comment</th>
            </tr>
        </thead>
        <tbody>
            {tableRows}
        </tbody>
    </table>)
}