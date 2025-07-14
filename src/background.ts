// listen for switching tab to collegeboard ap score website
// activate content script using chrome.scripting

// when on site, listen to user clicks on scores, then activate another reveal(examName) function in content script


chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker activated!");
});



async function getCurrentTabURL() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab) {
        return tab.url;
    }
    return "";
}


chrome.tabs.onActivated.addListener(async function(tabId, changeInfo, tab) {
    console.log("tab changed/activated")
    // check if the tab url is the collegeboard ap website
    // if so, call hide() function using chrome.scripting
    if (changeInfo) {
        let currentURL = await getCurrentTabURL();
        if (currentURL = "ap collegeboard score viewer URL") {
            // call chrome.scripting to hide the exam scores
        }
    }
});

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
    console.log("tab changed/activated")
    // check if the tab url is the collegeboard ap website
    // if so, call hide() function using chrome.scripting
    if (changeInfo) {
        let currentURL = await getCurrentTabURL();
        if (currentURL = "ap collegeboard score viewer URL") {
            // call chrome.scripting to hide the exam scores (or chrome.message to the scripting file, and from there do chrome.scripting for a specific function)
        }
    }
});