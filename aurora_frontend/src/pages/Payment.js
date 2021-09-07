import {Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import mainAPLogo from "../images/Aurora_Proxies_Logo.png";
import mainAPLogoText from "../images/Aurora_Proxies_Name.png";
import React, { useState, useEffect, useRef } from "react";
import constantsResis from "./Dashboard/constantsResis";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import {
  logoutFunc,
} from "./Dashboard/utils";
import config from "../config.json";
import "../styles/App.css";
import "../styles/Payment.css";
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

//TODO NEEDS TO CONNECT TO Purchase.js to get the price & amount
function Purchase() {
    const classes = useStyles()
    const [user, setUser] = useState({});
    let price_index_resi = 0;
    let price_index_isp = 0;
    let current_price_resi = constantsResis.prices_proxy[0];
    let current_price_isp = constantsResis.isp_proxy_monthly[0];
    let ispArray = constantsResis.isp_proxy_monthly;
    let inServer = true;

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

    //?STRIPE PAYMENT
    async function onLoad()
    {
        var stripe = loadStripe(`${config.STRIPE_PUBLIC_TEST}`);
        // The items the customer wants to buy
        var purchase = {
            items: [{ id: "prod_JKsbcnPIikClPF" }]
        };

        // Disable the button until we have Stripe set up on the page
        document.querySelector(".button_payment button").disabled = true;

        fetch("/create-payment-intent", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(purchase)
        })
        .then(function(result) {
            return result.json();
        })
        .then(function(data) {
            var elements = stripe.elements();
        
            var style = {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                color: "#32325d"
                }
            },
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#fa755a",
                iconColor: "#fa755a"
            }
            };

            var card = elements.create("card", { style: style });

            // Stripe injects an iframe into the DOM
            card.mount("#card-element");

            card.on("change", function (event) {
                // Disable the Pay button if there are no card details in the Element
                document.querySelector(".button_payment button").disabled = event.empty;
                document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
              });

            var form = document.getElementById("payment-form");
            form.addEventListener("submit", function(event) {
            event.preventDefault();
            // Complete payment when the submit button is clicked
            payWithCard(stripe, card, data.clientSecret);
            });
        });
    };

    var payWithCard = function(stripe, card, clientSecret) {
        loading(true);
        stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: card
            }
          })
          .then(function(result) {
            if (result.error) {
              // Show error to your customer
              showError(result.error.message);
            } else {
              // The payment succeeded!
              orderComplete(result.paymentIntent.id);
            }
          });
      };

      // Shows a success message when the payment is complete
        var orderComplete = function(paymentIntentId) {
            loading(false);
            document
            .querySelector(".result-message a")
            .setAttribute(
                "href",
                "https://dashboard.stripe.com/test/payments/" + paymentIntentId
            );
            document.querySelector(".result-message").classList.remove("hidden");
            document.querySelector(".button_payment button").disabled = true;

            window.location.replace(`${process.env.DOMAIN}/dashboard/stripesuccess/${current_price_resi}`)
            
        };

        // Show the customer the error from Stripe if their card fails to charge
        var showError = function(errorMsgText) {
            loading(false);
            var errorMsg = document.querySelector("#card-error");
            errorMsg.textContent = errorMsgText;
            setTimeout(function() {
            errorMsg.textContent = "";
            }, 4000);
        };
        
        // Show a spinner on payment submission
        var loading = function(isLoading) {
            if (isLoading) {
                // Disable the button and show a spinner
                document.querySelector(".button_payment button").disabled = true;
                document.querySelector("#spinner").classList.remove("hidden");
                document.querySelector("#button-text").classList.add("hidden");
            } else {
                document.querySelector(".button_payment button").disabled = false;
                document.querySelector("#spinner").classList.add("hidden");
                document.querySelector("#button-text").classList.remove("hidden");
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
              <head>
                <meta charset="utf-8" />
                <title>Accept a card payment</title>
                <meta name="description" content="A demo of a card payment on Stripe" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="/global.css" />
                <script src="https://js.stripe.com/v3/"></script>
                <script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch"></script>
                <script src="/client.js" defer></script>
            </head>
            <body>
                
                <form id="payment-form" className = "form_payment">
                <input type="text" id="email" placeholder="Email address" />
                <div id="card-element" className = "input_payment"></div>
                <button id="submit" className = "button_payment">
                    <div class="spinner hidden" id="spinner"></div>
                    <span id="button-text">Pay now</span>
                </button>
                <p id="card-error" role="alert"></p>
                <p class="result-message hidden">
                    Payment succeeded, see the result in your
                    <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
                </p>
                </form>
            </body>



                
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