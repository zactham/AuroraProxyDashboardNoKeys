import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import IspsDashboard from "./RefactoredIspsDashboard.js";
import Login from "./Login";
import Purchase from "./Purchase"
import Payment from "./Payment"
import AdminStats from "./AdminStats"
import AdminDashboard from "./AdminDashboard"


export default function App() 
{ 
    return (
        <Router>
            <Switch>
                <Route path = "/dashboard" component = {Dashboard}/>
                <Route path = "/isps" exact component = {IspsDashboard}/>
                <Route path = "/purchase" exact component = {Purchase}/>
                <Route path = "/payment" exact component = {Payment}/>
                <Route path = "/" exact component = {Login}/>
                <Route path = "/AdminStats" exact component = {AdminStats}/>
                <Route path = "/admindashboard/:user" component = {AdminDashboard}/>

            </Switch>
        </Router>
    );
  }


