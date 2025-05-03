import React from "react";
import Header from "../../components/Header";


function AddEventPage() {
    return (
        <div>
            <Header/>
            <div className="pageBody" id={"loginPage"}>
                <div className="loginTab">
                    <h1 style={{fontSize:"62px", letterSpacing:"7px"}}>Add a new event</h1>
                    <form>
                        <label>Event Title</label>
                        <input/>
                        <label>Provider</label>
                        <input/>
                        <label>Date</label>
                        <input type="date"/>
                        <label>Time</label>
                        <input type={"time"}/>
                        <label>Poster</label>
                        <input type={"file"}/>
                        <button type={"submit"}>Add event</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEventPage;