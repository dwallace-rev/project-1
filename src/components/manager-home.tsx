import { Link, Outlet, useNavigate } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import { Employee } from "../dtos/dtos";
import CreateExpensePage from "./create-expense-page";
import ExpenseActionPage from "./expense-action-page";
import ExpenseTable from "./expense-table";
import StatisticsPage from "./statistics-page";


export default function ManagerHome(){


    const navigate = useNavigate();

    const employee: Employee = JSON.parse(sessionStorage.getItem("employeeData"));
    const {id, fname, lname, expenses} = employee;



    return(<>

        <h2>Manager Home Page</h2>
        <h4>Welcome, {fname} {lname}</h4>
        <hr/>
        <h4>What would you like to do?</h4>
        <button onClick={()=>navigate("create")}>Request a new expense reimbursement</button><br/>
        <button onClick={()=>navigate("expenses")}>View your expense requests</button><br/>
        <button onClick={()=>navigate("actions")}>Approve or reject expenses</button><br/>
        <button onClick={()=>navigate("statistics")}>View Statistics Page</button>

        <Routes>
            <Route path={"create"} element={<CreateExpensePage/>}/>
            <Route path={"expenses"} element={<ExpenseTable />} />
            <Route path={"actions"} element={<ExpenseActionPage />} />
            <Route path={"statistics"} element={<StatisticsPage/>}/>
        </Routes>

        <Outlet/>
    </>)
}