import logo from "../images/ap_logotext_white.png";
import twitter_logo from "../images/ap_logo_twitter.png";
import ig_logo from "../images/ap_logo_ig.png";
import mainAPLogo from "../images/Aurora_Proxies_Logo.png";
import mainAPLogoText from "../images/Aurora_Proxies_Name.png";
import settings from "../config";
import React, { useState, useEffect, useRef } from "react";
import {makeStyles} from "@material-ui/core/styles"
import {Grid} from "@material-ui/core"
import ProgressBar from "@ramonak/react-progress-bar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-circular-progressbar/dist/styles.css';
import Dropdown from "react-dropdown";
import "../styles/App.css";
import "../styles/Isps.css";
import "../styles/background.sass";
import "../styles/react-dropdown.css";
import config from "../config.json";
import OrderTable from "./Dashboard/OrderTable";
import constants_Isps from "./ISPS Dashboard/constantsIsps";
import {
  logoutFunc,
  clearList,
  copyList,
  loadDiscordData,
} from "./Dashboard/utils";
import { green } from "@material-ui/core/colors";
import utils from "./ISPS Dashboard/utils";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";

let timeExpired = 0;
let timeTotalAmount = 0;
let proxyString = ""
const useStyles = makeStyles((theme) => ({
  grid: 
  {
    width: '100%',
    margin: '0px',
    justifyContent: 'center',
    alignContent: 'center',
  },
  topbaritem1: 
  {
    width: '100%',
    margin: '0px',
    justifyContent: 'center',
    alignContent: 'center',
    
  },
  topbaritem2: 
  {
    width: '100%',
    margin: '0px',
    justifyContent: 'center',
    alignContent: 'center',
    
  },
  topbaritem3: 
  {
    width: '100%',
    margin: '0px',
    justifyContent: 'center',
    alignContent: 'center',
    
  },
 
}));

