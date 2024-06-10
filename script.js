// script.js

document.addEventListener('DOMContentLoaded', () => {
    const textDisplay = document.getElementById('text-display');
    const textInput = document.getElementById('text-input');
    const results = document.getElementById('results');
    const timeLimitSelect = document.getElementById('time-limit');
    const startButton = document.getElementById('start-button');

    let romajiMap = {};
    let texts = [];
    let currentTextIndex = 0;
    let startTime;
    let timer;
    let totalTypedCharacters = 0;
    let totalMistypedCharacters = 0;

    // JSONファイルを読み込む
    fetch('romaji_map.json')
        .then(response => response.json())
        .then(data => {
            romajiMap = data;
            console.log('Romaji map loaded:', romajiMap);
        })
        .catch(error => {
            console.error('Error loading romaji map:', error);
        });

    fetch('texts.json')
        .then(response => response.json())
        .then(data => {
            texts = data.texts;
            console.log('Texts loaded:', texts);
        })
        .catch(error => {
            console.error('Error loading texts:', error);
        });

    function getNextText() {
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        return texts[currentTextIndex];
    }

    function startNewRound() {
        const currentText = getNextText();
        textDisplay.innerText = currentText;
        textInput.value = '';
        textInput.disabled = false;
        textInput.focus();
    }

    function endSession() {
        clearInterval(timer);
        textInput.disabled = true;
        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        const accuracy = calculateAccuracy(totalTypedCharacters, totalMistypedCharacters);
        const typingSpeed = (totalTypedCharacters / timeTaken).toFixed(2);
        results.innerText = `時間: ${timeTaken}秒, タイプ数/s: ${typingSpeed}, ミス率: ${accuracy}%`;
    }

    textInput.addEventListener('input', () => {
        const inputText = textInput.value;
        const currentText = textDisplay.innerText;
        const mistypedCharacters = calculateMistypes(inputText, currentText);
        totalTypedCharacters += inputText.length;
        totalMistypedCharacters += mistypedCharacters;

        if (inputText === currentText) {
            startNewRound();
        }
    });

    function calculateAccuracy(totalTyped, totalMistyped) {
        return ((totalMistyped / totalTyped) * 100).toFixed(2);
    }

    function calculateMistypes(input, target) {
        let inputIndex = 0;
        let targetIndex = 0;
        let mistypes = 0;

        while (inputIndex < input.length && targetIndex < target.length) {
            const currentChar = target[targetIndex];
            let romajiVariations = romajiMap[currentChar] || [currentChar];

            // "ん"の特別な扱い
            if (currentChar === 'ん') {
                romajiVariations = ["n", "nn"];
                const nextChar = target[targetIndex + 1];
                // 次の文字が母音や「や行・な行」の場合
                if (nextChar && (["a", "i", "u", "e", "o"].includes(nextChar) ||
                    ["や", "ゆ", "よ", "な", "に", "ぬ", "ね", "の"].includes(nextChar))) {
                    romajiVariations = ["nn"];
                }
            }

            let match = false;
            for (const romaji of romajiVariations) {
                if (input.startsWith(romaji, inputIndex)) {
                    inputIndex += romaji.length;
                    targetIndex++;
                    match = true;
                    break;
                }
            }

            if (!match) {
                mistypes++;
                inputIndex++;
            }
        }

        mistypes += input.length - inputIndex;
        return mistypes;
    }

    startButton.addEventListener('click', () => {
        const timeLimit = parseInt(timeLimitSelect.value, 10);
        startTime = new Date();
        totalTypedCharacters = 0;
        totalMistypedCharacters = 0;
        startNewRound();
        timer = setTimeout(endSession, timeLimit * 1000);
    });
});
