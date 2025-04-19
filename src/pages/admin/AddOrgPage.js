import React from "react";
import Header from "../../components/Header";

function SignUpPage() {
    return (
        <div>
            <Header type={"Admin Mode"}/>
            <div className="pageBody" id={"loginPage"}>
                <div className="loginTab">
                    <h1 style={{textAlign:"center"}}>Add new organizer</h1>
                    <form>
                        <label>Organization name</label>
                        <input/>
                        <label>Email</label>
                        <input/>
                        <label>Password</label>
                        <input/>
                        <button type={"submit"}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;