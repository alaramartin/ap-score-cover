// content script that modifies DOM to block or restore ap scores

// import {getTabID} from './background.js'

// let tab:any;

console.log("hi")



chrome.runtime.onMessage.addListener(async function(request, _sender, sendResponse) {
    console.log("got message");
    if (request.message === "hide scores") {
        if (chrome.runtime.lastError) console.log("error")
        // tab = await getTabID();
        // call chrome.scripting to hide the exam scores
        console.log("got tab id");
        // if (tab && tab.id) {
        //     chrome.scripting
        //         .executeScript({
        //         target : {tabId : tab.id},
        //         func : hideScores,
        //         })
        //         .then(() => console.log("hid scores"));
        hideScores();
        console.log("hid scores");
        sendResponse({success: true});
        return true;
        //}
        // else {
        //     console.log("there was something wrong with tab/id")
        // }
    }
    else {
        console.log("unknown message", request.message);
    }
    })






function hideScores() {
    // hide all of the scores -- but save them so they can be reinstated later
    // hide the class: class="apscores-card-body  display-flex"
    // score is in class="sr-only"
    function resetCards() {
        let scoreCards = document.getElementsByClassName("apscores-card-body display-flex");
        if (scoreCards.length > 0) {
            console.log("scores: ", scoreCards[9]);
            // hide the scores
            for (let card of scoreCards) {
                (card as HTMLElement).style.visibility = 'hidden';
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

// document.getElementById("myElement").style.visibility = "hidden";


// document.getElementById("myElement").style.visibility = "visible";
