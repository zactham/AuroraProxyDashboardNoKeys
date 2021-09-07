import React from 'react';
import config from "../../config.json"

class UserSums extends React.Component{

    constructor(props) {
        super(props);
        this.state = { rows: 0, returnString : ``};
    }

    componentDidMount = async() => {
        console.log("COMPONENT DID MOUNT");
        let data_response = await fetch(`${config.BACKEND_DOMAIN}/access-mongo-users`, {
            method: "POST",
        });
        
        const data_session = await data_response.json();
        let userMap = new Map();

       data_session.orders.sort(function(a, b) {
            if(a.discordId < b.discordId) { return -1; }
            if(a.discordId > b.discordId) { return 1; }
            return 0;
        });

        data_session.orders.forEach(order  => 
        {
            if (userMap.has(order.discordId) === false)  {
                userMap.set(order.discordId, order.price);
            } else {
                userMap.set(order.discordId, userMap.get(order.discordId) + order.price);
            }
        }        
        );

        

        this.setState({rows: data_session.orders.length}, () => {
            //console.log("ROWS");
            //console.log(this.state.rows);
            let table = document.getElementById('userSums');
        
            table.innerHTML = '<table id = "userSums">' + '<tr>' + '<th className = "DiscordId" id = "ProductCol" >' + "DiscordId" + '</th><th className = "StartEndCol" id = "StartEndCol">' + "Total Price" + '</th></tr></table>';

            userMap.forEach((value, key)  => 
            {
                let newRow = table.insertRow(table.rows.length);
                
                newRow.innerHTML = '<td style = "color: white">' + key + '</td>' + '<td style = "color: white">' + value + '</td>';
            }        
        );
        });
    }

    render() {

        return(
            <table id = "userSums" className = 'userSums'>
            </table>
        ) 
    }
    
} export default UserSums;