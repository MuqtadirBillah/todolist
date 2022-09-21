import React from "react";

function TabletHeader(){
    return(
        <div className="tabletHeader">
            <div className="row">
                <div className="col-6 iconsCol">
                    <h2><i class="fas fa-folder"></i></h2>
                </div>
                <div className="col-6 logoutCol align-self-center">
                    <button className="logoutBut">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default TabletHeader;