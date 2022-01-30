import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Employee, Expense } from "../dtos/dtos"


export default function CreateExpensePage(){
    const navigate = useNavigate();
    const reasonInput = useRef(null);
    const amountInput = useRef(null);

    const employee: Employee = JSON.parse(sessionStorage.getItem("employeeData"))
    const newExpense: Expense = {id:"", reason:"", amount:-1, requestedBy:employee.id, requestDate:0, approved:false, pending:true};

    async function makeExpenseRequest(){

        newExpense.reason = reasonInput.current.value;
        newExpense.amount = (amountInput.current.value * 100); //multiply by 100 because it's stored in cents
        newExpense.requestDate = Date.now();

        const result = axios.post("https://9c09-184-90-227-213.ngrok.io/expenses", newExpense)
        alert("Reimbursement request successfully created: " + (await result).statusText);
        navigate("/expenses")
    }




    return(<><hr/>
        <h3>Request new expense reimbursement</h3>
        <label htmlFor="newExpenseTextInput">Reason for reimbursement request:</label><br/>
        <input id="newExpenseTextInput" ref={reasonInput}/><br/><br/>
        <label htmlFor="newExpenseAmountInput">Reimbursement amount:</label><br/>
        <input id="newExpenseAmountInput" type={"number"} ref={amountInput}/><br/><br/>

        <button onClick={makeExpenseRequest}>Create Request</button>
    </>)
}