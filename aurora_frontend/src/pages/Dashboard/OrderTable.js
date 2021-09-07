import React, { useState, useEffect, useRef } from "react";
import config from "../../config.json";

const MONGO_ENDPOINT = config.BACKEND_DOMAIN + config.ROUTES.mongo_user;

class OrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [], returnString: `` };
  }

  componentDidMount = async () => {
    let data_response = await fetch(`${config.BACKEND_DOMAIN}/dashboard/access-discord-info/${this.props.wantedSession}`, {
      method: "GET",
      credentials: "include",
    });

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
/*
function OrderTable() {
  const [state, setState] = useState({ user: {} });
  const mounted = useRef(false);
  const getMongoData = async () => {
    const data_response = await fetch(`${config.BACKEND_DOMAIN}/access-mongo-user`, {
      method: "GET",
      credentials: "include",
    });
    const data_session = await data_response.json();
    if (!data_session || !data_session.user) {
      console.log({ data_session });
      return;
    }
    if (mounted.current) {
      setState(data_session);
    }
  };
  useEffect(() => {
    mounted.current = true;
    getMongoData();
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <table id="orderTable" className="orderTable">
      <tbody>
        {state.user.resiOrders && (
          <>
            <tr>
              <th className="ProductCol" id="ProductCol">
                Product
              </th>
              <th className="StartEndCol" id="StartEndCol">
                Start
              </th>
              <th className="StartEndCol" id="StartEndCol">
                End
              </th>
              <th className="AmountCol" id="AmountCol">
                Amount
              </th>
            </tr>
            {/* sort it first }
            {state.user.resiOrders.map((order) => {
              const split = [1, 2, 3]; // do something on order to get split
              return (
                <tr>
                  <td style="color: white"> Borealis </td>
                  <td style="color: white"> ${split[0]} </td>
                  <td style="color: white"> ${split[1]} </td>
                  <td style="color: white"> ${split[2]} GB </td>
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
}
export default OrderTable; */

 /* class OrderTable extends React.Component {
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
 } export default OrderTable; */