import {Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import mainAPLogo from "../images/Aurora_Proxies_Logo.png";
import mainAPLogoText from "../images/Aurora_Proxies_Name.png";
import React, { useState, useEffect, useRef } from "react";
import constantsIsps from "./ISPS Dashboard/constantsIsps";
import constantsResis from "./Dashboard/constantsResis";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import {
  logoutFunc,
} from "./Dashboard/utils";
import config from "../config.json";
import "../styles/App.css";
import "../styles/Purchase.css";
import "../styles/background.sass";
import "../styles/react-dropdown.css";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${config.STRIPE_PUBLIC_TEST}`);

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

//TODO NEEDS LOAD USER DATA AND DISCORD DATA AND MAYBE MONGO DATA
function Purchase() {
    const classes = useStyles()
    const [user, setUser] = useState({});
    let price_index_resi = 0;
    let price_index_isp = 0;
    let current_price_resi = constantsResis.prices_proxy[0];
    let current_amount_resi = constantsResis.amounts_proxy[0];
    //TODO NEEDS TO UPDATE WITH ADMIN
    let current_price_isp = constantsIsps.prices_proxy[0];
    let current_amount_isp = constantsIsps.amounts_proxy[0];
    let ispArray = constantsIsps.isp_proxy_monthly;
    let inServer = true;
    let IP_ADDRESS = "";

    async function loadDiscordData() {
      console.log("Loading Discord data");
      // const data_response = await fetch(constants.DISCORD_SESSION_ENDPOINT, {
      //   credentials: "include",
      // });
      // const data_session = await data_response.json();
      // if (!data_session || !data_session.user) {
      //   return console.error("No logged in");
      // }
      // setUser(data_session.user);
      //loadDashboardData();
    }

    const plusClickResi = async(event) =>
    {
        console.log("plus clicked")
        if (price_index_resi < constantsIsps.gb_proxy.length - 1) {
            price_index_resi++;
        }
        console.log(price_index_resi)
        document.querySelector(".purchase_text_resi span").innerHTML = constantsIsps.gb_proxy[price_index_resi];
        current_price_resi = constantsResis.prices_proxy[price_index_resi];
        current_amount_resi = constantsResis.prices_proxy[price_index_resi];
            
    };

    const minusClickResi = async(event) =>
    {
        console.log("minus clicked")
        if (price_index_resi > 0) {
            price_index_resi--;
        }
        console.log(price_index_resi)
        document.querySelector(".purchase_text_resi span").innerHTML = constantsIsps.gb_proxy[price_index_resi];
        current_price_resi = constantsResis.prices_proxy[price_index_resi];
        current_amount_resi = constantsResis.prices_proxy[price_index_resi];
    };

    const plusClickIsp = async(event) =>
    {
        console.log("plus clicked")
        if (price_index_isp < ispArray.length - 1) {
          price_index_isp++;
        }
        console.log(price_index_isp)
        document.querySelector(".purchase_text_isp span").innerHTML = ispArray[price_index_isp];
        current_price_isp = constantsIsps.isp_prices[price_index_isp];
        current_amount_isp = constantsIsps.isp_amounts[price_index_isp];
            
    };

    const minusClickIsp = async(event) =>
    {
        console.log("minus clicked")
        if (price_index_isp > 0) {
          price_index_isp--;
        }
        console.log(price_index_isp)
        document.querySelector(".purchase_text_isp span").innerHTML = ispArray[price_index_isp];
        current_price_isp = constantsIsps.isp_prices[price_index_isp];
        current_amount_isp = constantsIsps.isp_amounts[price_index_isp];
    };

    const purchaseClickIsp= async (event) => {

      let discord_id = "";
      if (document.getElementById("discordid"))
      {
        discord_id = document.getElementById("discordid").value;
      }
      
      // let user_email = document.getElementById("useremail").value;
      console.log(discord_id);
      // console.log(user_email);
      
      // if (discord_id.length > 0 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user_email))
      
      //TODO THEY CAN ONLY PURCHASE IF THEY ARE IN OUR SERVER
      if (inServer)
      {

          let wantedAmount;

          console.log("fetching data");
          let data = await fetch(`${config.BACKEND_DOMAIN}/get-data`, {
              method: "GET",
          });
          console.log(data)
          var dataAmount = await data.json();
          console.log(dataAmount)

      
         
          console.log(`Data In Stock: ${dataAmount}`);

          wantedAmount = constantsIsps.amounts_proxy[price_index_isp];

          console.log("before data check");
          if (dataAmount >= wantedAmount) 
          {
              //TODO needs ip address
              window.location.replace(`http://stripe.auroraproxies.com/?amount=${current_amount_isp}&price=${current_price_isp}&ip=${IP_ADDRESS}`);
          } else {
              alert(`To purchase please follow us on our corresponding social channels and join our Discord` );
          }
      }
      else {
          alert ("Enter a valid discord id");
      }
    };

    const purchaseClickResi= async (event) => 
    {

      //TODO THEY CAN ONLY PURCHASE IF THEY ARE IN OUR SERVER
      if (inServer)
      {

          console.log("fetching data");
          let data = await fetch(`${config.BACKEND_DOMAIN}/get-data`, {
              method: "GET",
          });
          console.log(data)
          var dataAmount = await data.json();
          console.log(dataAmount)

          let wantedAmount = constantsResis.amounts_proxy[price_index_resi];

          console.log("before data check");
          if (dataAmount >= wantedAmount) 
          {
              //TODO needs ip address
              window.location.replace(`http://stripe.auroraproxies.com/?amount=${current_amount_resi}&price=${current_price_resi}&ip=${IP_ADDRESS}`);
          } else {
              alert(`To purchase please follow us on our corresponding social channels to join our Discord` );
          }
      }
    };


    return (
        <div className = "mainContainer_purchase">
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
                <div className = "purchaseBlock">
                  <div className = "purchaseTitle">
                    Borealis 
                  </div>
                  <div className = "purchaseTitle">
                    Residential 
                  </div>
                  <div className = "priceTitle">
                    ${18} / GB
                  </div>
                  <div className = "priceInfo">
                    Generate Unlimited Proxies
                  </div>
                  <div className = "priceInfo">
                    99.99% Uptime Across All Sites
                  </div>
                  <div className = "priceInfo">
                    Custom Optons Targeting (Countries)
                  </div>
                  <div className = "priceInfo">
                    User:Pass Authentication
                  </div>
                  <div className = "priceInfo">
                    Multiple Private Massive Pools
                  </div>
                  <div className = "priceInfo">
                    90 Day Expiration
                  </div>

                  <div className = "purchase_text_resi">
                    <FontAwesomeIcon icon={faMinus} onClick={minusClickResi} className = "minus"/>
                    <span className = "gb_proxy_text">{constantsResis.gb_proxy[price_index_resi]}</span>
                    <FontAwesomeIcon icon={faPlus} onClick={plusClickResi} className = "plus"/>                  
                  </div>

                  <button className = "purchaseResiBtn" onClick = {purchaseClickResi}>
                    Purchase
                  </button>



                </div>
              </Grid>
              <Grid item xs = {12} md= {6} lg = {3}>
                <div className = "purchaseBlock">
                  <div className = "purchaseTitle">
                    Polaris 
                  </div>
                  <div className = "purchaseTitle">
                    ISP 
                  </div>
                  <div className = "priceTitle">
                    {constantsIsps.price_time_frame}
                  </div>
                  <div className = "priceInfo">
                    100 GBPS Connection
                  </div>
                  <div className = "priceInfo">
                    IP Authentication
                  </div>
                  <div className = "priceInfo">
                    Unlimited Data Usage
                  </div>
                  <div className = "priceInfo">
                    Dedicated and Private
                  </div>
                  <div className = "priceInfo">
                    Activated During Drops
                  </div>
                  <div className = "priceInfo">
                    Retail Sites Supported
                  </div>

                  <div className = "purchase_text_isp">
                    <FontAwesomeIcon icon={faMinus} onClick={minusClickIsp} className = "minus"/>
                    <span className = "gb_proxy_text">{constantsIsps.amounts_proxy[price_index_isp]}</span>
                    <FontAwesomeIcon icon={faPlus} onClick={plusClickIsp} className = "plus"/>                  
                  </div>

                  <button className = "purchaseResiBtn" onClick = {purchaseClickIsp}>
                    Purchase
                  </button>



                </div>                  
              </Grid>
              <Grid item xs = {12} md= {6} lg = {3}>
                <div className = "purchaseBlock">
                  <div className = "comingSoonTitle">
                    Coming Soon 
                  </div>

                </div>

              </Grid>

          
            </Grid>
        </div>
        );
}

export default Purchase;