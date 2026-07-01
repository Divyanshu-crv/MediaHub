"use strict";

const SEARCH = {
    text: "",
    maxSuggestions: 5
};

function initializeSearch() {

    const input = document.getElementById("searchInput");
    const box = document.getElementById("searchSuggestions");

    if (!input || !box) return;

    input.addEventListener("input", function () {

        SEARCH.text = this.value.trim().toLowerCase();

        performSearch();
        showSuggestions();

    });

    document.addEventListener("click", function (e) {

        if (
            !e.target.closest("#searchSection")
        ) {
            hideSuggestions();
        }

    });

}

function showSuggestions() {

    const box = document.getElementById("searchSuggestions");

    if (!box) return;

    box.innerHTML = "";

    if (SEARCH.text === "") {

        hideSuggestions();
        return;

    }

    const results = getAllMedia().filter(song =>
        song.title.toLowerCase().includes(SEARCH.text)
    );

    if (results.length === 0) {

        hideSuggestions();
        return;

    }

    results.slice(0, SEARCH.maxSuggestions).forEach(song => {

        box.insertAdjacentHTML(
            "beforeend",
            `
            <div class="searchItem"
                 onclick="selectSuggestion('${song.title}')">

                🎵 ${song.title}

            </div>
            `
        );

    });

    box.style.display = "block";

}

function hideSuggestions() {

    const box = document.getElementById("searchSuggestions");

    if (box) {

        box.style.display = "none";

    }

}

function selectSuggestion(title) {

    const input = document.getElementById("searchInput");

    input.value = title;

    SEARCH.text = title.toLowerCase();

    hideSuggestions();

    performSearch();

}

function performSearch() {

    let media = getAllMedia();

    if (UI.currentFriend) {

        media = getMediaByFriend(UI.currentFriend);

    }

    if (UI.currentCategory) {

        media = media.filter(item =>
            item.category === UI.currentCategory
        );

    }

    if (SEARCH.text !== "") {

        media = media.filter(item =>
            item.title.toLowerCase().includes(SEARCH.text)
        );

    }

    renderSongs(media);

}

function clearSearch() {

    SEARCH.text = "";

    const input = document.getElementById("searchInput");

    if (input) input.value = "";

    hideSuggestions();

    performSearch();

}