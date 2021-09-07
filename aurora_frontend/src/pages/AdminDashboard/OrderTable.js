import React, { useState, useEffect, useRef } from "react";
import config from "../../config.json";

const MONGO_ENDPOINT = config.BACKEND_DOMAIN + config.ROUTES.mongo_user;

 class OrderTable extends React.Component {
   constructor(props) {
     super(props);
     this.state = { rows: [], returnString: `` };
   }

   componentDidMount = async () => {
    const data_response = await fetch(MONGO_ENDPOINT, {
       method: "GET",
       credentials: "include",
     });
     console.log("MONGO DATA: ");
     const data_session = await data_response.json();
     if (!data_session || !data_session.user) {
       console.log({ data_session });
       return;
     }
     console.log(data_session.user.resiOrders);

     this.setState({ rows: data_session.user.resiOrders.length }, () => {
       console.log("ROWS");
       console.log(this.state.rows);
       let table = document.getElementById("orderTable");

       table.innerHTML = `
               <table id = "orderTable">
                   <tr>
                       <th className = "ProductCol" id = "ProductCol" > Product </th>
                       <th className = "StartEndCol" id = "StartEndCol"> Start </th>
                       <th className = "StartEndCol" id = "StartEndCol"> End </th>
                       <th className = "AmountCol" id = "AmountCol"> Amount </th>
                   </tr>
               </table>`;
       for (var i = data_session.user.resiOrders.length - 1; i >= 0; i--) {
         console.log(data_session.user.resiOrders[i]);
         let newRow = table.insertRow(table.rows.length);
         let split = data_session.user.resiOrders[i].split(":");

         newRow.innerHTML = `<td style = "color: white"> Borealis </td>
                   <td style = "color: white"> ${split[0]} </td>
                   <td style = "color: white"> ${split[1]} </td>
                   <td style = "color: white"> ${split[2]} GB </td>`;
       }
     });
   };

   render() {
     return <table id="orderTable" className="orderTable"></table>;
   }
 } export default OrderTable;