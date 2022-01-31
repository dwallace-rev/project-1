import axios from "axios"
import { useEffect, useState } from "react"
import { Employee } from "../dtos/dtos"
import ExpenseTableRow from "./expense-table-row";



export default function ExpenseTable(props) {


    const viewAll = props.viewAll;
    let cheating = "";

    const employeeData: Employee = JSON.parse(sessionStorage.getItem("employeeData"))
    const empId = employeeData.id;

    const [expenses, setExpenses] = useState([]);
    const tableRows = expenses.map(e => <ExpenseTableRow key={e.id} {...e} />)

    useEffect(() => {
        async function getExpenses() {

            let expenses = [];
    
            if (viewAll) {
                expenses = await axios.get(`https://9c09-184-90-227-213.ngrok.io/expenses`).then(response => { return response.data });
            }
            else {
                expenses = await (await axios.get(`https://9c09-184-90-227-213.ngrok.io/employeeExpenses/${empId}`)).data
            }
    
            setExpenses(expenses);
        }

        getExpenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])




    return (<><hr />
        <h4>Expense Requests:</h4>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th className="expenseHeader">Reason</th>
                    <th>Approved?</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    </>)
}