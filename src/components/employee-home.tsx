import { Route, Routes, useNavigate } from "react-router-dom";
import { Employee } from "../dtos/dtos";
import CreateExpensePage from "./create-expense-page";
import ExpenseTable from "./expense-table";


export default function EmployeeHome(){

    const employee: Employee = JSON.parse(sessionStorage.getItem("employeeData"));
    const {fname, lname} = employee;

    const navigate = useNavigate()

    function logOut() { 
        sessionStorage.clear()
        window.location.assign("http://localhost:3000")
    }


    return(<>
    
        <button onClick={logOut}>Log Out</button>
        <hr/>
        <h2>Employee Home Page</h2>
        <h4>Welcome, {fname} {lname}</h4>
        <hr/>
        <h4>What would you like to do?</h4>
        <button onClick={()=>navigate("create")}>Request a new expense reimbursement</button><br/>
        <button onClick={()=> navigate("expenses")}>View your expense requests</button><br/>

        <Routes>
            <Route path={"create"} element={<CreateExpensePage/>}/>
            <Route path={"expenses"} element={<ExpenseTable />} />
        </Routes>
    </>)
}