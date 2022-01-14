import axios from "axios";
import { useRef } from "react"
import { Employee } from "../dtos/dtos";


export default function LoginPage(props:{updateUser:Function}){

    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    async function login(){
        const loginPayload = {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }

        const employees: Employee[] = (await axios.get("http://localhost:5000/employees")).data;
        const employee: Employee = employees.find(e=> e.username === loginPayload.username);

        if (employee){
            if (employee.password === loginPayload.password){
                sessionStorage.setItem("username", employee.username)
                sessionStorage.setItem("isManager", `${employee.isManager}`)
                sessionStorage.setItem("employeeData", JSON.stringify(employee));
                props.updateUser({username:employee.username, isManager:Boolean(employee.isManager)})
            }
            else{
                alert("Incorrect password")
            }
        }
        else{
            alert("Username not found.");
        }
    }

    
    return(<>
        <h1>Log-in page</h1>
        <input id="usernameInput" type={"text"} ref={usernameInput}/>
        <label htmlFor="usernameInput"> Username </label>
        <br/><input id="passwordInput" type={"password"} ref={passwordInput}/>
        <label htmlFor="passwordInput"> Password</label>
        <br/><button onClick={login}>Log In</button>
    </>)
}