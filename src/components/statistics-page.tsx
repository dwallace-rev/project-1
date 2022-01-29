import axios from "axios";
import { maxHeaderSize } from "http";
import { useEffect, useState } from "react"
import { Employee, Expense } from "../dtos/dtos";


export default function StatisticsPage(){


    useEffect( ()=>{
        renderData()
    }, [])

    const emptyEmp: Employee = {username: "", fname: "", lname: "", id:"", password: "", expenses: [], isManager: false};

    const[totalCost, setTotalCost] = useState(0);
    const[expenses, setExpenses] = useState([]);
    const[employees, setEmployees] = useState([]);
    const[highestRequested, setHighestRequested] = useState(emptyEmp);
    const[lowestRequested, setLowestRequested] = useState(emptyEmp);
    const[ , ] = useState();


    function renderData(){

        const expenses: Expense[] = JSON.parse(sessionStorage.getItem("expenses"));
        const employees: Employee[] = JSON.parse(sessionStorage.getItem("employees"));
        const ids: string[] = expenses.map(e=> e.requestedBy).filter((value, index, self) => self.indexOf(value) === index) //unique IDs of everyone with 1 or more requests

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
                <td className="stat-label">Employee with Most Expense Requests: {}</td>
                <td></td>
            </tr>
            <tr>
                <td className="stat-label">Expense Total: </td>
                <td className="stat-data">${(totalCost/100).toLocaleString()}</td>
                <td className="stat-label">Employee with Highest Total Request Amount:</td>
                <td className="stat-data"> {highestRequested.fname} {highestRequested.lname}: $</td>
            </tr>
            <tr>
                <td className="stat-label">Average Expense Request Amount:</td>
                <td className="stat-data">${((totalCost/expenses.length)/100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td className="stat-label">Employee with Lowest Total Request Amount: {}</td>
                <td className="stat-data">{lowestRequested.username}</td>
            </tr>
        </tbody>
    </table>
    
    </>)
}