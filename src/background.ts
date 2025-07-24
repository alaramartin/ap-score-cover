// listen for switching tab to collegeboard ap score website - https://apstudents.collegeboard.org/view-scores
// activate content script using chrome.scripting


// when on site, listen to user clicks on scores, then activate another reveal(examName) function in content script



// need to use chrome.storage if on/off toggle switch implemented




chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker activated!");
});

export async function getTabID() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab) {
        return tab;
    }
    else return null;
}

export async function getCurrentTabURL() {
    let tab = await getTabID()
    if (tab) {
        return tab.url?.toString();
    }
    return "";
}


chrome.tabs.onActivated.addListener(async function() {
    console.log("tab activated")
        
    let currentURL = await getCurrentTabURL();
    // check if the tab url is the collegeboard ap scores website
    if (currentURL == "https://apstudents.collegeboard.org/view-scores") {
        console.log("user is on collegeboard website");
        chrome.tabs.query({active: true, currentWindow: true},function() {
            chrome.runtime.sendMessage("hide scores", (response) => {
                if (response) console.log("done hiding");
            })
        });
    }
});

chrome.tabs.onUpdated.addListener(async function() {
    console.log("tab updated")

    let currentURL = await getCurrentTabURL();
    // check if the tab url is the collegeboard ap scores website
    if (currentURL == "https://apstudents.collegeboard.org/view-scores") {
        console.log("user is on collegeboard website");
        chrome.tabs.query({active: true, currentWindow: true},function() {
            chrome.runtime.sendMessage("hide scores", (response) => {
                if (response) console.log("done hiding");
            })
        });
    }
});