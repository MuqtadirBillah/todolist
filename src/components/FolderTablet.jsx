import React from "react";
import FolderTabletBody from "./FolderTabletBody";
import TabletBody from "./TabletBody";
import TabletHeader from "./TabletHeader";

function FolderTablet(){
    return(
        <div className="genericTablet d-flex align-items-center">
            <div className="container-fluid">
                <TabletHeader />
                <FolderTabletBody />
            </div>
        </div>
    );
}

export default FolderTablet;