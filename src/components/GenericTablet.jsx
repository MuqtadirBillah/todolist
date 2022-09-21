import React from "react";
import TabletBody from "./TabletBody";
import TabletHeader from "./TabletHeader";

function GenericTablet(){
    return(
        <div className="genericTablet d-flex align-items-center">
            <div className="container-fluid">
                <TabletHeader />
                <TabletBody />
            </div>
        </div>
    );
}

export default GenericTablet;