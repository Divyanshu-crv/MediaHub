/*==========================================================
                    MEDIAHUB SEARCH
==========================================================*/

"use strict";

/*==========================================================
                    SEARCH STATE
==========================================================*/

const SEARCH = {

    text: ""

};



/*==========================================================
                    INITIALIZE
==========================================================*/

function initializeSearch(){

    const input = document.getElementById("searchInput");

    if(!input){

        return;

    }

    input.addEventListener("input", function(){

        SEARCH.text = this.value.trim().toLowerCase();

        performSearch();

    });

}



/*==========================================================
                    SEARCH
==========================================================*/

function performSearch(){

    if(SEARCH.text===""){

        if(UI.currentFriend){

            renderSongs(

                getMediaByFriend(UI.currentFriend)

            );

        }

        else{

            renderSongs();

        }

        return;

    }

    let media = getAllMedia();

    if(UI.currentFriend){

        media = getMediaByFriend(UI.currentFriend);

    }

    const results = media.filter(item=>{

        const friend = getFriendById(item.owner);

        const category = getCategoryById(item.category);

        return(

            item.title.toLowerCase().includes(SEARCH.text) ||

            (friend && friend.name.toLowerCase().includes(SEARCH.text)) ||

            (category && category.name.toLowerCase().includes(SEARCH.text)) ||

            item.id.toLowerCase().includes(SEARCH.text)

        );

    });

    renderSearchResults(results);

}



/*==========================================================
                    CLEAR SEARCH
==========================================================*/

function clearSearch(){

    SEARCH.text="";

    const input=document.getElementById("searchInput");

    if(input){

        input.value="";

    }

    performSearch();

}



/*==========================================================
                    SEARCH BY CATEGORY
==========================================================*/

function searchCategory(categoryId){

    const results=getMediaByCategory(categoryId);

    renderSearchResults(results);

}



/*==========================================================
                    SEARCH FRIEND
==========================================================*/

function searchFriend(friendId){

    const results=getMediaByFriend(friendId);

    renderSearchResults(results);

}



/*==========================================================
                    RANDOM SONG
==========================================================*/

function playRandomSong(){

    const media=getRandomMedia();

    if(media){

        openLink(media.source);

    }

}



/*==========================================================
                    DEBUG
==========================================================*/

function printSearch(){

    console.log("Search :",SEARCH.text);

}