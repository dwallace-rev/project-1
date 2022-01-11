import { useState } from "react";
import EmployeeHome from "./components/employee-home";
import LoginPage from "./components/login-page";
import ManagerHome from "./components/manager-home";


export default function App() {

  const [user, setUser] = useState({
    username: sessionStorage.getItem("username"),
    isManager: Boolean(sessionStorage.getItem("isManager"))
  })

  console.log(sessionStorage.getItem("isManager"));
  console.log(sessionStorage.getItem("username"))

  return (<>{
    !user.username ? <LoginPage updateUser = {setUser}/>:
    user.isManager ? <ManagerHome/> : <EmployeeHome/>
  }
  </>);
}
