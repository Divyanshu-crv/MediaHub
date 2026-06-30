/*==========================================================
                    MEDIAHUB DATA
==========================================================*/

"use strict";

const DATA = {

    /*======================================================
                        FRIENDS
    ======================================================*/

    friends: [

        {
            id: "chuhiya",
            name: "Chuhiya",
            photo: "images/friends/chuhiya.jpg",
            bio: "Best Friend ❤️"
        },

        {
            id: "rahul",
            name: "Rahul",
            photo: "images/friends/rahul.jpg",
            bio: "Music Lover"
        },

        {
            id: "aman",
            name: "Aman",
            photo: "images/friends/aman.jpg",
            bio: "Old Songs Fan"
        }

    ],



    /*======================================================
                        CATEGORIES
    ======================================================*/

    categories: [

        {
            id: "hindi",
            name: "Hindi"
        },

        {
            id: "bhojpuri",
            name: "Bhojpuri"
        },

        {
            id: "old",
            name: "Old Songs"
        },

        {
            id: "sad",
            name: "Sad"
        },

        {
            id: "romantic",
            name: "Romantic"
        },

        {
            id: "lofi",
            name: "Lofi"
        }

    ],



    /*======================================================
                        MEDIA
    ======================================================*/

    media: [

        {
            id: "S001",

            title: "Kesariya",

            owner: "chuhiya",

            category: "hindi",

            type: "song",

            source: "https://youtu.be/example1",

            downloadable: false
        },

        {
            id: "S002",

            title: "Tum Hi Ho",

            owner: "chuhiya",

            category: "romantic",

            type: "song",

            source: "https://youtu.be/example2",

            downloadable: false
        },

        {
            id: "S003",

            title: "Lollipop Lagelu",

            owner: "rahul",

            category: "bhojpuri",

            type: "song",

            source: "https://youtu.be/example3",

            downloadable: false
        },

        {
            id: "S004",

            title: "Lag Ja Gale",

            owner: "aman",

            category: "old",

            type: "song",

            source: "https://youtu.be/example4",

            downloadable: false
        }

    ]

};