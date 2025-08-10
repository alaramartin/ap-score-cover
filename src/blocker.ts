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


// fixme: it also hides the body of the award but doesn't hide the header so it's really funny lmao

function hideScores() {
    // hide the class: class="apscores-card-body  display-flex"
    function resetCards() {
        const scoreCards = document.getElementsByClassName("apscores-card-body  display-flex");
        if (scoreCards.length > 0) {
            for (const card of scoreCards) {
                const scoreCard = card as HTMLElement;
                // just in case
                scoreCard.classList.remove('revealed');

                // make each card clickable: once clicked, css style shows it
                scoreCard.addEventListener("click", () => {
                    scoreCard.style.opacity = '1';
                    scoreCard.style.pointerEvents = 'auto';
                    // re-enable clicking on children
                    const children = scoreCard.querySelectorAll('*');
                    children.forEach(child => {
                        (child as HTMLElement).style.pointerEvents = 'auto';
                    });
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


