import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

function TaskTabletHeader(props){

    var router = useRouter();

    function logout(){
        Cookies.remove("userCookie");
        Router.push("/login");
    }

    function deleteFolder(folderId){
        axios.post("/api/folder/delete", { folderId: folderId }, { headers: { token: Cookies.get("userCookie")}})
        .then((response)=>{
            if(response.data=='deleted!'){
                toast(`Folder deleted!`);
                Router.push("/");
            }
            else{
                toast(`Something went wrong!`);
            }
        })
        .catch((err)=>{
            console.log(err)
            toast(`Something went wrong!`);
        })
    }

    return(
        <div className="tabletHeader folderTabletHeader">
            <div className="row">
                <div className="col-6 iconsCol">
                    <h2><Link href="/"><i class="fas fa-folder folderIcon"></i></Link> {props.folderName}</h2>
                </div>
                <div className="col-6 logoutCol align-self-center">
                    <button className="deleteBut" onClick={()=>{deleteFolder(router.query["id"])}}><i className="fas fa-trash-alt"></i></button>
                    <button className="logoutBut" onClick={()=>{logout()}}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default TaskTabletHeader;