import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import React, { useState } from "react";

function FolderTabletHeader(props){

    function logout(){
        Cookies.remove("userCookie");
        Router.push("/login");
    }

    return(
        <div className="tabletHeader folderTabletHeader">
            <div className="row">
                <div className="col-6 iconsCol">
                    <h2><i class="fas fa-folder"></i></h2>
                </div>
                <div className="col-6 logoutCol align-self-center">
                    <button className="logoutBut" onClick={()=>{logout()}}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default FolderTabletHeader;