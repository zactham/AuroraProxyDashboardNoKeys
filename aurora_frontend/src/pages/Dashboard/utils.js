import constants from "./constantsResis"
import config from "../../config"


export function loadCountryMap(country_map, country_map_port) {
  country_map.set(constants.options_countries[0], "pr.auroraproxies.com:"); //Random
  country_map_port.set(constants.options_countries[0], 7777);
  country_map.set(constants.options_countries[1], "us-pr.auroraproxies.com:"); //USA
  country_map_port.set(constants.options_countries[1], 10000);
  country_map.set(constants.options_countries[2], "ca-pr.auroraproxies.com:"); //Canada
  country_map_port.set(constants.options_countries[2], 30000);
  country_map.set(constants.options_countries[3], "gb-pr.auroraproxies.com:"); //GB
  country_map_port.set(constants.options_countries[3], 20000);
  country_map.set(constants.options_countries[4], "it-pr.auroraproxies.com:"); //Italy
  country_map_port.set(constants.options_countries[4], 20000);
  country_map.set(constants.options_countries[5], "de-pr.auroraproxies.com:"); //Germany
  country_map_port.set(constants.options_countries[5], 30000);
  country_map.set(constants.options_countries[6], "fr-pr.auroraproxies.com:"); //France
  country_map_port.set(constants.options_countries[6], 40000);
  country_map.set(constants.options_countries[7], "es-pr.auroraproxies.com:"); //Spain
  country_map_port.set(constants.options_countries[7], 10000);
  country_map.set(constants.options_countries[8], "sa-pr.auroraproxies.com:"); //Saudi Arabia
  country_map_port.set(constants.options_countries[8], 44000);
  country_map.set(constants.options_countries[9], "se-pr.auroraproxies.com:"); //Sweden
  country_map_port.set(constants.options_countries[9], 30000);
  country_map.set(constants.options_countries[10], "gr-pr.auroraproxies.com:"); //Greece
  country_map_port.set(constants.options_countries[10], 40000);
  country_map.set(constants.options_countries[11], "pt-pr.auroraproxies.com:"); //Portugal
  country_map_port.set(constants.options_countries[11], 10000);
  country_map.set(constants.options_countries[12], "nl-pr.auroraproxies.com:"); //Netherlands
  country_map_port.set(constants.options_countries[12], 20000);
  country_map.set(constants.options_countries[13], "be-pr.auroraproxies.com:"); //Belgium
  country_map_port.set(constants.options_countries[13], 30000);
  country_map.set(constants.options_countries[14], "ru-pr.auroraproxies.com:"); //Russia
  country_map_port.set(constants.options_countries[14], 40000);
  country_map.set(constants.options_countries[15], "ua-pr.auroraproxies.com:"); //Ukraine
  country_map_port.set(constants.options_countries[15], 10000);
  country_map.set(constants.options_countries[15], "pl-pr.auroraproxies.com:"); //Poland
  country_map_port.set(constants.options_countries[15], 20000);
  country_map.set(constants.options_countries[16], "il-pr.auroraproxies.com:"); //Israel
  country_map_port.set(constants.options_countries[16], 20000);
  country_map.set(constants.options_countries[17], "tr-pr.auroraproxies.com:"); //Turkey
  country_map_port.set(constants.options_countries[17], 30000);
  country_map.set(constants.options_countries[18], "au-pr.auroraproxies.com:"); //Australia
  country_map_port.set(constants.options_countries[18], 40000);
  country_map.set(constants.options_countries[19], "my-pr.auroraproxies.com:"); //Malaysia
  country_map_port.set(constants.options_countries[19], 10000);
  country_map.set(constants.options_countries[20], "th-pr.auroraproxies.com:"); //Thailand
  country_map_port.set(constants.options_countries[20], 20000);
  country_map.set(constants.options_countries[21], "kr-pr.auroraproxies.com:"); //South Korea
  country_map_port.set(constants.options_countries[21], 30000);
  country_map.set(constants.options_countries[22], "jp-pr.auroraproxies.com:"); //Japan
  country_map_port.set(constants.options_countries[22], 40000);
  country_map.set(constants.options_countries[23], "ph-pr.auroraproxies.com:"); //Philippines
  country_map_port.set(constants.options_countries[23], 10000);
  country_map.set(constants.options_countries[24], "sg-pr.auroraproxies.com:"); //Singapore
  country_map_port.set(constants.options_countries[24], 20000);
  country_map.set(constants.options_countries[25], "cn-pr.auroraproxies.com:"); //China
  country_map_port.set(constants.options_countries[25], 30000);
  country_map.set(constants.options_countries[26], "hk-pr.auroraproxies.com:"); //Hong Kong
  country_map_port.set(constants.options_countries[25], 40000);
  country_map.set(constants.options_countries[26], "tw-pr.auroraproxies.com:"); //Taiwan
  country_map_port.set(constants.options_countries[26], 10000);
  country_map.set(constants.options_countries[27], "in-pr.auroraproxies.com:"); //India
  country_map_port.set(constants.options_countries[27], 20000);
  country_map.set(constants.options_countries[28], "pk-pr.auroraproxies.com:"); //Pakistan
  country_map_port.set(constants.options_countries[28], 30000);
  country_map.set(constants.options_countries[29], "ir-pr.auroraproxies.com:"); //Iran
  country_map_port.set(constants.options_countries[29], 40000);
  country_map.set(constants.options_countries[30], "id-pr.auroraproxies.com:"); //Indonesia
  country_map_port.set(constants.options_countries[30], 10000);
  country_map.set(constants.options_countries[31], "az-pr.auroraproxies.com:"); //Azerbaijan
  country_map_port.set(constants.options_countries[31], 20000);
  country_map.set(constants.options_countries[32], "kz-pr.auroraproxies.com:"); //Kazakhstan
  country_map_port.set(constants.options_countries[32], 30000);
  country_map.set(constants.options_countries[33], "ae-pr.auroraproxies.com:"); //UAE
  country_map_port.set(constants.options_countries[33], 40000);
  country_map.set(constants.options_countries[34], "mx-pr.auroraproxies.com:"); //Mexico
  country_map_port.set(constants.options_countries[34], 10000);
  country_map.set(constants.options_countries[35], "br-pr.auroraproxies.com:"); //Brazil
  country_map_port.set(constants.options_countries[35], 20000);
  country_map.set(constants.options_countries[36], "ar-pr.auroraproxies.com:"); //Argentina
  country_map_port.set(constants.options_countries[36], 30000);
  country_map.set(constants.options_countries[37], "cl-pr.auroraproxies.com:"); //Chile
  country_map_port.set(constants.options_countries[37], 40000);
  country_map.set(constants.options_countries[38], "pe-pr.auroraproxies.com:"); //Peru
  country_map_port.set(constants.options_countries[38], 10000);
  country_map.set(constants.options_countries[39], "pe-pr.auroraproxies.com:"); //Ecuador
  country_map_port.set(constants.options_countries[39], 10000);
  country_map.set(constants.options_countries[39], "co-pr.auroraproxies.com:"); //Colombia
  country_map_port.set(constants.options_countries[39], 30000);
  country_map.set(constants.options_countries[40], "za-pr.auroraproxies.com:"); //South Africa
  country_map_port.set(constants.options_countries[40], 40000);
  country_map.set(constants.options_countries[41], "dk-pr.auroraproxies.com:"); //Denmark
  country_map_port.set(constants.options_countries[41], 19000);
  country_map.set(constants.options_countries[41], "eg-pr.auroraproxies.com:"); //Egypt
  country_map_port.set(constants.options_countries[41], 10000);
}

