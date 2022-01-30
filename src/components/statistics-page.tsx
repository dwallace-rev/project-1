import axios from "axios";
import { useEffect, useState } from "react"
import { Employee, Expense } from "../dtos/dtos";


export default function StatisticsPage(){


    useEffect( ()=>{
        renderData()
    }, [])

    const emptyEmp: Employee = {username: "", fname: "", lname: "", id:"", password: "", expenses: [], isManager: false};

    const [totalCost, setTotalCost] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [highestRequested, setHighestRequested] = useState(emptyEmp);
    const [lowestRequested, setLowestRequested] = useState(emptyEmp);
    const [uniqueEmployees, setUniqueEmployees] = useState([]);
    const [completionData, setCompletionData] = useState({completed: 0, pending: 0})


    async function renderData(){

        const expenses: Expense[] = await axios.get(`http://9c09-184-90-227-213.ngrok.io/expenses`).then(response => {return response.data});
        const employees: Employee[] = await axios.get(`http://9c09-184-90-227-213.ngrok.io/employees/`).then(response => {return response.data});
        employees.forEach(e=>e.password = "");
        const ids: string[] = expenses.map(e=> e.requestedBy).filter((value, index, self) => self.indexOf(value) === index) //unique IDs of everyone with 1 or more requests

        setUniqueEmployees(ids);
        setExpenses(expenses);
        setEmployees(employees);
        
        let totalcost = 0;
        for (let i = 0; i < expenses.length; i++){
            totalcost += expenses[i].amount;
        }
        setTotalCost(totalcost);

        const balancePerUser = [];
        ids.forEach(i=>{

            let total = 0;

            expenses.forEach(e=>{
                if (e.requestedBy === i){
                    total += e.amount;
                }
            })

            balancePerUser.push({id: i, amount: total})
        })

        const min = balancePerUser.reduce(function(prev, current) {
            return (prev.amount < current.amount) ? prev : current
        })
        const max = balancePerUser.reduce(function(prev, current) {
            return (prev.amount > current.amount) ? prev : current
        })
  
        setHighestRequested(employees.find(e=> max.id === e.id));
        setLowestRequested(employees.find(e=> min.id === e.id));

        let completed = 0; 
        let pending = 0;
        expenses.forEach(e=>{
            if (e.pending === true) pending++;
            else completed ++;
        })
        setCompletionData({completed:completed, pending:pending})

        
    }

    return(<><hr/>
    <h4>Statistics</h4>
    <table id="stat-table">
        <thead>
            {/* <tr>
                <th className="stat-label"></th>
                <th className="stat-data"></th>
                <th className="stat-label"></th>
                <th className="stat-data"></th>
            </tr> */}
        </thead>
        <tbody>
            <tr>
                <td className="stat-label">Expense Count:</td>
                <td className="stat-data">{expenses.length}</td>
                <td className="stat-label">Total Number of Emploeyes in Database</td>
                <td className="stat-data">{employees.length}</td>
            </tr>
            <tr>
                <td className="stat-label">Expense Total: </td>
                <td className="stat-data">${(totalCost/100).toLocaleString()}</td>
                <td className="stat-label">Number of Employees With Expense Requests: </td>
                <td className="stat-data">{uniqueEmployees.length}</td>
            </tr>
            <tr>
                <td className="stat-label">Mean Expense Request Amount:</td>
                <td className="stat-data">${((totalCost/expenses.length)/100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td className="stat-label">Employee with Highest Total Request Amount: </td>
                <td className="stat-data">{highestRequested.fname} {highestRequested.lname}</td>
            </tr>
            <tr>
                <td className="stat-label">Completed Requests:</td>
                <td className="stat-data">{completionData.completed}</td>
                <td className="stat-label">Employee with Lowest Total Request Amount: </td>
                <td className="stat-data">{lowestRequested.fname} {lowestRequested.lname}</td>
            </tr>
            <tr>
                <td className="stat-label">Pending Requests:</td>
                <td className="stat-data">{completionData.pending}</td>
            </tr>
        </tbody>
    </table>
    
    </>)
}