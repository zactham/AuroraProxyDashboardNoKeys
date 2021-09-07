import logo from "../images/ap_logotext_white.png";
import twitter_logo from "../images/ap_logo_twitter.png";
import ig_logo from "../images/ap_logo_ig.png";
import mainAPLogo from "../images/Aurora_Proxies_Logo.png";
import mainAPLogoText from "../images/Aurora_Proxies_Name.png";
import settings from "../config";
import React, { useState, useEffect, useRef } from "react";
import {makeStyles} from "@material-ui/core/styles"
import {Grid, Paper} from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { PieChart } from "react-minimal-pie-chart";
import ProgressBar from "@ramonak/react-progress-bar";
import Dropdown from "react-dropdown";
import "../styles/App.css";
import "../styles/background.sass";
import "../styles/react-dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import config from "../config.json";
import OrderTable from "./AdminDashboard/OrderTable";
import constants from "./AdminDashboard/constants";
import {
  loadCountryMap,
  logoutFunc,
  clearList,
  copyList,
  purchaseClick,
  plusClick,
  minusClick,
  generateClick,
} from "./AdminDashboard/utils";
import { green } from "@material-ui/core/colors";
let country_map = new Map();
let country_map_port = new Map();
let port_set = new Set();
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
  
loadCountryMap(country_map, country_map_port);
// Make sure to call `loadStripe` outside of a component’s render to avoid
function AdminDashboard() {
  const classes = useStyles()

  const urlList = window.location.href.split('/');
  const wantedUser = urlList[urlList.length - 1];
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [priceIndex, setPriceIndex] = useState(0);
  const [currentProxyPlan, setCurrentProxyPlan] = useState(
    constants.options_proxy_plan[0]
  );
  const [current_proxy_type, setcurrent_proxy_type] = useState(
    constants.options_proxy_type[0]
  );
  const [current_proxy_country, setcurrent_proxy_country] = useState(
    constants.options_countries[0]
  );
  const [proxy_amount, setproxy_amount] = useState(1);
  // proxies = an array of the proxy strings
  const [proxies, setProxies] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(18);
  

  useEffect(() => {
    loadDiscordData(setUser);
    loadDashboardData();
  }, []);

  // run this code every time currentProxyPlan changes
  useEffect(() => {
    console.log({ currentProxyPlan });
  }, [currentProxyPlan]);

  const handleProxyPlan = (value) => {
    setCurrentProxyPlan(value);
  };
  // takes in -1 or +1
  const handlePriceChange = (change) => {
    if (
      priceIndex + change < 0 ||
      priceIndex + change >= constants.gb_proxy.length
    ) {
      return;
    }

    setCurrentPrice(constants.prices_proxy[priceIndex + change]);
    setPriceIndex(priceIndex + change);
    
  };

  const handleProxyAmount = (event) => {
    const value = event.currentTarget.value;
    const toNum = parseInt(value);
    if (toNum < 1 || toNum >= 10_000) {
      return;
    }
    return setproxy_amount(toNum);
  };

  const handleGenerate = () => {
    if (currentProxyPlan !== constants.options_proxy_plan[0]) {
      return;
    }
    const country_code = country_map.get(current_proxy_country);
    const country_port = country_map_port.get(current_proxy_country);

    // STATIC
    if (current_proxy_type === constants.options_proxy_type[0]) {
      const getProxiesConfig = {
        proxy_amount,
        current_proxy_country,
        country_port,
        country_code,
        username,
        password
      };
      const newProxiesList = [...proxies, ...getProxies(getProxiesConfig)];
      return setProxies(newProxiesList);
    }
    setProxies(["this is a new proxy"]);
  };

  const handleClearProxies = () => {
    setProxies([]);
  };

  async function loadDiscordData() {
    console.log("Loading Discord data");
    const data_response = await fetch("${config.BACKEND_DOMAIN}/dashboard/access-discord-info", {
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

    let [user_traffic, setTraffic] = useState(0)
    let [user_traffic_limit, setTrafficLimit] = useState(0)
    let [username, setUsername] = useState()
    let [password, setPassword] = useState()
    let [discordUsername, setDiscordUsername] = useState()

    
    async function loadDashboardData () {
        
        console.log("Loading dashboard data.")
    
        let data_response = await fetch(`${config.BACKEND_DOMAIN}/admindashboard/access-wanted-user-data/${wantedUser}`, {
            method: "POST",
            });
    
        const data_session = await data_response.json();

        setTraffic(data_session.user_traffic);
        setTrafficLimit(data_session.user_traffic_limit);
        setUsername(data_session.username);
        setPassword(data_session.password);
        setDiscordUsername(data_session.discordUsername)
        
    };

    function calculateProgress (user)
    {
      if (user && user.user_traffic_limit > 0)
      {
        return 100 * 
        user.user_traffic / user.user_traffic_limit;
      }
      else 
        return 0;
      
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
        <div className = "mainContainer">
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
                  {/* <div onLoad={loadDiscordData}>
                    {/* <img
                      className="discordImage"
                      alt="Discord Image"
                      src={`https://cdn.discordapp.com/avatars/${discordId}/${avatar}.jpg`}
                    ></img>
                    
                    {/* <span className="discordName">{user.username}</span>
                    <text className = "signOutText">Sign Out</text>
                  </div> */}
                </button>
              </div>
            </Grid>
    
            <Grid item xs = {12} md= {6} lg = {3}>
              <div className="proxyCol">
              <span className="colTitleText"> Generate </span>
                <div className = "proxyTextwDropdown">
                  <span className="proxy_text"> Plans </span>
                  <div className="custom-select">
                    <Dropdown
                      className="proxyDropdown"
                      options={constants.options_proxy_plan}
                      onChange={(val) => {
                        handleProxyPlan(val.value);
                      }}
                      value={currentProxyPlan}
                      placeholder="Select a plan"
                    />
                  </div>
                </div>
                <div>
                  <span className="proxy_text"> Types </span>
                  <div className="custom-select">
                    <Dropdown
                      className="proxyTypeDropdown"
                      options={constants.options_proxy_type}
                      onChange={(val) => {
                        current_proxy_type = val.value;
                      }}
                      value={constants.options_proxy_type[0]}
                      placeholder="Select a proxy type"
                    />
                  </div>
                </div>
    
                <div>
                  <span className="proxy_text">Countries</span>
                  <div className="custom-select">
                    <Dropdown
                      className="proxyCountryDropdown"
                      options={constants.options_countries}
                      onChange={(val) => {
                        current_proxy_country = val.value;
                      }}
                      value={constants.options_countries[0]}
                      placeholder="Select a country"
                    />
                  </div>
                </div>
    
                <div>
                  <span className="proxy_text"> Quantity </span>
                  <input
                    type="number"
                    className="quantity"
                    max="10000"
                    onChange={handleProxyAmount}
                    value={proxy_amount}
                  />
                </div>
              </div>
              <div>
                <button
                  className="generateBtn"
                  onClick={() => {
                    handleGenerate();
                  }}
                >
                  GENERATE
                </button>
              </div>
    
              <div className="support">
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
            <div className = "generateIpsCol">
              <div className="gennedips">
                <div className="genTitle">
                  <span className="colTitleText"> Generated IPs </span>
                </div>
                <div className="ips">
                  {/* proxy table takes in an array of proxies and renders the rows */}
                  <IpTable proxies={proxies}/>
                </div>
              </div>
              <div>
                <div className="twoButtons">
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
            <div className="graphContainer">
                  <div className="smallColTitleText">
                    <span>
                      Data Usage: 
                    </span>
                    <span>
                      {` `}
                      {calculateProgress(user)}{" "}
                      GB / {user_traffic_limit} GB{" "}
                    </span>
                  </div>
    
                  
    
                  <ProgressBar completed={calculateProgress(user)} bgColor = "#DD4D84" height = "25px" labelAlignment = "left" width = "100%"/>
    
              </div>
              <div className="ordersContainer">
                
              <span className = "orderHistoryText">Order History</span>
                
                <div className="orders">
                  <OrderTable />
                </div>
              </div>
            </Grid>
          </Grid>
    
          
        </div>
      );
    }
}
    
  
  export default AdminDashboard;

  function IpTable({
    proxies, // an array of proxies
  }) {
    return (
      <table id="ipTable" className = "ipTable">
        <tbody className = "ipTableBody">
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
  
  function getProxies({
    proxy_amount,
    current_proxy_country,
    country_port,
    country_code,
    username,
    password,
  }) {
    const proxies = [];
    const proxiesString = "";
    for (let i = 0; i < proxy_amount; i++) {
      if (current_proxy_country === "Random") {
        country_port = Math.floor(Math.random() * 50000) + 10000;
        if (port_set.has(country_port) === true) {
          while (port_set.has(country_port)) {
            console.log("ALREADY USED THIS PORT");
            country_port = Math.floor(
              Math.random() * (50000 - 10000 + 1) + 10000
            );
          }
        } else {
          port_set.add(country_port);
        }
      } else {
        country_port =
          Math.floor(Math.random() * country_port + 9999) + country_port + 1;
      }
      const proxy = `${country_code}${country_port}:${username}:${password}\n`;
      proxyString += proxy;
      proxies.push(proxy);
    }
    return proxies;
  }
  