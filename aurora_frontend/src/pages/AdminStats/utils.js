import config from "../../config.json"
export async function setData() { 

    let input = document.getElementById("dataInput").value;
    
    if (input) { 
        let response;

        response = await fetch(`${config.BACKEND_DOMAIN}/updatedata/${input}`, {
            method: "POST",
        });

        alert("Data changed to " + input);
    }
}

export async function setISPSDataLimit() { 

    let input = document.getElementById("limitInput").value;
    
    if (input) { 
        let response;

        response = await fetch(`${config.BACKEND_DOMAIN}/updatelimit/${input}`, {
            method: "POST",
        });

        alert("Limit changed to " + input);
    }
}

export async function setISPSExpiryHours() { 

    let input = document.getElementById("expiryInput").value;
    
    if (input) { 
        let response;

        response = await fetch(`${config.BACKEND_DOMAIN}/updateexpiry/${input}`, {
            method: "POST",
        });

        alert("Expiry changed to " + input);
    }
}

export async function setISPSPrices() { 

    let input = document.getElementById("pricesInput").value;
    
    if (input) { 
        let response;

        response = await fetch(`${config.BACKEND_DOMAIN}/updateprices/${input}`, {
            method: "POST",
        });

        alert("Prices changed to " + input);
    }
}

export async function setISPSServerName() { 

    let input = document.getElementById("serverInput").value;
    
    if (input) { 
        let response;

        response = await fetch(`${config.BACKEND_DOMAIN}/updateserver/${input}`, {
            method: "POST",
        });

        alert("Data changed to " + input);
    }
}

export async function setISPSTopUpData() { 

    let input = document.getElementById("topUpDataInput").value;
    
    if (input) { 
        let response;

        response = await fetch(`${config.BACKEND_DOMAIN}/updatetopupdata/${input}`, {
            method: "POST",
        });

        alert("Top up data changed to " + input);
    }
}

export async function setISPSTopUpExpiry() { 

    let input = document.getElementById("topUpExpiryInput").value;
    
    if (input) { 
        let response;

        response = await fetch(`${config.BACKEND_DOMAIN}/updatetopupexpiry/${input}`, {
            method: "POST",
        });

        alert("Top up expiry changed to " + input);
    }
}