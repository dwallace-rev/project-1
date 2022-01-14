import { Employee } from "../dtos/dtos";


export default function ManagerHome(){

    const employee: Employee = JSON.parse(sessionStorage.getItem("employeeData"));
    const {id, fname, lname, expenses} = employee;


    return(<>
        <h2>Manager Home Page</h2>
        <h4>Welcome, {fname} {lname}</h4>
    </>)
}