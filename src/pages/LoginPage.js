import React from "react";
import Header from "../Components/Header";

function LoginPage(){
    return (
        <div>
            <Header/>
            <div>
                <h1>Login</h1>
                <form>
                    <label>Username</label>
                    <input/>
                    <label>Password</label>
                    <input/>
                    <button type={"submit"}>Login</button>
                </form>
                <p>new User? signup</p>
            </div>
        </div>
    )
}

export default LoginPage;