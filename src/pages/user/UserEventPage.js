import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HOmePageHeader from "../../components/HomePageHeader";
import Header from "../../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';





function UserAllEventPage(){

    const [events, setEvents]=useState([])

    useEffect(()=>{
     const fetchEvents= async()=>{
    try{
      const res = await fetch("http://localhost:3000/api/events")
      const data=await res.json();
      setEvents(data.events);
    }
    catch(err){
      console.error("Failed to fetch events:", err);
    }
     }
     fetchEvents();
    },[]);


    return(<div>

        {<Header/>}
        {events.map((event,index)=>{
            
            return <p>{event.title}</p>
            
            {/*<div className="card" style={{width: "18rem"}}>
            <img src={event.posterURL} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div> */}

        })}

        
    </div>)
}


export default UserAllEventPage;
