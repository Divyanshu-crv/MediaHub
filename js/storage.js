/*==========================================================
                    MEDIAHUB STORAGE
==========================================================*/

"use strict";

/*==========================================================
                    STORAGE KEY
==========================================================*/

const STORAGE = {

    favorites: "mediahub_favorites",

    theme: "mediahub_theme"

};



/*==========================================================
                    INITIALIZE
==========================================================*/

function initializeStorage(){

    if(localStorage.getItem(STORAGE.favorites)===null){

        localStorage.setItem(

            STORAGE.favorites,

            JSON.stringify([])

        );

    }

    if(localStorage.getItem(STORAGE.theme)===null){

        localStorage.setItem(

            STORAGE.theme,

            "dark"

        );

    }

}



/*==========================================================
                    FAVORITES
==========================================================*/

function getFavorites(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE.favorites

        )

    ) || [];

}



function saveFavorites(favorites){

    localStorage.setItem(

        STORAGE.favorites,

        JSON.stringify(favorites)

    );

}



/*==========================================================
                    TOGGLE FAVORITE
==========================================================*/

function toggleFavorite(mediaId){

    let favorites = getFavorites();

    if(favorites.includes(mediaId)){

        favorites = favorites.filter(

            id => id !== mediaId

        );

    }

    else{

        favorites.push(mediaId);

    }

    saveFavorites(favorites);

}



/*==========================================================
                    CHECK FAVORITE
==========================================================*/

function isMediaFavorite(mediaId){

    return getFavorites().includes(mediaId);

}



/*==========================================================
                    CLEAR FAVORITES
==========================================================*/

function clearFavorites(){

    saveFavorites([]);

}



/*==========================================================
                    THEME
==========================================================*/

function getTheme(){

    return localStorage.getItem(

        STORAGE.theme

    ) || "dark";

}



function saveTheme(theme){

    localStorage.setItem(

        STORAGE.theme,

        theme

    );

}



/*==========================================================
                    RESET STORAGE
==========================================================*/

function resetStorage(){

    localStorage.removeItem(

        STORAGE.favorites

    );

    localStorage.removeItem(

        STORAGE.theme

    );

    initializeStorage();

}



/*==========================================================
                    DEBUG
==========================================================*/

function printStorage(){

    console.log("Favorites :",getFavorites());

    console.log("Theme :",getTheme());

}