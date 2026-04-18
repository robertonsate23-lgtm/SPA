const form = document.getElementById("searchForm");
const wordinput = document.getElementById("wordinput");

const wordEl = document.getElementById("word");
const definitionEl = document.getElementById("Definition");
const exampleEl = document.getElementById("Example");
const audioBtn = document.getElementById("audioBtn");

let audio = null;

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const word = wordinput.value.trim();
    fetchWord(word);
});

async function fetchWord(word) {
    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const data = await response.json();
        displayResult(data[0]);
    } catch (error) {
        alert("Word not found");
    }
}

function displayResult(data) {

    wordEl.textContent = data.word;
    definitionEl.textContent = data.meanings[0].definitions[0].definition;

    exampleEl.textContent = data.meanings[0].definitions[0].example || "No example available";

    const audioSrc = data.phonetics.find(p => p.audio)?.audio;
    if(audioSrc) {
        audio = new Audio(audioSrc);
        audioBtn.style.display = "inline-block";
    } else {
        audioBtn.style.display = "none";
    }
}

audioBtn.addEventListener("click", function() {
    if (audio) audio.play();
});