import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useState, useEffect} from "react";
import { toast } from "react-toastify";

function TaskTabletBody(props){

    var [display, setDisplay] = useState('none')
    var [tasks, setTasks] = useState([]);
    var [error, setError] = useState('');
    var [name, setName] = useState("");
    var [folderId, setFolderId] = useState();
    var router = useRouter();
  
    useEffect(()=>{
      if(Cookies.get("userCookie")){
        if(router.query["id"]!=undefined){
            axios.get(`/api/folder/tasks/${router.query["id"]}`, { headers: {
              token: Cookies.get("userCookie")
            }})
            .then((response)=>{
              console.log(response)
              if(response.data!='Something went wrong!' && response.data!='record not found!' && response.data!='Invalid Token!'){
                setTasks(response.data);
                console.log(response.data[0].folder_id)
                setFolderId(response.data[0].folder_id)
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
      }
      else{
        Router.push(`/login`);
      }
    }, [router.query["id"]])

    function getTasks(){
        if(Cookies.get("userCookie")){
          if(router.query["id"]!=undefined){
              axios.get(`/api/folder/tasks/${router.query["id"]}`, { headers: {
                token: Cookies.get("userCookie")
              }})
              .then((response)=>{
                console.log(response)
                if(response.data!='Something went wrong!' && response.data!='record not found!' && response.data!='Invalid Token!'){
                  setTasks(response.data);
                  console.log(response.data[0].folder_id)
                  setFolderId(response.data[0].folder_id)
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
        }
        else{
          Router.push(`/login`);
        }
    }

    function addTask(){
        if(name.length>0){
            axios.post("/api/task/add", {task: name, folderId: folderId}, {
                headers: {
                    token: Cookies.get("userCookie")
                }
            })
            .then((response)=>{
                console.log(response);
                if(response.data=='added!'){
                    axios.get(`/api/folder/tasks/${router.query["id"]}`, { headers: {
                      token: Cookies.get("userCookie")
                    }})
                    .then((response)=>{
                      console.log(response)
                      if(response.data!='Something went wrong!' && response.data!='record not found!' && response.data!='Invalid Token!'){
                        setTasks(response.data);
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
            })
        }
    }

    function deleteTask(taskId, folderId){
        axios.post("/api/task/delete", {
            taskId: taskId,
            folderId: folderId
        })
        .then((response)=>{
            console.log(response);
            if(response.data=='deleted!'){
                getTasks();
                toast(`Task deleted!`)
            }
            else{
                toast(`Something went wrong!`);
            }
        })
        .catch((error)=>{
            console.log(error);
            toast(`Something went wrong!`);
        })
    }

    function toggleStatus(taskId){
        axios.post("/api/task/update", { taskId: taskId })
        .then((response)=>{
            console.log(response);
            if(response.data=='updated!'){
                getTasks();
                toast(`Task updated!`)
            }
            else{
                toast(`Something went wrong!`);
            }
        })
        .catch((error)=>{
            console.log(error);
            toast(`Something went wrong!`);
        })
    }

    return(
        <div className="tabletBody folderTableBody" style={{display: `${display}`}}>
            <div className="createBarDiv">
                <div className="row">
                    <div className="col-lg-9 col-md-8 col-sm-8 col-6 coll">
                        <input type="text" onKeyDown={(e)=>{(e.key=='Enter') && addTask();}} placeholder="Task" value={name} onChange={(e)=>{setName(e.target.value)}} name="" id="" />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6 coll">
                        <button onClick={()=>{addTask()}}>Add Task</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="folders">
                    <div className="row">
                        {
                            tasks.map((t)=>{
                                return(
                                    <div className="col-12">
                                        <div className="folder align-self-center">
                                            <h4>
                                                {
                                                    (t.task_status.toLowerCase()=='pending') ?
                                                    <i className="far fa-check-square checkBoxWhite" onClick={()=>{toggleStatus(t.task_id)}}></i> :                                                    
                                                    <i className="fas fa-check-square checkBoxGreen" onClick={()=>{toggleStatus(t.task_id)}}></i>
                                                }
                                                <i className="fas fa-trash deleteBin" onClick={()=>{deleteTask(t.task_id, t.folder_id)}}></i>
                                                {
                                                    (t.task_status.toLowerCase()=='pending') ?
                                                    <span>{t.task_name}</span> :
                                                    <span style={{textDecoration: 'line-through'}}>{t.task_name}</span>
                                                }
                                            </h4>
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

export default TaskTabletBody;