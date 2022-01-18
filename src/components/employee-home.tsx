import { Employee } from "../dtos/dtos";
import ExpenseTable from "./expense-table";


export default function EmployeeHome(){

    const employee: Employee = JSON.parse(sessionStorage.getItem("employeeData"));
    const {id, fname, lname, expenses} = employee;


    return(<>
        <h2>Employee Home Page</h2>
        <h3>Welcome, {fname} {lname}</h3>
        <ExpenseTable/>
    </>)
}