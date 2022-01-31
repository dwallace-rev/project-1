import axios from "axios"
import { useEffect, useRef, useState } from "react";
import { Employee, Expense } from "../dtos/dtos";



export default function ExpenseActionRow(props:{expense:Expense, refresh:Function}){

    const refresh = props.refresh;

    const commentInput = useRef(null);
    
    const {id, reason, requestedBy, requestDate, approved, amount, pending, comments} = props.expense;
    const [username, setUsername] = useState("");
    const expense:Expense = {id, reason, requestDate, requestedBy, approved, amount, pending, comments}
    const employees: Employee[] = JSON.parse(sessionStorage.getItem("employees"))
    

    useEffect(()=>{
        const requestUser = (async () =>{
        const username = employees.find(e=> e.id === requestedBy).username;
        setUsername(username);
    })
        console.log("RequestUser run.")
        requestUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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

        const result = (await axios.put(`https://123c-184-90-227-213.ngrok.io/expenses/${id}`, expense)).data
        console.log(`${await result}}`);
        refresh();

    }


    return(<tr>
        <td className="dateField">{new Date(requestDate).toLocaleDateString()}</td>
        <td className="amountField">{`$${(amount/100).toFixed(2)}`}</td>
        <td>{username}</td>
        <td className="reasonField">{reason}</td>
        <td>{approved ? "ACCEPTED": pending ? "PENDING" : "REJECTED"}</td>
        <td className="action-buttons-td">
            <button onClick={()=>approvalAction(true)}>Accept</button><button onClick={()=>approvalAction(false)}>Reject</button>
        </td>
        <td><input id="commentInput" ref={commentInput}/></td>
        
    </tr>)
}