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