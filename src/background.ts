// listen for switching tab to collegeboard ap score website - https://apstudents.collegeboard.org/view-scores
// activate content script using chrome.scripting


// when on site, listen to user clicks on scores, then activate another reveal(examName) function in content script


chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker activated!");
});

async function getTabID() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab) {
        return tab;
    }
    else return null;
}

async function getCurrentTabURL() {
    let tab = await getTabID()
    if (tab) {
        console.log(tab.url)
        return tab.url?.toString();
    }
    return "";
}


chrome.tabs.onActivated.addListener(async function() {
    console.log("tab changed/activated")
    // check if the tab url is the collegeboard ap website
    // if so, call hide() function using chrome.scripting
    
    let currentURL = await getCurrentTabURL();
    if (currentURL == "https://apstudents.collegeboard.org/view-scores") {
        // call chrome.scripting to hide the exam scores
        console.log("yes");
        hideScores()
    }
    
});

chrome.tabs.onUpdated.addListener(async function() {
    console.log("tab changed/activated")
    // check if the tab url is the collegeboard ap website
    // if so, call hide() function using chrome.scripting
    let tab = await getTabID();
    let currentURL = await getCurrentTabURL();
    if (currentURL == "https://apstudents.collegeboard.org/view-scores") {
        // call chrome.scripting to hide the exam scores (or chrome.message to the scripting file, and from there do chrome.scripting for a specific function)
        console.log("yes");
        if (tab && tab.id) {
            chrome.scripting
                .executeScript({
                target : {tabId : tab.id},
                func : hideScores,
                })
                .then(() => console.log("hid scores"));
        }
        else {
            console.log("there was something wrong with tab/id")
        }
    }
});


function hideScores() {
    // hide all of the scores -- but save them so they can be reinstated later
    // hide the class: class="apscores-card-body  display-flex"
    // score is in class="sr-only"
    function resetCards() {
        let scoreCards = document.getElementsByClassName("apscores-card-body display-flex");
        if (scoreCards.length > 0) {
            console.log("scores: ", scoreCards[9]);
            // Hide the scores
            for (let card of scoreCards) {
                (card as HTMLElement).style.display = 'none';
            }
        } else {
            // wait and try again if elements not found
            setTimeout(resetCards, 100);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resetCards);
    } else {
        resetCards();
    }
}