import React from 'react';
import config from "../../config.json"

class OrderStats extends React.Component {

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
        console.log(data_session);   
        let number_of_users = 0;
        data_session.users.forEach(user => {
            number_of_users = number_of_users + 1;
        });

        let data;

        data = await fetch('${config.BACKEND_DOMAIN}/get-data', {
            method: "GET",
        });

        const dataAmount = await data.json();
        //console.log(dataAmount.data[0].dataLeft);

        this.setState({rows: 1}, () => {
            console.log(this.state.rows);
            let table = document.getElementById('orderStats');
            table.innerHTML = '';
            let newRow = table.insertRow(table.rows.length);
            newRow.innerHTML = '<th style = "color: white">' + "# of Users"+ '</th>' + '<td style = "color: white">' + data_session.users.length + '</td>';

            newRow = table.insertRow(table.rows.length);
            newRow.innerHTML = '<th style = "color: white">' + "Current Data Left"+ '</th>' + '<td style = "color: white">' + dataAmount.data + '</td>';
        });
    }

    render() {

        return(
            <table id = "orderStats" className = 'orderStats'>
            </table>
        ) 
    }
} export default OrderStats;