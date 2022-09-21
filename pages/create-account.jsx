import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DynamicHead from "../src/components/DynamicHead";

function CreateAccount(){

    var [fname, setFname] = useState("");
    var [lname, setLname] = useState("");
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [passwordType, setPasswordType] = useState('password');
    var [eye, setEye] = useState('fas fa-eye');
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function createAccount(){
        if(fname.length>1 && lname.length>1 && email.length>1 && password.length>1){
            if(re.test(String(email).toLowerCase())){
                axios.post("/api/create-account", {
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: password
                })
                .then((response)=>{
                    console.log(response)
                    if(response.data=='registered!'){
                        toast(`User successfully registered!`);
                    }
                    else if(response.data=='Email Address already exists!'){
                        toast(`Email Address already exists!`);
                    }
                    else{
                        toast(`Something went wrong!`)
                    }
                })
                .catch((err)=>{
                    toast(`Something went wrong!`);
                })
            }
            else{
                toast(`Invalid Email Address`);
            }
        }
        else{
            toast(`Please fill all fields`);
        }
    }

    function passwordd(){
        if(passwordType=='text'){
            setPasswordType('password')
            setEye('fas fa-eye-slash')
        }
        else{
            setPasswordType('text')
            setEye('fas fa-eye')
        }
    }

    return(
        <>
            <DynamicHead title="Create an Account" description="Create your account on our website" keywords="create account" />
            <div className="createAccount d-flex align-items-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="headings">
                            <h1 className="mainSectionHeading">Create an Account</h1>
                        </div>
                        <hr />
                        <div className="form">
                            <div className="row">
                                <div className="col-lg-6 col-sm-12">
                                    {/* <h5>first name</h5> */}
                                    <input type="text" placeholder="First Name" value={fname} onChange={(e)=>{setFname(e.target.value)}} />
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    {/* <h5>Last Name</h5> */}
                                    <input type="text" placeholder="Last Name" value={lname} onChange={(e)=>{setLname(e.target.value)}} />
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    {/* <h5>Last Name</h5> */}
                                    <input type="email" placeholder="Email Address" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    {/* <h5>Last Name</h5> */}
                                    {/* <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} /> */}
                                    <span className="passwordCol">
                                        <input data-clarity-unmask="True" type={passwordType} onKeyDown={(e)=>{(e.key=='Enter') && createAccount();}} onChange={(e)=>{setPassword(e.target.value);}} placeholder="Your Password" />
                                        <span onClick={()=>{passwordd()}}><i className={eye}></i></span>
                                    </span>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <p>Already have an Account? <Link href="/login"><a>Login</a></Link></p>
                                    <button className="createAccountBut" onClick={()=>{createAccount()}}>Create Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAccount;