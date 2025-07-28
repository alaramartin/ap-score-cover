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


chrome.tabs.onActivated.addListener(async function(activeInfo) {
    console.log("tab activated")
    // let tab = await getTabID();
    // let tabID:number;
    // if (tab && tab.id) {
    //     tabID = tab.id;
    // }
    // else {
    //     tabID = 0;
    // }
    
    // get active tab info
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url === "https://apstudents.collegeboard.org/view-scores") {
            console.log("user is on collegeboard website");
            // send message to content script and check for errors
            // fixme: injecting too slowly (message/scripting doesn't make a difference) and first score is visible for a sec
            // note: using chrome.scripting instead of sending message doesn't fix the issue. :(
            chrome.tabs.sendMessage(activeInfo.tabId, {message: "hide scores"}, (response) => {
                if (chrome.runtime.lastError) {
                    console.log("Error:", chrome.runtime.lastError.message);
                } else {
                    console.log("Response:", response);
                }
            });
        }
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("tab updated")

    // check if page is loaded
    if (changeInfo.status === 'complete' && tab.url === "https://apstudents.collegeboard.org/view-scores") {
        console.log("user is on collegeboard website");
        
        // send message to hide scores
        chrome.tabs.sendMessage(tabId, {message: "hide scores"}, (response) => {
            if (chrome.runtime.lastError) {
                console.log("Error:", chrome.runtime.lastError.message);
            } else {
                console.log("Response:", response);
            }
        });
    }
});