export function logoutFunc() {
  window.location.replace(config.BACKEND_DOMAIN + "/signout");
}

export function clearList() {
  console.log("Clearing list.");
  let table = document.getElementById("ipTable");
  for (var i = table.rows.length - 1; i >= 0; i--) {
    table.deleteRow(i);
  }
}

export function copyList() {
  document.execCommand("copy");
}

export async function purchaseClick (current_price) {
  console.log("current prce: " + current_price);
  let response;
  const stripe = await constants.stripePromise;

  response = await fetch(`${config.BACKEND_DOMAIN}/create-checkout-session/${current_price}`, {
    method: "POST",
  });
  console.log("after stripe post");
  const session = await response.json();
  // When the customer clicks on the button, redirect them to Checkout.
  console.log(session);
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
  if (result.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  }
};

export async function plusClick (price_index, current_price, document) {
  console.log("plus clicked");
  if (price_index < constants.gb_proxy.length - 1) {
    price_index++;
  }
  console.log(price_index);
  document.querySelector(".purchase_text text").innerHTML =
    constants.gb_proxy[price_index];
  current_price = constants.prices_proxy[price_index];
};

export async function minusClick (price_index, current_price, document) {
  console.log("minus clicked");
  if (price_index > 0) {
    price_index--;
  }
  console.log(price_index);
  document.querySelector(".purchase_text text").innerHTML =
    constants.gb_proxy[price_index];
  current_price = constants.prices_proxy[price_index];
};

export async function generateClick ( proxy_amount, current_proxy_plan, country_map, current_proxy_country, current_proxy_type, 
  port_set, user, country_map_port, document) {
  proxy_amount = document.getElementsByClassName("quantity")[0].value;

  //BOREALIAS
  if (current_proxy_plan === constants.options_proxy_plan[0]) {
    let country_code = country_map.get(current_proxy_country);
    let country_port = country_map_port.get(current_proxy_country);

    //STATIC
    if (current_proxy_type === constants.options_proxy_type[0]) {
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
            Math.floor(Math.random() * country_port + 9999) +
            country_port +
            1;
        }
        let proxy = `${country_code}${country_port}:${user.user_traffic}:${user.password}`;
        var row = document.getElementById("ipTable").insertRow(i);
        var cell = row.insertCell(0);

        cell.innerHTML = String(proxy);
        // textArea.innerText += `${proxy}     `;
      }
    }
    //ROTATING
    else {
      for (let i = 0; i < proxy_amount; i++) {
        let proxy = `${country_code}${country_port}:${user.user_traffic}:${user.password}`;
        row = document.getElementById("ipTable").insertRow(i);
        cell = row.insertCell(0);
        cell.innerHTML = proxy;
      }
    }
  }

  //     // let gen_command =
  console.log("generate button clicked");
  console.log(current_proxy_plan);
  console.log(current_proxy_type);
  console.log(current_proxy_country);
  console.log("proxy amount: " + proxy_amount);
};

