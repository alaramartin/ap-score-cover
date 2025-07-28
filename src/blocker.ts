// content script that modifies DOM to block or restore ap scores

chrome.runtime.onMessage.addListener(async function(request, _sender, sendResponse) {
    console.log("got message");
    if (request.message === "hide scores") {
        if (chrome.runtime.lastError) console.log("error")
        console.log("got tab id");
        hideScores();
        console.log("hid scores");
        sendResponse({success: true});
        return true;

    }
    else {
        console.log("unknown message", request.message);
    }
    })

function hideScores() {
    // hide the class: class="apscores-card-body  display-flex"
    function resetCards() {
        let scoreCards = document.getElementsByClassName("apscores-card-body  display-flex");
        if (scoreCards.length > 0) {
            for (let card of scoreCards) {
                let scoreCard = card as HTMLElement;
                // hide the scores
                scoreCard.style.opacity = '0';
                // make it clickable - add a transition for when it is clicked
                scoreCard.style.transition = "opacity 100ms";

                // make each card clickable: once clicked, opacity goes back to normal if opacity was 0
                scoreCard.addEventListener("click", () => {
                    if (scoreCard.style.opacity == '0') {
                        scoreCard.style.opacity = '1';
                    }
                });
            }
        }
        else {
            // wait and try again if elements not found
            setTimeout(resetCards, 10);
        }
    }
    resetCards();
}


