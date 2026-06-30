/*==========================================================
                    MEDIAHUB HELPERS
==========================================================*/

"use strict";

/*==========================================================
                    FRIENDS
==========================================================*/

function getAllFriends() {
    return DATA.friends || [];
}

function getFriendById(id) {
    return getAllFriends().find(friend => friend.id === id);
}

function getTotalFriends() {
    return getAllFriends().length;
}

/*==========================================================
                    MEDIA
==========================================================*/

function getAllMedia() {
    return DATA.media || [];
}

function getMediaByFriend(friendId) {
    return getAllMedia().filter(media => media.owner === friendId);
}

function getMediaByCategory(categoryId) {
    return getAllMedia().filter(media => media.category === categoryId);
}

function getTotalMedia() {
    return getAllMedia().length;
}

/*==========================================================
                    CATEGORY
==========================================================*/

function getAllCategories() {
    return DATA.categories || [];
}

function getCategoryById(id) {
    return getAllCategories().find(category => category.id === id);
}

function getTotalCategories() {
    return getAllCategories().length;
}

/*==========================================================
                    FAVORITES
==========================================================*/

function getFavoriteMedia(friendId = null) {

    const favorites = getFavorites();

    let media = getAllMedia().filter(item =>
        favorites.includes(item.id)
    );

    if(friendId){
        media = media.filter(item => item.owner === friendId);
    }

    return media;
}

function isFavorite(mediaId){
    return getFavorites().includes(mediaId);
}

/*==========================================================
                    LINK
==========================================================*/

function openLink(url){

    if(!url) return;

    window.open(url,"_blank");

}

/*==========================================================
                    COPY
==========================================================*/

function copyText(text){

    navigator.clipboard.writeText(text);

    alert("Copied!");

}

/*==========================================================
                    SHARE
==========================================================*/

function shareLink(title,url){

    if(navigator.share){

        navigator.share({

            title,

            url

        });

    }

    else{

        copyText(url);

    }

}

/*==========================================================
                    RANDOM
==========================================================*/

function getRandomMedia(){

    const media=getAllMedia();

    return media[

        Math.floor(

            Math.random()*media.length

        )

    ];

}