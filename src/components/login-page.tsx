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

        const employee: Employee = {id: "", username: "JoeyS", fname: "Joe", lname:"Shmo", isManager:false, requests:[]}
        sessionStorage.setItem("username", loginPayload.username)
        sessionStorage.setItem("isManager", `${employee.isManager}`)
        props.updateUser({username:employee.username, isManager:Boolean(employee.isManager)})
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