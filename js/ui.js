/*==========================================================
                    UI VARIABLES
==========================================================*/

const UI = {

    currentFriend: null,

    currentCategory: null,

    currentSearch: "",

    currentMediaType: "all"

};



/*==========================================================
                    UI HELPERS
==========================================================*/

function $(id){

    return document.getElementById(id);

}

function clearElement(id){

    const element=$(id);

    if(element){

        element.innerHTML="";

    }

}

function appendHTML(id,html){

    const element=$(id);

    if(element){

        element.insertAdjacentHTML("beforeend",html);

    }

}



/*==========================================================
                DASHBOARD CARD TEMPLATE
==========================================================*/

function dashboardCard(icon,title,value){

    return `

    <div class="card dashboardCard">

        <div class="dashboardIcon">

            ${icon}

        </div>

        <div class="dashboardContent">

            <h2>${value}</h2>

            <p>${title}</p>

        </div>

    </div>

    `;

}



/*==========================================================
                RENDER DASHBOARD
==========================================================*/

function renderDashboard(){

    clearElement("statisticsContainer");

    appendHTML(

        "statisticsContainer",

        dashboardCard(

            "👤",

            "Friends",

            getTotalFriends()

        )

    );

    appendHTML(

        "statisticsContainer",

        dashboardCard(

            "🎵",

            "Media",

            getTotalMedia()

        )

    );

    appendHTML(

        "statisticsContainer",

        dashboardCard(

            "❤️",

            "Favorites",

            getFavorites().length

        )

    );

    appendHTML(

        "statisticsContainer",

        dashboardCard(

            "📂",

            "Categories",

            getTotalCategories()

        )

    );

}



/*==========================================================
                FRIEND CARD TEMPLATE
==========================================================*/

function friendCard(friend,totalSongs,totalFavorites){

    return `

    <div class="card friendCard">

        <img

            src="${friend.photo}"

            alt="${friend.name}"

            onerror="this.src='images/default-user.png'"

        >

        <h2>${friend.name}</h2>

        <div class="friendStats">

            <span>🎵 ${totalSongs}</span>

            <span>❤️ ${totalFavorites}</span>

        </div>

        <button onclick="showFriend('${friend.id}')">

            View Profile

        </button>

    </div>

    `;

}



/*==========================================================
                RENDER FRIENDS
==========================================================*/

function renderFriends(){

    clearElement("friendsContainer");

    const friends=getAllFriends();

    friends.forEach(friend=>{

        appendHTML(

            "friendsContainer",

            friendCard(

                friend,

                getMediaByFriend(friend.id).length,

                getFavoriteMedia(friend.id).length

            )

        );

    });

}

// ------------------------------------------------------

/*==========================================================
                FRIEND PROFILE TEMPLATE
==========================================================*/

function friendProfileTemplate(friend){

    const totalMedia = getMediaByFriend(friend.id).length;

    const totalFavorites = getFavoriteMedia(friend.id).length;

    return `

    <div class="card profileCard">

        <img

            src="${friend.photo}"

            alt="${friend.name}"

            class="profileImage"

            onerror="this.src='images/default-user.png'"

        >

        <h1>${friend.name}</h1>

        <p>

            ${friend.bio || "No bio available."}

        </p>

        <div class="friendStats">

            <span>🎵 ${totalMedia} Media</span>

            <span>❤️ ${totalFavorites} Favorites</span>

        </div>

    </div>

    `;

}



/*==========================================================
                SHOW FRIEND PROFILE
==========================================================*/

function showFriend(friendId){

    UI.currentFriend = friendId;

    const friend = getFriendById(friendId);

    if(!friend){

        return;

    }

    clearElement("friendProfileSection");

    appendHTML(

        "friendProfileSection",

        friendProfileTemplate(friend)

    );

    renderSongs(

        getMediaByFriend(friendId)

    );

}



/*==========================================================
                MEDIA CARD TEMPLATE
==========================================================*/

