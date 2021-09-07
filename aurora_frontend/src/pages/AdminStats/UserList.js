import React, { useState, useEffect, useRef } from "react";
import config from "../../config.json";

const MONGO_ENDPOINT = config.BACKEND_DOMAIN + config.ROUTES.mongo_user;

 class UserList extends React.Component {
   constructor(props) {
     super(props);
     this.state = { rows: [], returnString: `` };
   }

   componentDidMount = async () => {
    const data_response = await fetch(`${config.BACKEND_DOMAIN}/access-mongo-users`, {
       method: "POST",
       credentials: "include",
     });
     console.log("MONGO DATA: ");
     const data_session = await data_response.json();
     if (!data_session || !data_session.users) {
       console.log({ data_session });
       return;
     }
     console.log("USERS");
     console.log(data_session.users);

     this.setState({ rows: data_session.users.length }, () => {
       console.log("ROWS");
       console.log(this.state.rows);
       let table = document.getElementById("userTable");

       table.innerHTML = `
               <table id = "userTable">
                   <tr>
                       <th className = "StartEndCol" id = "StartEndCol" > DiscordId </th>
                       <th className = "StartEndCol" id = "StartEndCol"> Username </th>
                       <th className = "StartEndCol" id = "StartEndCol"> Email </th>
                       <th className = "StartEndCol" id = "StartEndCol"> OxyUsername </th>
                       <th className = "StartEndCol" id = "StartEndCol" > OxyPassword </th>
                       <th className = "StartEndCol" id = "StartEndCol"> Traffic Limit </th>
                       <th className = "StartEndCol" id = "StartEndCol"> Resi Bought($) </th>
                       <th className = "StartEndCol" id = "StartEndCol"> ISPS Bought($) </th>
                   </tr>
               </table>`;

       for (var i = 0; i < data_session.users.length ; i++) {
         console.log("USER IN FOR LOOP: ");
         console.log(data_session.users[i]);
         let resiPrice = 0;
         let orderString = [];

         for (var j = 0; j < data_session.users[i].resiOrders.length; j++) {
            orderString = data_session.users[i].resiOrders[j].split(':'); // Amount of resi is at position 2
            
            if (orderString[2] === "1") {
                resiPrice += 18;
            } else if (orderString[2] === "2") {
                resiPrice += 36;
            } else if (orderString[2] === "3") {
                resiPrice += 54;
            } else if (orderString[2] === "4") {
                resiPrice += 72;
            } else if (orderString[2] === "5") {
                resiPrice += 96;
            } else if (orderString[2] === "6") {
                resiPrice += 108;
            } else if (orderString[2] === "7") {
                resiPrice += 126;
            } else if (orderString[2] === "8") {
                resiPrice += 144;
            } else if (orderString[2] === "9") {
                resiPrice += 162;
            } else if (orderString[2] === "10") {
                resiPrice += 180;
            } else if (orderString[2] === "20") {
                resiPrice += 360;
            } else if (orderString[2] === "30") {
                resiPrice += 540;
            } else if (orderString[2] === "40") {
                resiPrice += 720;
            } else if (orderString[2] === "50") {
                resiPrice += 900;
            }
         }

         let newRow = table.insertRow(table.rows.length);

         newRow.innerHTML = `<td style = "color: white"> <a href="${config.BACKEND_DOMAIN}/admindashboard/${data_session.users[i].discordId}">${data_session.users[i].discordId}</a> </td>
                   <td style = "color: white"> ${data_session.users[i].username} </td>
                   <td style = "color: white"> ${data_session.users[i].email} </td>
                   <td style = "color: white">  ${data_session.users[i].oxyUsername} </td>
                   <td style = "color: white"> ${data_session.users[i].password} </td>
                   <td style = "color: white"> ${data_session.users[i].traffic_limit} </td>
                   <td style = "color: white"> ${resiPrice} </td>
                   <td style = "color: white">  N/A </td>`;
       }
     });
   };

   render() {
     return <table id="userTable" className="userTable"></table>;
   }
 } export default UserList;