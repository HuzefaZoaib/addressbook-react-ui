import axios from "axios";
import { useEffect, useState } from "react";

const ADDRESSESS = [
  {id:1, name:"John", phone:"38495345", address:"Some Street 1"},
  {id:2, name:"Gautham", phone:"12495345", address:"Some Street 1"},
  {id:3, name:"Jerand", phone:"54495345", address:"Some Street 1"},
  {id:4, name:"Jerry", phone:"98495345", address:"Some Street 1"}
];

let MAX_ADDRESS_ID = 4;
let IS_API_SERVER_LIVE = true;

  function AddressRecord({addressess=[]}) {
    
    const records = addressess.map( address => 
      <tr>
        <td>{address.id}</td>
        <td>{address.name}</td>
        <td>{address.phone}</td>
        <td>{address.address}</td>
      </tr>
    );
  
    return records;
  }
  
  function ServerDownWarningMsg() {
    if( !IS_API_SERVER_LIVE ) {
      return (
      <div class="warning-msg">
        Backend API is down, application will be running locally. 
        <br/>However, still you can add new address.
      </div>);
    }
  }

  export default function AddressList() {
  
    const [addressess, setAddressess] = useState(ADDRESSESS);
    const [isApiServerLive, setIsApiServerLiver] = useState(IS_API_SERVER_LIVE);
  
    // Fetch records here or pass it through param
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URI}/list`).then(
      response => {
          setAddressess(response.data);
          return;
      }
      ).catch(error => {
        IS_API_SERVER_LIVE = false;
        setIsApiServerLiver(false);
        console.error(error);})}, []); 
  
    return (<>
      <ServerDownWarningMsg />
      <table>
        <thead>
          <tr>
            <th class="header">ID</th>
            <th class="header">Name</th>
            <th class="header">Phone</th>
            <th class="header">Address</th>
          </tr>
        </thead>
        <tbody>
          <AddressRecord addressess={addressess} />
        </tbody>
      </table>
    </>);
  }
  
  export function updateAddressess(address) {
    MAX_ADDRESS_ID = MAX_ADDRESS_ID + 1;
    ADDRESSESS.push({id:MAX_ADDRESS_ID, name:address.name, phone:address.phone, address:address.address});
  }