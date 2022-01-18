import axios from "axios"
import { useState } from "react";
import { Employee } from "./dtos/dtos";



export default function ExpenseActionRow(props){
    
    const {id, reason, requestedBy, requestDate, approved, amount, pending, comments} = props
    const [username, setUsername] = useState();

    const requestUser =(async () =>{
        const username = (await (await axios.get(`http://localhost:5000/employees/username/${requestedBy}`)).data)
        setUsername(username);     
    })()


    return(<tr>
        <td className="dateField">{new Date(requestDate).toLocaleDateString()}</td>
        <td className="amountField">{`$${(amount/100).toFixed(2)}`}</td>
        <td>{username}</td>
        <td className="reasonField">{reason}</td>
        <td>{approved ? "ACCEPTED": pending ? "PENDING" : "REJECTED"}</td>
        <td>{comments}</td>
    </tr>)
}