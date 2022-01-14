import { Employee } from "../dtos/dtos";


export default function EmployeeHome(){

    const employee: Employee = JSON.parse(sessionStorage.getItem("employeeData"));
    const {id, fname, lname, expenses} = employee;


    return(<>
        <h2>Employee Home Page</h2>
        <h4>Welcome, {fname} {lname}</h4>
    </>)
}