// Make sure to call `loadStripe` outside of a component’s render to avoid
function RefactoredIspsDashboard() {

  const classes = useStyles()

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentProxyPlan, setCurrentProxyPlan] = useState(
    constants_Isps.options_proxy_plan[0]
  );
  // proxies = an array of the proxy strings
  const [proxies, setProxies] = useState([]);

  const [currentPrice, setCurrentPrice] = useState(constants_Isps.prices_proxy[0]);
  
  useEffect(() => {
    loadDiscordData();

  }, []);

  // run this code every time currentProxyPlan changes
  useEffect(() => {
    console.log({ currentProxyPlan });
  }, [currentProxyPlan]);

  //When a proxy plan is selected in the drop down
  const handleProxyPlan = (value) => {
    
    //sets the proxy plan
    setCurrentProxyPlan(value);
    //grabs the proxies associated with that plan

  };

  const authenticateIp = async() => {

    console.log("Authenticating IP.")
    //TODO CHECK THE TOKEN ON THIS
      let data_response = await fetch(`${config.BACKEND_DOMAIN}/isps/addIP/${currentProxyPlan.token}/${document.getElementById("ipAddressInput").value}`, {
          method: "POST",
          credentials: "include",
      });
  
      console.log(data_response);
    
  };

  const handleClearProxies = () => {
    setProxies([]);
  };


  const loadDashboardData = async (event) => {
    // console.log("Loading dashboard data.");
    // const data_response = await fetch(constants.DASHBOARD_USER_ENDPOINT, {
    //   method: "POST",
    // });
    // const data_session = await data_response.json();
    // console.log("DATA SESSION: ");
    // console.log(data_session);
    // console.log(user.user_traffic_limit);
    // setTraffic(data_session.user.user_traffic);
    // setTrafficLimit(data_session.user.user_traffic_limit);
    // setuser.user_traffic(data_session.user.user_traffic);
    // setuser.password(data_session.user.password);
  };

    const loadUserMongoData = async() => {
        let data_response = await fetch(`/access-mongo-user`, {
            method: "POST",
        });
    
        const data_session = await data_response.json();
        console.log(data_session);
        console.log("MONGO DATA: ")
        console.log(data_session.user[0].orders)
        if (data_session.user[0].orders) {
            let table = document.getElementById('orderTable');
            let newRow = table.insertRow(table.rows.length);
            newRow.innerHTML = "hello";
        }
        
        
        user = data_session.user;
        setUser(user); 
        console.log(user); 
    }
    loadUserMongoData();

    async function loadDiscordData() {
      console.log("Loading Discord data");
      const data_response = await fetch(constants_Isps.DISCORD_SESSION_ENDPOINT, {
        credentials: "include",
      });
      const data_session = await data_response.json();
      if (!data_session || !data_session.user) {
        window.location.replace(`${config.FRONTEND_DOMAIN}`)
        return console.error("No logged in");
      }
      setUser(data_session.user);
      setLoading(false);
      //loadDashboardData();
    }


  function calculateTime ()
  {
    if (user && user.user_traffic_limit > 0)
    {
      return 100 * 
      user.user_traffic / user.user_traffic_limit;
    }
    else 
      return 0;
    
  }

  async function topUp()
  {
    console.log("Topping up data")
    //TODO get the top up amount from there current plan
      let data_response = await fetch(`${config.BACKEND_DOMAIN}/isps/updatetopupexpiry/:amount}`, {
          method: "POST",
          credentials: "include",
      });
  
      console.log(data_response);
  }

  function loadCurrentPlan ()
  {
    //TODO get from the mongo order
   // let time_exp = await DataInstock.find({_id: ObjectID(`${config.MONGO_ISPS_OBJECT_ID}`)});
    //console.log(data)
    //liveData = parseInt(data[0].dataInstock)
    //timeExpired = currentProxyPlan.
    //timeTotalAmount
  }
  loadCurrentPlan()

  if ( loading ) {
    return (<div className = "mainContainer">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="title"></div>
    </div>); // Loading page
  } else {
  return (
    <div className = "mainContainer_isps">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>
      <Grid container spacing = {2} className= {classes.grid}>

        <Grid item xs = {12} md= {4} className = "barGrid">
          
            <div className = "horizontalBar">
              <img
                className = "title_bar_image"
                alt = "Main Logo AP"
                src = {mainAPLogo}
              ></img>
              <img
                className = "title_bar_image_text"
                alt = "Main Logo AP Text"
                src = {mainAPLogoText}
              ></img>

            </div>
        </Grid>

        <Grid item xs = {12} md= {4}>
        <ul className = "zacbar">
            <li className = "zacbaritem"><a href="https://auroraproxies.com/">Home</a></li>
            <li className = "zacbaritem"><a href="/dashboard">Residential</a></li>
            <li className = "zacbaritem"><a href="/isps">DataCenter</a></li>
            <li className = "zacbaritem"><a href="/purchase">Purchase</a></li>
        </ul>

        </Grid>

        <Grid item xs = {12} md= {4}>
          <div className = "signOutDiv">
            <button onClick={logoutFunc} className = "signOutButton">
              <div onLoad={loadDiscordData}>
                <img
                  className="discordImage"
                  alt="Discord Image"
                  src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.jpg`}
                ></img>
                
                {/* <span className="discordName">{user.username}</span> */}
                <span className = "signOutText">Sign Out</span>
              </div>
            </button>
          </div>
        </Grid>

        <Grid item xs = {12} md= {6} lg = {3}>
          <div className="proxyCol_isps">
            <span className="colTitleText_isps"> Authenticate </span>
                <div className = "proxyTextwDropdown_isps">
                <span className="proxy_text_isps"> Plans </span>
                <div className="custom-select">
                    <Dropdown
                    className="proxyDropdown_isps"
                    options={constants_Isps.options_proxy_plan}
                    onChange={(val) => {
                        handleProxyPlan(val.value);
                    }}
                    value={currentProxyPlan}
                    placeholder="Select a plan"
                    />
                </div>
                </div>
                <div className = "ipAddressInputContainer">
                    <p className="proxy_text_isps"> IP Address </p>
                    <input
                        type="string"
                        className="ipAddressInput"
                        id = "ipAddressInput"
                        value={""}
                    />
                </div>
          </div>
          
          <div className="twoButtons_isps">
                    <button
                    className="topUpBtn"
                    onClick={() => {
                        utils.checkoutSesh(user.discordId);
                        topUp();
                    }}
                    >
                    TOP UP
                    </button>
                    <button
                        className="authenticateBtn"
                        onClick={() => {
                            authenticateIp();
                        }}
                        >
                        AUTHENTICATE
                    </button>
            </div>
            <div className="support_isps">
            <span className="supportText"> Support</span>
            <div>
              {/* <span className="support_text"> If you ever need support or have questions, please create a ticket within the discord server.  Admins will be ready to respond to any issues you may have.</span> */}
            </div>
            <div className="supportIcons">
              <p className="igLogo">
                <a
                  href="https://www.instagram.com/auroraproxies/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ig_logo} alt="Insta" className="igLogoImg" />
                </a>
              </p>
              <p className="twitterLogo">
                <a
                  href="https://twitter.com/AuroraProxies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={twitter_logo}
                    alt="Twitter"
                    className="twitterLogoImg"
                  />
                </a>
              </p>
            </div>
          </div>
            
          

          
        </Grid>

        <Grid item xs = {12} md= {6} lg = {5}>
        <div className = "generateIpsCol_isps">
          <div className="gennedips_isps">
            <div>
              <span className="colTitleText_isps"> Order ISPS </span>
            </div>
            <div className="ips">
              {/* proxy table takes in an array of proxies and renders the rows */}
              <IpTable proxies={proxies}/>
            </div>
          </div>
          <div>
            <div className="twoButtons_isps">
              <button
                className="copy"
                onClick={() => {

                  if (window.isSecureContext)
                  {
                    navigator.clipboard.writeText(proxyString)
                  }
                }}
              >
                COPY
              </button>
              <button className="clear" onClick={handleClearProxies}>
                CLEAR
              </button>
            </div>
          </div>
        </div>
        </Grid>

        <Grid item xs = {12} md= {6} lg = {3}>
        <div className="graphContainer_isps">
            <div className="smallColTitleText">
            <span>
                Time Remaining: 
            </span>
            <span>
                {` `}
                {calculateTime()}{" "}
                {timeExpired} / {timeTotalAmount} {timeExpired}{" "}
            </span>
            </div>
            <div className = "circleProgressBarDiv">
                <CircularProgressbar value={50} text={`${50}%`} styles={buildStyles({textColor: '#fff', pathColor: "#DD4D84"})}/>
            </div>

        </div>
        <div className="ordersContainer_isps">
            <span className = "orderHistoryText">Order History</span>
            <div className="orders">
              {/* <OrderTable /> */}
            </div>
          </div>
        

          
        </Grid>
      </Grid>
    </div>
  );
 }
}

export default RefactoredIspsDashboard;




function IpTable({
  proxies, // an array of proxies
}) {
  return (
    <table id="ipTable_isps" className = "ipTable_isps">
      <tbody className = "ipTableBody_isps">
        <th>
          <td></td>
        </th>
        {proxies.map((proxy) => {
          return (
            <tr key={proxy}>
              <td>{proxy}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

//TODO NEEDS TO CALL A POST USING THE CORRESPONDING ORDERS TOKEN TO GET PROXIES
function getProxies({

}) {
  
}