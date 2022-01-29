import axios from "axios";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import { Employee, Expense } from "../dtos/dtos";
import CreateExpensePage from "./create-expense-page";
import ExpenseActionPage from "./expense-action-page";
import ExpenseTable from "./expense-table";
import StatisticsPage from "./statistics-page";


export default function ManagerHome(){


    const navigate = useNavigate();

    const employee: Employee = JSON.parse(sessionStorage.getItem("employeeData"));
    const {id, fname, lname, expenses} = employee;

    useEffect(()=>{
        getAllData();
    }, [])

    async function getAllData() {
        const expenses: Expense[] = await axios.get(`http://localhost:5000/expenses`).then(response => {return response.data});
        const employees: Employee[] = await axios.get(`http://localhost:5000/employees/`).then(response => {return response.data});

        employees.forEach(e=> e.password = ""); //hide passwords

        sessionStorage.setItem("expenses", JSON.stringify(expenses));
        sessionStorage.setItem("employees", JSON.stringify(employees));

        // sessionStorage.setItem("uniqueIds", JSON.stringify(ids))
        
    }





    return(<>

        <h2>Manager Home Page</h2>
        <h4>Welcome, {fname} {lname}</h4>
        <hr/>
        <h4>What would you like to do?</h4>
        <button className="actionButton" onClick={()=>navigate("create")}>Request a new expense reimbursement</button><br/>
        <button className="actionButton" onClick={()=>navigate("expenses")}>View your expense requests</button><br/>
        <button className="actionButton" onClick={()=>navigate("actions")}>Approve or reject expenses</button><br/>
        <button className="actionButton" onClick={()=>navigate("allExpenses")}>View ALL expense requests</button><br/>
        <button className="actionButton" onClick={()=>navigate("statistics")}>View Statistics Page</button>

        <Routes>
            <Route path={"create"} element={<CreateExpensePage/>}/>
            <Route path={"expenses"} element={<ExpenseTable viewAll={false}/>} />
            <Route path={"allExpenses"} element={<ExpenseTable viewAll={true}/>}/>
            <Route path={"actions"} element={<ExpenseActionPage />} />
            <Route path={"statistics"} element={<StatisticsPage/>}/>
        </Routes>
    </>)
}