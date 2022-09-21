import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Router from "next/router";
import React, { useState, useEffect} from "react";

function FolderTabletBody(){

    var [display, setDisplay] = useState('none')
    var [folders, setFolders] = useState([]);
    var [error, setError] = useState('');
    var [name, setName] = useState("");
  
    useEffect(()=>{
      if(Cookies.get("userCookie")){
        // setDisplay("");
        axios.get(`/api/folders`, { headers: {
          token: Cookies.get("userCookie")
        }})
        .then((response)=>{
          console.log(response)
          if(response.data!='Something went wrong!' && response.data!='record not found!' && response.data!='Invalid Token!'){
            setFolders(response.data);
            setDisplay("");
          }
          else if(response.data=='record not found!'){
            setError(`record not found!`);
            setDisplay("");
          }
          else if(response.data=='Something went wrong!'){
            setError(`Something went wrong!`);
          }
          else if(response.data=='Invalid Token!'){
            Router.push("/login");
          }
        })
        .catch((err)=>{
          setError(`Something went wrong!`);
        })
      }
      else{
        Router.push(`/login`);
      }
    }, [])

    function createFolder(){
        if(name.length>0){
            axios.post("/api/folder/create", {name: name}, {
                headers: {
                    token: Cookies.get("userCookie")
                }
            })
            .then((response)=>{
                console.log(response);
                if(response.data=='created!'){
                    axios.get(`/api/folders`, { headers: {
                        token: Cookies.get("userCookie")
                    }})
                    .then((response)=>{
                        console.log(response)
                        if(response.data!='Something went wrong!' && response.data!='record not found!'){
                            setFolders(response.data);
                        }
                        else if(response.data=='record not found!'){
                            setError(`record not found!`);
                        }
                        else if(response.data=='Something went wrong!'){
                            setError(`Something went wrong!`);
                        }
                    })
                    .catch((err)=>{
                        setError(`Something went wrong!`);
                    })
                }
            })
        }
    }

    return(
        <div className="tabletBody folderTableBody" style={{display: `${display}`}}>
            <div className="createBarDiv">
                <div className="row">
                    <div className="col-lg-9 col-md-8 col-sm-8 col-6 coll">
                        <input type="text" onKeyDown={(e)=>{(e.key=='Enter') && createFolder();}} placeholder="Folder Name" value={name} onChange={(e)=>{setName(e.target.value)}} name="" id="" />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6 coll">
                        <button onClick={()=>{createFolder()}}>Create Folder</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="folders">
                    <div className="row">
                        {
                            folders.map((d)=>{
                                return(
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="folder align-self-center">
                                            <Link href={`/folder/${d.folder_id}`}><h4><i className="fas fa-folder"></i> {d.folder_name}</h4></Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FolderTabletBody;