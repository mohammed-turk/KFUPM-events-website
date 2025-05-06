import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HOmePageHeader from "../../components/HomePageHeader";
import Header from "../../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';





function UserAllEventPage(){

    const { id } = useParams();


    const [event, setEvent]=useState(null)

    useEffect(() => {
        const fetchEventById = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/events/${id}`);  
                const data = await res.json();
                setEvent(data);  
                console.log("event was found")
            } catch (err) {
                console.error("Failed to fetch event:", err);
            }
        };
    
        fetchEventById();
    }, [id]);


    return(<div>

        {<Header/>}
            

            
        {!event ? (
            <p className="text-center mt-5">Loading event...</p>
        ) : (
            <div 
                className="container shadow-lg rounded-4 p-4 mt-5 bg-light" 
                style={{ maxWidth: "900px" }}
            >
                <div className="row align-items-center g-4">
                    <div className="col-md-6 text-start">
                        <h2 className="card-title mb-3">{event.title}</h2>
                        <h6 className="text-muted mb-3">{event.timing}</h6>
                        <p className="card-text">{event.info || "No additional info provided."}</p>
                        <a href="#" className="btn btn-primary">add to favorite</a>
                    </div>

                    <div className="col-md-6 text-center">
                        <img 
                            src={event.posterURL || "https://via.placeholder.com/300"} 
                            className="img-fluid rounded-3 shadow-sm" 
                            alt="Event Poster" 
                            style={{ maxHeight: "600px" }}
                        />
                    </div>
                </div>
            </div> 
          )}
            
            
        

        
    </div>)
}


export default UserAllEventPage;
