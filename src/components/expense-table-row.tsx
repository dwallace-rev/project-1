


export default function ExpenseTableRow(props){

    const {reason, requestDate, approved, amount, pending, comments} = props


    return(<tr className="expense-row">
        <td className="dateField">{new Date(requestDate).toLocaleDateString()}</td>
        <td className="amountField">{`$${(amount/100).toFixed(2)}`}</td>
        <td className="reasonField">{reason}</td>
        {approved ? <td style={{color:"Green"}}>ACCEPTED</td>: pending ? <td>PENDING</td> : <td style={{color:"red"}}>REJECTED</td>}
        <td>{comments}</td>
    </tr>)
}