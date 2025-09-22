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

                // make each card clickable: once clicked, css style shows it
                scoreCard.addEventListener("click", () => {
                    scoreCard.style.opacity = '1';
                    scoreCard.style.pointerEvents = 'auto';
                    // re-enable clicking on children
                    const children = scoreCard.querySelectorAll('*');
                    children.forEach(child => {
                        (child as HTMLElement).style.pointerEvents = 'auto';
                    });

                    const score = getScore(scoreCard);
                    // play a sound effect depending on the score
                    playSound(score);
                    playAnimation(score)
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

function getScore(scoreCard:HTMLElement) {
    // after "Your Score", number of score appears: 10th character in string
    const text = scoreCard.textContent
    let score = '0';
    if (text) {
        score = text.substring(10, 11)
    }
    console.log(score)
    return score

}

// function getFileFromBase64()

// todo: make sounds customizable by the user (user can upload any mp3 file) (but have defaults)
// ^ create a folder user_sounds, name the sounds 1.mp3, 2.mp3, etc. check if the url exists (user_sounds/1.mp3 etc). if url doesn't exist, go to default sound for 1.mp3
function playSound(score:string) {
    if (score != '5') {
        const wahWahWah = new Audio(chrome.runtime.getURL("default_sounds/wahwahwah.mp3"));
        wahWahWah.play();
    }
    else {
        const yippee = new Audio(chrome.runtime.getURL("default_sounds/yippee.mp3"));
        yippee.play();
    }
}

/* todo: make animations customizable and also not take up the whole screen */
function playAnimation(score: string) {
    if (score == '5') {
        const animation = document.createElement('img');
        animation.src = chrome.runtime.getURL("default_animations/happyhappyhappy.gif");
        animation.style.cssText = `
            position: fixed; 
            top: 0;
            left: 0; 
            width: 100vw; 
            height: 100vh; 
            opacity: 1; 
            z-index: 10000; 
            object-fit: cover; 
            pointer-events: none;
        `;
        
        // add to body
        document.body.appendChild(animation);
        // remove after 3 seconds
        setTimeout(() => {
            if (animation.parentNode) {
                animation.parentNode.removeChild(animation);
            }
        }, 2000);
    }
}