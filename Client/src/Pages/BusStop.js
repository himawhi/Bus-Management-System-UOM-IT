import React, { useEffect, useState } from 'react';
import '../Css/bus.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';


export default function BusStop() {

    const [BusStops, setBusStops]=useState([]);
    useEffect(()=>{ 
      loadBusStops();
      
  },[]);

  const loadBusStops = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/busStop/viewBusStop");
    setBusStops(result.data);
  };
  
  return (
    <div className='container'>
        <div className='py-4'>
        <div className='datatableTitle'>
             <Link  to='/' style={{textDecoration:"none"}}>Home</Link>
            <Link  to="/addStop" style={{textDecoration:"none"}}>Add BusStop</Link>
        </div>
        <table className="table border shadow">

  <thead>
    <tr>
      <th>#</th>
      <th scope="col">Object ID</th>
      <th scope="col">busStopName</th>
      <th scope="col">longitude</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>
  {BusStops.map((busStop,index) => (
          <tr >
          <th scope="row" key={index}>{index+1}</th>
          <td>{busStop.id}</td>
          <td>{busStop.busStopName}</td>
          <td>{busStop.longitude}</td>
          <td>
              <button className='btn btn-primary mx-2'>View</button>
              <button className='btn btn-outline mx-2'>Edit</button>
              <button className='btn btn-danger mx-2'>Delete</button>
          </td>
      </tr>
      
        ))}
   
  </tbody>
</table>
        </div>

    </div>
  )
}
