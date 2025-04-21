import React from "react";
import Header from "../../components/Header";

function SignUpPage() {
    return (
        <div>
            <Header/>
            <div className="pageBody" id={"loginPage"}>
                <div className="loginTab">
                    <h1 style={{fontSize:"62px", letterSpacing:"7px"}}>Sign up</h1>
                    <form>
                        <label>Full name</label>
                        <input/>
                        <label>Username</label>
                        <input/>
                        <label>Email</label>
                        <input/>
                        <label>Password</label>
                        <input/>
                        <button type={"submit"}>sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;