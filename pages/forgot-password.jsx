import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DynamicHead from "../src/components/DynamicHead";

function ForgotPassword(){

    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [code, setCode] = useState('');
    var [warning, setWarning] = useState('');

    function resetPassword(){
        console.log('Resetting!!')
        if(email.length>0 && password.length>0 && code.length>0){
            axios.post("/api/forgot-password", {email: email, password: password, code: code})
            .then((response)=>{
                console.log(response);
                if(response.data=='updated!'){
                    toast(`Password Successfully Reset!`)
                    axios.post("/api/updated-code", {email: email})
                    .then((res)=>{
                        console.log(res);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                    setCode('');
                    setEmail('');
                    setPassword('');
                }
                else if(response.data=='Email does not exists!'){
                    toast(`Email does not exists!`)
                }
                else if(response.data=='Invalid Verification Code!'){
                    toast(`Invalid Verification Code!`);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            toast(`Please fill all fields!`);
        }
    }

    function sendCode(){
        if(email.length>0){
            axios.post("/api/email-code", {email: email})
            .then((response)=>{
                console.log(response);
                if(response.data=='sent!'){
                    toast(`Please check your email address for verification code!`);
                }
                else if(response.data=='User not found!'){
                    toast(`User not found!`);
                }
                else{
                    toast("Something went wrong!");
                }
            })
        }
        else{
            toast(`Please fill all fields!`);
        }
    }

    return(
        <>
            <DynamicHead 
                title="Forgot Password"
                description="Forgot password? Reset it now!"
                keywords="reset password"
            />
            <div className="forgotPassword d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="form">
                                <div className="heading">
                                    <h2 className="mainSectionHeading">Forgot Password</h2>
                                </div>
                                <div className="inputs">
                                    <h5>Email Address</h5>
                                    <input type="text" placeholder="Email Address" value={email} onChange={(e)=>{setEmail(e.target.value)}} /><br />
                                    <h5>New Password</h5>
                                    <input type="text" placeholder="New Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                    <h5>Verification Code</h5>
                                    <input type="number" placeholder="Verification Code" value={code} onChange={(e)=>{setCode(e.target.value)}} />
                                    <button className="sendBut" onClick={()=>{sendCode()}}>Send Code</button>
                                    <button className="resetBut" onClick={()=>{resetPassword()}}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;