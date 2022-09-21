import React, { useState, useContext } from "react";
import Cookies from 'js-cookie';
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import DynamicHead from "../src/components/DynamicHead";

function Login(){
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [warning, setWarning] = useState('');
    var [passwordType, setPasswordType] = useState('password');
    var [eye, setEye] = useState('fas fa-eye');

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function login(){
        if(email.length>0 && password.length>0){
            if(re.test(String(email).toLowerCase())){
                axios.post('/api/login', {email: email, password: password})
                .then(function(response){
                    console.log(response.data);
                    if(response.data.statuss=='Logged In!'){
                        Cookies.set('userCookie', response.data.jwt, { expires: 1 });
                        Router.push("/");
                    }
                    else if(response.data=='Invalid credentials'){
                        setWarning('Invalid credentials');
                    }
                })
                .catch(function(error){
                    console.log(error)
                    setWarning("Something went wrong!")
                })
            }
            else{
                setWarning('Invalid Email Address');
            }
        }
        else{
            setWarning('Please fill all fields')
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
            <DynamicHead title="Login" description="Login to your account" keywords="login" />
            <div className="login">
                <div className="container-fluid">
                    <span className="homeIcon"><Link href='/'><a><i className="fas fa-home"></i></a></Link></span>
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12 leftt">
                            <img src="/assets/images/og.jpg" alt="" />
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 align-self-center rightt">
                            <div>
                                <img src="/assets/images/to-do-list.png" alt="logo" />
                                <h1 className="mainSectionHeading">Login</h1>
                                <h5>Welcome back!</h5>
                                <div className="form">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>Email Address</h5>
                                                <input type="text" onChange={(e)=>{setEmail(e.target.value); setWarning('');}} placeholder="Your Email" />
                                            </div>
                                            <div className="col-12">
                                                <h5>Password</h5>
                                                <span className="passwordCol">
                                                    <input data-clarity-unmask="True" type={passwordType} onKeyDown={(e)=>{(e.key=='Enter') && login();}} onChange={(e)=>{setPassword(e.target.value); setWarning('');}} placeholder="Your Password" />
                                                    <span onClick={()=>{passwordd()}}><i className={eye}></i></span>
                                                </span>
                                            </div>
                                            <div className="col-12">
                                                {/* <p>Don't have an account? <Link href='/create-account'><a>Create an account</a></Link></p> */}
                                                <p>Forgot Password? <Link href='/forgot-password'><a>Reset Password</a></Link></p>
                                                <p>{warning}</p>
                                                <button onClick={()=>{login();}}>Login</button>
                                                <Link href='/create-account'><a><button className="createBut">Create Account</button></a></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
}

export default Login;