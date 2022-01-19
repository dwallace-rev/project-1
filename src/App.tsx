
import { useState } from "react";
import EmployeeHome from "./components/employee-home";
import LoginPage from "./components/login-page";
import ManagerHome from "./components/manager-home";
import { Employee } from "./dtos/dtos";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateExpensePage from "./components/create-expense-page";


export default function App() {

  const [user, setUser] = useState({
    username: sessionStorage.getItem("username"),
    isManager: sessionStorage.getItem("isManager") === "false" ? false : true
  });

//************DEBUG BUTTON FUNCTIONS*************
const debugUser: Employee = {id: "101", fname:"debug", lname:"user", username:"debug", password:"password", expenses:[], isManager:true};
  function setManager() {
    setUser({ username: "debug", isManager: true });
    sessionStorage.setItem("username", "debug");
    sessionStorage.setItem("isManager", "true")
    sessionStorage.setItem("employeeData", JSON.stringify(debugUser))
  }
  function setEmployee() {
    setUser({ username: "debug", isManager: false });
    sessionStorage.setItem("username", "debug");
    sessionStorage.setItem("isManager", "false")    
    sessionStorage.setItem("employeeData", JSON.stringify(debugUser))
  }
  function clearStorage() { 
    setUser({ username: "", isManager: false }); sessionStorage.clear()
    window.location.assign("http://localhost:3000")
  }
  //******************************************


  return (<>
    Debug buttons  :
    <button onClick={setEmployee}>Role: Employee</button>
    <button onClick={setManager}>Role: Manager</button>
    <button onClick={clearStorage}>Clear session storage</button>
    <hr/>

    <Routes>
      <Route path="/*" element={user.username ? user.isManager ? <ManagerHome/> : <EmployeeHome/>: <LoginPage updateUser={setUser}/>}/>
      {/* <Route path="/create" element={<CreateExpensePage />}/> */}
    </Routes>

    
      



  </>);
}