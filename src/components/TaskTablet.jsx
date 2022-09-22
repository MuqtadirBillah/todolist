import React, { useState } from "react";
import FolderTabletBody from "./FolderTabletBody";
import FolderTabletHeader from "./FolderTabletHead";
import TabletBody from "./TabletBody";
import TabletHeader from "./TabletHeader";
import TaskTabletBody from "./TaskTabletBody";
import TaskTabletHeader from "./TaskTabletHead";

function TaskTablet(){

    var [folderName, setFolderName] = useState("Folder");
    var [folderId, setFolderId] = useState();

    return(
        <div className="genericTablet d-flex align-items-center">
            <div className="container-fluid">
                <TaskTabletHeader folderName={folderName} folderId={folderId} />
                <TaskTabletBody setFolderName={setFolderName} folderName={folderName} setFolderId={setFolderId} />
            </div>
        </div>
    );
}

export default TaskTablet;