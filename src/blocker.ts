// content script that modifies DOM to block or restore ap scores
console.log("Content script loaded!");

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
});


// fixme: it also hides the body of the award but doesn't hide the header so it's really funny lmao
// fixme: clicking on it again makes it do the animation n stuff again

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
    const text = scoreCard.textContent;
    let score = 0;
    if (text) {
        score = Number(text.substring(10, 11));
    }
    console.log(score);
    return score;
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    // remove the data URL thing (data:audio/mp3;base64,)
    const base64String = base64.split(',')[1];
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// todo: add checks for soundUploads[score].removed (if removed, play no sound)
// play (customized or default) sounds upon score reveal
async function playSound(score: number) {
    try {
        const result = await chrome.storage.local.get(["soundUploads"]);
        let audioURL: string;
        let audio: HTMLAudioElement;

        if (result.soundUploads && result.soundUploads[score]) {
            const base64Data = result.soundUploads[score].base64;
            const audioData = base64ToArrayBuffer(base64Data);
            // silly stuff to bypass collegeboard security protocol
            const audioContext = new (
                window.AudioContext ||
                (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
            )();
            const audioBuffer = await audioContext.decodeAudioData(audioData);
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start();
        }
        else {
            if (score != 5) {
                audioURL = chrome.runtime.getURL("default_sounds/wahwahwah.mp3");
            }
            else {
                audioURL = chrome.runtime.getURL("default_sounds/yippee.mp3");
            }
            audio = new Audio(audioURL);
            await audio.play();
        }
    }
    catch (err) {
        console.log(err, "with playing audio");
    }
}

// play (customized or default) animation upon score reveal
// todo: make it not take up the whole screen
// todo: add checks for animationUploads[score].removed (if removed, play no sound)
async function playAnimation(score: number) {
    try {
        const animation = document.createElement('img');
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
        
        const result = await chrome.storage.local.get(["animationUploads"]);
        if (result.animationUploads && result.animationUploads[score]) {
            const base64Data = result.animationUploads[score].base64;
            animation.src = base64Data;
        }
        else {
            if (score == 5) {
                animation.src = chrome.runtime.getURL("default_animations/happyhappyhappy.gif");
            }
            else {
                animation.src = chrome.runtime.getURL("default_animations/sadcat.gif");
            }
        }
        
        // add to body
        document.body.appendChild(animation);
        // remove after 3 seconds
        setTimeout(() => {
            if (animation.parentNode) {
                animation.parentNode.removeChild(animation);
            }
        }, 3000);
    }
    catch (err) {
        console.log(err, "with playing animation");
    }
}