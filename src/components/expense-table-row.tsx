import { request } from "http"



export default function ExpenseTableRow(props){

    const {id, reason, requestedBy, requestDate, approved, amount, pending, comments} = props


    return(<tr>
        <td className="dateField">{new Date(requestDate).toLocaleDateString()}</td>
        <td className="amountField">{`$${(amount/100).toFixed(2)}`}</td>
        <td className="reasonField">{reason}</td>
        <td>{approved ? "ACCEPTED": pending ? "PENDING" : "REJECTED"}</td>
        <td>{comments}</td>
    </tr>)
}