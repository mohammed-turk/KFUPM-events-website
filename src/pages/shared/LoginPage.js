import React from "react";
import Header from "../../components/Header";

function LoginPage() {
    return (
        <div>
            <Header/>
            <div className="pageBody" id={"loginPage"}>
                <div className="loginTab">
                    <h1 style={{fontSize:"62px", letterSpacing:"7px"}}>Login</h1>
                    <form>
                        <label>Username</label>
                        <input/>
                        <label>Password</label>
                        <input/>
                        <button type={"submit"}>Login</button>
                    </form>
                    <p>new User? sign up</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;