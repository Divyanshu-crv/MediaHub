/*==========================================================
                    MEDIAHUB
                  APPLICATION
==========================================================*/

"use strict";

/*==========================================================
                    APP
==========================================================*/

const APP = {

    version: "2.0.0",

    started: false

};



/*==========================================================
                    START
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    startApplication

);



/*==========================================================
                    START APPLICATION
==========================================================*/

function startApplication(){

    console.clear();

    console.log("===================================");

    console.log("        MEDIAHUB STARTED");

    console.log("===================================");

    APP.started=true;

    initializeStorage();

    initializeUI();

    initializeSearch();

    initializeEvents();

    hideLoadingScreen();

    showProjectInformation();

}



/*==========================================================
                    EVENTS
==========================================================*/

function initializeEvents(){

    initializeKeyboard();

    initializeWindowEvents();

}



/*==========================================================
                    KEYBOARD
==========================================================*/

function initializeKeyboard(){

    document.addEventListener(

        "keydown",

        function(event){

            if(event.key==="Escape"){

                clearSearch();

                closeFriendProfile();

            }

        }

    );

}



/*==========================================================
                    WINDOW EVENTS
==========================================================*/

function initializeWindowEvents(){

    window.addEventListener(

        "focus",

        function(){

            refreshUI();

        }

    );

}



/*==========================================================
                    LOADING
==========================================================*/

function hideLoadingScreen(){

    const loading=document.getElementById(

        "loadingScreen"

    );

    if(!loading){

        return;

    }

    loading.style.opacity="0";

    setTimeout(function(){

        loading.style.display="none";

    },300);

}



function showLoadingScreen(){

    const loading=document.getElementById(

        "loadingScreen"

    );

    if(!loading){

        return;

    }

    loading.style.display="flex";

    loading.style.opacity="1";

}



/*==========================================================
                    RELOAD
==========================================================*/

function reloadApplication(){

    refreshUI();

}



/*==========================================================
                    ABOUT
==========================================================*/

function showAbout(){

    alert(

`🎵 ${CONFIG.website.name}

Version : ${CONFIG.website.version}

Developer :

${CONFIG.website.owner}`

    );

}



/*==========================================================
                    THEME
                    (Future Ready)
==========================================================*/

function toggleTheme(){

    alert(

        "Theme System Coming Soon."

    );

}



/*==========================================================
                    PROJECT INFO
==========================================================*/

function showProjectInformation(){

    console.log("Version :",APP.version);

    console.log("Friends :",getTotalFriends());

    console.log("Media :",getTotalMedia());

    console.log("Categories :",getTotalCategories());

    console.log("Favorites :",getFavorites().length);

}



/*==========================================================
                    DEBUG
==========================================================*/

function debug(){

    printUIInfo();

    showProjectInformation();

}



/*==========================================================
                    END
==========================================================*/

console.log(

"%cMediaHub App Loaded",

"color:#3b82f6;font-size:18px;font-weight:bold;"

);