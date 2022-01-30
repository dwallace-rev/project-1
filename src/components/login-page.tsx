import axios from "axios";
import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { Employee } from "../dtos/dtos";


export default function LoginPage(props:{updateUser:Function}){

    const navigate = useNavigate();
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    async function login(){
        
        const loginPayload = {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }

        let valid = true; // Wasn't sure of a better way to account for whether a login succeeds or not.
        
        const employee: Employee = await axios.patch(`http://localhost:5000/employees/login`, loginPayload).then(response=>{
            return response.data;
        }).catch(function(error){
            console.log(error.response);
            valid = false;
        })

        if (valid){            
            sessionStorage.setItem("username", employee.username);
            sessionStorage.setItem("isManager", `${employee.isManager}`);
            employee.password = ""; // remove so I don't store sensitive data in session storage.
            sessionStorage.setItem("employeeData", JSON.stringify(employee));
            props.updateUser({username:employee.username, isManager:Boolean(employee.isManager)});
        }
        else{
            alert("Invalid username/password");
            passwordInput.current.value = "";
        }
        
        navigate("/")
    }

    
    return(<>
    <div id="login-div">
        
        <input id="usernameInput" type={"text"} ref={usernameInput}/>
        <label htmlFor="usernameInput"> Username </label>
        <br/><input id="passwordInput" type={"password"} ref={passwordInput}/>
        <label htmlFor="passwordInput"> Password</label>
        <br/><button onClick={login}>Log In</button>
    </div>
    </>)
}