function mediaCard(media){

    const friend = getFriendById(media.owner);

    const category = getCategoryById(media.category);

    const favorite = isFavorite(media.id);

    return `

    <div class="card mediaCard">

        <div class="mediaTop">

            <h2>

                🎵 ${media.title}

            </h2>

        </div>

        <div class="mediaInfo">

            <p>

                👤 ${friend ? friend.name : "-"}

            </p>

            <p>

                📂 ${category ? category.name : "-"}

            </p>

        </div>

        <div class="mediaButtons">

            <button

                class="play-button"

                title="Play"

                onclick="openLink('${media.source}')"

            >

                ▶

            </button>

            <button

                title="Favorite"

                onclick="toggleFavoriteUI('${media.id}')"

            >

                ${favorite ? "❤️" : "🤍"}

            </button>

            <button

                title="Copy"

                onclick="copyText('${media.source}')"

            >

                📋

            </button>

            <button

                title="Source"

                onclick="openLink('${media.source}')"

            >

                🔗

            </button>

            ${media.downloadable ?

            `

            <button

                title="Download"

                onclick="openLink('${media.source}')"

            >

                ⬇

            </button>

            `

            :

            ""

            }

            <button

                title="Share"

                onclick="shareLink('${media.title}','${media.source}')"

            >

                📤

            </button>

        </div>

    </div>

    `;

}



/*==========================================================
                RENDER SONGS
==========================================================*/

function renderSongs(mediaList = getAllMedia()){

    clearElement("songsContainer");

    if(mediaList.length===0){

        showEmptyMessage(

            "No media found."

        );

        return;

    }

    hideEmptyMessage();

    mediaList.forEach(media=>{

        appendHTML(

            "songsContainer",

            mediaCard(media)

        );

    });

}

// =====================================

/*==========================================================
                FAVORITE UI
==========================================================*/

function toggleFavoriteUI(mediaId){

    toggleFavorite(mediaId);

    renderDashboard();

    if(UI.currentFriend){

        renderSongs(

            getMediaByFriend(UI.currentFriend)

        );

    }else{

        renderSongs();

    }

}



/*==========================================================
                EMPTY STATE
==========================================================*/

function showEmptyMessage(message){

    const container = $("emptyState");

    if(!container){

        return;

    }

    container.innerHTML = `

    <div class="card emptyCard">

        <div class="emptyIcon">

            🎵

        </div>

        <h2>

            ${message}

        </h2>

        <p>

            Try another search or add more media.

        </p>

    </div>

    `;

}



function hideEmptyMessage(){

    const container = $("emptyState");

    if(container){

        container.innerHTML="";

    }

}



/*==========================================================
                REFRESH UI
==========================================================*/

function refreshUI(){

    renderDashboard();

    renderFriends();

    if(UI.currentFriend){

        renderSongs(

            getMediaByFriend(UI.currentFriend)

        );

    }

    else{

        renderSongs();

    }

}



/*==========================================================
                RESET PROFILE
==========================================================*/

function closeFriendProfile(){

    UI.currentFriend=null;

    clearElement("friendProfileSection");

    renderSongs();

}



/*==========================================================
                SEARCH RESULT
==========================================================*/

function renderSearchResults(results){

    renderSongs(results);

}



/*==========================================================
                CATEGORY FILTER
                (Future Ready)
==========================================================*/

function filterCategory(categoryId){

    UI.currentCategory=categoryId;

    const media=getAllMedia().filter(item=>

        item.category===categoryId

    );

    renderSongs(media);

}



/*==========================================================
                MEDIA TYPE FILTER
                (Future Ready)
==========================================================*/

function filterMediaType(type){

    UI.currentMediaType=type;

    const media=getAllMedia().filter(item=>

        item.type===type

    );

    renderSongs(media);

}



/*==========================================================
                SHOW ALL MEDIA
==========================================================*/

function showAllMedia(){

    UI.currentFriend=null;

    UI.currentCategory=null;

    UI.currentMediaType="all";

    renderSongs();

}



/*==========================================================
                UI INITIALIZE
==========================================================*/

function initializeUI(){

    renderDashboard();

    renderFriends();

    renderSongs();

}



/*==========================================================
                DEBUG
==========================================================*/

function printUIInfo(){

    console.log("========== UI ==========");

    console.log("Friend :",UI.currentFriend);

    console.log("Category :",UI.currentCategory);

    console.log("Type :",UI.currentMediaType);

    console.log("Search :",UI.currentSearch);

}



/*==========================================================
                END OF UI.JS
==========================================================*/

console.log(

    "%cMediaHub UI Loaded",

    "color:#22c55e;font-size:16px;font-weight:bold;"

);