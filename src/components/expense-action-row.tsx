import axios from "axios"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Employee, Expense } from "../dtos/dtos";



export default function ExpenseActionRow(props:{expense:Expense, refresh:Function}){

    const navigate = useNavigate();
    const refresh = props.refresh;

    const commentInput = useRef(null);
    
    const {id, reason, requestedBy, requestDate, approved, amount, pending, comments} = props.expense;
    const [username, setUsername] = useState();
    const expense:Expense = {id, reason, requestDate, requestedBy, approved, amount, pending, comments}
    
    const requestUser =(async () =>{
        const username = (await (await axios.get(`http://localhost:5000/employees/username/${requestedBy}`)).data)
        setUsername(username);
        console.log("requestUser called")  
    })

    useEffect(()=>{requestUser()},[])

    async function approvalAction(approved:boolean){

        if (approved){
            console.log(`Approve button pressed with comment: ${commentInput.current.value}`)
            expense.approved = true;
        } else {
            console.log(`Reject button pressed with comment: ${commentInput.current.value}`)
            expense.approved = false;
        }
        expense.pending = false;

        if (commentInput.current) {
            expense.comments =[commentInput.current.value];
        }

        const result = (await axios.put(`http://localhost:5000/expenses/${id}`, expense)).data
        console.log(expense);
        refresh();

    }


    return(<tr>
        <td className="dateField">{new Date(requestDate).toLocaleDateString()}</td>
        <td className="amountField">{`$${(amount/100).toFixed(2)}`}</td>
        <td>{username}</td>
        <td className="reasonField">{reason}</td>
        <td>{approved ? "ACCEPTED": pending ? "PENDING" : "REJECTED"}</td>
        <td>
            <button onClick={()=>approvalAction(true)}>Accept</button><button onClick={()=>approvalAction(false)}>Reject</button>
        </td>
        <td><input id="commentInput" ref={commentInput}/></td>
        
    </tr>)
}