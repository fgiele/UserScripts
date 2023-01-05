// ==UserScript==
// @name         Block IBU Spoilers
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Remove the spoiler images from the IBU page. Highlight the Replays
// @author       fgiele
// @match        https://www.eurovisionsports.tv/ibu/
// @icon         https://www.google.com/s2/favicons?domain=eurovisionsports.tv
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/fgiele/UserScripts/main/scripts/blockibuspoiler.js
// @updateURL    https://raw.githubusercontent.com/fgiele/UserScripts/main/scripts/blockibuspoiler.js
// ==/UserScript==

(function() {
    'use strict';

    cleanPage();
})();

function cleanPage(){
    // Hide spoiler images
    hideImages();

    // Highlight the Replay
    highlightReplay();

    // Hide interview texts
    hideInterviewTextSpoilers();
}

function hideImages(){
    var imagelist, index;
    imagelist = document.getElementsByClassName('video__still');
    for (index = 0; index < imagelist.length; ++index) {
        imagelist[index].setAttribute('src',"");
    }
}

function highlightReplay(){
    var replaylist, index, currentTitle;
    replaylist = document.getElementsByClassName('video__title');
    for (let currentTitle of replaylist) {
        if(currentTitle.innerText.toUpperCase().indexOf('REPLAY') !== -1
          || currentTitle.innerText.toUpperCase().indexOf('FULL RACE') !== -1)
        {
            currentTitle.parentElement.style.background = "#00AA00";
        }
    }
}

function hideInterviewTextSpoilers(){
    var interviewList, index, currentTitle, descriptionText;
    interviewList = document.getElementsByClassName('video__title');
    for (let currentTitle of interviewList) {
        if(currentTitle.innerText.toUpperCase().indexOf('INTERVIEW') !== -1)
        {
            descriptionText = currentTitle.nextElementSibling;
            descriptionText.innerText = '... Possible spoilers ...';
        }
    }
}
waitForKeyElements ("img.video__still", cleanPage);
