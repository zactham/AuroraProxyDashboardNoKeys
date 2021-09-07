import constantsIsps from "./constantsIsps"

let current_price = constantsIsps.prices_proxy[0];
var price_index = 0
function copyList() {
    document.execCommand("copy");
  }

function clearList() {
    console.log("Clearing list.")
    let table = document.getElementById("ipTable");
    for (var i = table.rows.length - 1; i >= 0; i--) {
        table.deleteRow(i);
    }
}
function renewPlan()
{

}

async function plusClick()
    {
        console.log("plus clicked")
        if (price_index < constantsIsps.gb_proxy.length - 1) {
            price_index++;
        }
        console.log(price_index)
        document.querySelector(".purchase_text text").innerHTML = constantsIsps.gb_proxy[price_index];
        current_price = constantsIsps.prices_proxy[price_index];
            
    };

    async function minusClick()
    {
        console.log("minus clicked")
        if (price_index > 0) {
            price_index--;
        }
        console.log(price_index)
        document.querySelector(".purchase_text text").innerHTML = constantsIsps.gb_proxy[price_index];
        current_price = constantsIsps.prices_proxy[price_index];
    };
    

    async function purchaseClick() {

        let discord_id = document.getElementById("discordid").value;
        console.log(discord_id);
        //TODO CHECK THAT THEY ARE IN OUR SERVER
        if (discord_id.length > 0)
        {
            let data;
            let wantedAmount;

            console.log("fetching data");
            data = await fetch('/get-data', {
                method: "GET",
            });

            const dataAmount = await data.json();
            console.log(dataAmount.data[0].dataLeft);

            if (current_price === constantsIsps.prices_proxy[0]) 
            {
                wantedAmount = constantsIsps.amounts_proxy[0];
            } 
            else if (current_price === constantsIsps.prices_proxy[1])
            {
                wantedAmount = constantsIsps.amounts_proxy[1];
            } 
            console.log("before data check");
            if (dataAmount.data[0].dataLeft >= wantedAmount) 
            {
                let newData = dataAmount.data[0].dataLeft - wantedAmount;
                let response;
                console.log("Before update data check.")
                response = await fetch(`/updatedata/${newData}`, {
                    method: "POST",
                });
                console.log("After updata data check")


                const stripe = await constantsIsps.stripePromise;
                console.log("about to post the checkout session");
                // response = await fetch(`/create-checkout-session/${current_price}/${encodeURIComponent(discord_id)}/${encodeURIComponent(user_email)}/${wantedAmount}`, {
                response = await fetch(`/create-checkout-session/${current_price}/${encodeURIComponent(discord_id)}/${wantedAmount}`, {
                    method: "POST",
                });
                console.log("session awaiting response.json");
                
                const session = await response.json();
                // When the customer clicks on the button, redirect them to Checkout.
                console.log(session)
                const result = await stripe.redirectToCheckout({
                sessionId: session.id,
                });
                if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer
                // using `result.error.message`.
                }
            } else {
                // alert(`${dataAmount.data[0].dataLeft} left.` );
                alert(`Sold Out` );
            }

        }
        else {
            alert ("Haha nice try, please follow us on Twitter @AuroraProxies to join our server :)");
        }
      };

      async function checkoutSesh(discordId)
      {
            //TODO FETCH THE TOP UP TOKEN / ORDER VARIABLE FROM MONGO AND CHECK IF IT IS TRUE
            //TODO ALSO CHECK IF THE GLOBAL TOP UP ENABLED VARIABLE IS TRUE
            //TODO fetch the amount their order costs

            let tempPrice = 5;
            let response;
            const stripe = await constantsIsps.stripePromise;
            console.log(`about to post the checkout session with ${tempPrice} for user ${discordId}`);
                
            response = await fetch(`/create-checkout-session/${tempPrice}`, {
                method: "POST",
            });

            console.log("session awaiting response.json");
                
            const session = await response.json();
            // When the customer clicks on the button, redirect them to Checkout.
            console.log(session)
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
                
                
                });

            if (result.error) {
                console.log("browser error")
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            }
      }

    


export default {copyList, clearList, renewPlan, plusClick, minusClick, purchaseClick, price_index, checkoutSesh}