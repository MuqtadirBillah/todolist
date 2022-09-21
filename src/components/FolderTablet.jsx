import React from "react";
import FolderTabletBody from "./FolderTabletBody";
import FolderTabletHeader from "./FolderTabletHead";
import TabletBody from "./TabletBody";
import TabletHeader from "./TabletHeader";

function FolderTablet(props){
    return(
        <div className="genericTablet d-flex align-items-center">
            <div className="container-fluid">
                <FolderTabletHeader />
                <FolderTabletBody />
            </div>
        </div>
    );
}

export default FolderTablet;