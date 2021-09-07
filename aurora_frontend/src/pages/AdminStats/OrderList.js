import React from 'react';
import config from "../../config.json"

class OrderList extends React.Component{

    constructor(props) {
        super(props);
        this.state = { rows: 0, returnString : ``};
    }

    componentDidMount = async() => {
        console.log("COMPONENT DID MOUNT");
        let data_response = await fetch(`${config.BACKEND_DOMAIN}/access-mongo-users`, {
            method: "POST",
        });
        
        console.log("MONGO DATA: ")
        const data_session = await data_response.json();
        console.log(data_session.orders);   
        

        this.setState({rows: data_session.orders.length}, () => {
            console.log("ROWS");
            console.log(this.state.rows);
            let table = document.getElementById('orderTable');
        
            table.innerHTML = '<table id = "orderTable">' + '<tr>' + '<th className = "DiscordId" id = "ProductCol" >' + "DiscordId" + '</th><th className = "StartEndCol" id = "StartEndCol">' + "Price" + '</th><th className = "StartEndCol" id = "StartEndCol">' + "Email" + '</th><th className = "AmountCol" id = "AmountCol">' + "Date" + '</th></tr></table>';
            for (var i = data_session.orders.length - 1; i >= 0; i--) {
                console.log(data_session.orders[i])
                let newRow = table.insertRow(table.rows.length);
                
                newRow.innerHTML = '<td style = "color: white">' + data_session.orders[i].discordId + '</td>' + '<td style = "color: white">' + data_session.orders[i].price + '</td>' + '<td style = "color: white">' + data_session.orders[i].email + '</td>' + '<td style = "color: white">' + data_session.orders[i].date  + '</td>';
            }
        });
    }

    render() {

        return(
            <table id = "orderTable" className = 'orderTable'>
            </table>
        ) 
    }
    
} export default OrderList;