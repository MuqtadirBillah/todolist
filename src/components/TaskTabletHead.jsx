import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";

function TaskTabletHeader(props){

    function logout(){
        Cookies.remove("userCookie");
        Router.push("/login");
    }

    return(
        <div className="tabletHeader folderTabletHeader">
            <div className="row">
                <div className="col-6 iconsCol">
                    <h2><Link href="/"><i class="fas fa-folder"></i></Link> {props.folderName}</h2>
                </div>
                <div className="col-6 logoutCol align-self-center">
                    <button className="deleteBut" onClick={()=>{logout()}}><i className="fas fa-trash-alt"></i></button>
                    <button className="logoutBut" onClick={()=>{logout()}}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default TaskTabletHeader;