import React from 'react';
import "../styles/App.css";
import "../styles/background.sass";
import '../styles/AdminStats.css'; 
import logo from '../images/ap_logotext_white.png';
import { useState, useEffect } from 'react';
import OrderStats from "./AdminStats/OrderStats";
import OrderList from "./AdminStats/OrderList";
import UserSums from "./AdminStats/UserSums";
import UserList from "./AdminStats/UserList";
import config from "../config.json"
import { setData, setISPSDataLimit, setISPSExpiryHours, setISPSPrices, setISPSServerName, setISPSTopUpData, setISPSTopUpExpiry } from "./AdminStats/utils";

function AdminStats() { 

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDiscordData(setUser);
    }, []);

    async function loadDiscordData() {
        console.log("Loading Discord data");
        const data_response = await fetch(`${config.BACKEND_DOMAIN}/dashboard/access-discord-info`, {
          credentials: "include",
        });
        const data_session = await data_response.json();
        if (!data_session || !data_session.user) {
          window.location.replace(`https://dashboard.auroraproxies.com/`)
          return console.error("No logged in");
        }

        // change these raw discord ids into env variables
        if (data_session.user.discordId != 000 && data_session.user.discordId != 000) {
            window.location.replace(`https://dashboard.auroraproxies.com/`)
            return console.error("Not admin.");
        }
        setUser(data_session.user);
        setLoading(false);
        //loadDashboardData();
      }
      if ( loading ) {
        return (<div className = "mainContainer">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title"></div>
        </div>); // Loading page
      } else {
        return (
            <div className="main">
            <div className="mainContainer">
                <div className="title">  
                
                    <div>
                        <h3>ISPS STATS</h3> 
                    </div>

                </div>
                
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                    <div id="title">
                </div>
                
                
                <div className = "columnContainer">
                    <div className = "dashboardContainer"> 
                    <div className = "sideNavColumn">
                            <div className = "sidenav">
                                <div id="mySidenav" className = "mySideNav">
                                    <img className = "iconnav" src={logo} alt="Aurora Icon"/>
                                    <a href="/dashboard" className = "icontext_selected"> Dashboard </a>
                                    {/* <a href="/purchase" className = "icontext">Purchase</a> */}
                                    {/* <a href="/ispsdashboard" className = "icontext">Datacenter ISPS</a> */}
                                    <div class = "row">
                                                <p className = "igLogo">
                                                    <a href="https://www.instagram.com/auroraproxies/" target="_blank" rel="noopener noreferrer">
                                                        <img src=".\src\assets\ap_logo_ig.png" alt="Insta" className = "igLogoImg"/>
                                                    </a>
                                                </p>
                                                <p className = "twitterLogo">
                                                    <a href="https://twitter.com/AuroraProxies" target="_blank" rel="noopener noreferrer">
                                                        <img src=".\src\assets\ap_logo_twitter.png" alt="Twitter" className = "twitterLogoImg"/>
                                                    </a>
                                                </p>
                                    </div>      
                                </div>  
                            </div>
                        </div> 
    
                        <div className = "col1">
                            
                            <div className = "stats">  
                                <text className = "col_title"> User Stats </text>
                                <OrderStats></OrderStats>
                                
                                <input type="Number" id = "limitInput" ></input> 
                                <button onClick = {setISPSDataLimit}> Set ISPS Data Limit </button> 
                                <br/>

                                <input type="Number" id = "expiryInput" ></input> 
                                <button onClick = {setISPSExpiryHours}> Set ISPS Expiry Hours </button> 
                                <br/>

                                <input type="String" id = "pricesInput" ></input> 
                                <button onClick = {setISPSPrices}> Set ISPS Prices(p1:p2:a1:a2) </button> 
                                <br/>

                                <input type="Number" id = "serverInput" ></input> 
                                <button onClick = {setISPSServerName}> Set ISPS Server Name</button> 
                                <br/>

                                <input type="Number" id = "dataInput" ></input> 
                                <button onClick = {setData}> Set Data Left Amount </button> 
                                <br/>

                                <input type="Number" id = "topUpDataInput" ></input> 
                                <button onClick = {setISPSTopUpData}> Set ISPS Top Up Data </button> 
                                <br/>

                                <input type="Number" id = "topUpExpiryInput" ></input> 
                                <button onClick = {setISPSTopUpExpiry}> Set ISPS Top Up Expiry </button> 
                                <br/>
                                
                            </div>
                            <br></br>
                                <div className = "userSums">
                                    <UserList/>
                                </div>
                            
                        </div>

                        </div>    
                    </div>
                </div>
            </div>
        );
    }


} export default AdminStats;