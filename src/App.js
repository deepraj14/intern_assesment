import React, { useEffect, useState } from "react";
import "./styles.css";
import gql from "graphql-tag";
import request from "./utils/request";
import Shipcard from "./shipcard";
import './App.css'

export default function App() {
  const[val,setVal]=useState([]);
  const[count,setCount]=useState(0);
  const[search,setSearch]=useState("");
  const[autocomplete,setAutocomplete]=useState([]);
  const[permanent,setPermanent]=useState([]);


  const fetchShips = async () => {
    const response = await request(gql`
      {
        ships {
          name
          home_port
          image
        }
      }
    `);

    setVal(response.data.ships);
    setPermanent(response.data.ships);
    setCount(response.data.ships.length)
    
  };

  const filterfun=function(item)
  {
    document.getElementById("inp").value=item
    setAutocomplete([]);
    const temp=permanent.filter((x)=>{return x.home_port===item})
    setVal(temp)
    setCount(temp.length)
  }

  const recommender=function(searchitem)
  {
    
    setSearch(searchitem)
   
    const curr=permanent.filter((x)=>{
         let count=0;
        for(let a=0;a<searchitem.length;a++){
                if(searchitem[a]===x.home_port[a] || searchitem[a].toUpperCase() ===x.home_port[a])
                 {
                    count++;
                 }
         }
        if(count===searchitem.length)
        {
        return x;
        }
    })

    const unique= [
    
      ...new Set(curr.map((currele)=>{
      return currele.home_port;
    }))]
    
    setAutocomplete(unique);

  }

  

  useEffect(() => {
    fetchShips();
  },[]);

  return (
    <div className="App">
      
      <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/2560px-SpaceX-Logo.svg.png" alt="spacex logo" />
      <div className="searchbarflex">
        <div className="searchbar">
          <input type="text"
           id="inp"
           className="input"
           placeholder="Search Ships"
           onChange={(e)=>{if(e.target.value){recommender(e.target.value)}else{setAutocomplete([])}}}
          />
         <button className="submit" type="submit" onClick={()=>{filterfun(search)}}><i class="fa fa-search" aria-hidden="true"></i></button>
       </div>

      </div>

      <div className="dropbox" id="drpbox">
      {autocomplete.map((x)=>{return<div className="rowbox"> <div className="dropelement" onClick={()=>{filterfun(x)}}> {x}</div></div>})}
      </div>
      


     <p className="count">TOTAL COUNT:{count}</p>
     { val.map((x)=>{
    return <Shipcard name={x.name} image={x.image} homport={x.home_port}/>
     })}
      
    </div>
  );
}
