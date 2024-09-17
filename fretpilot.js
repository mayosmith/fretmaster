const SLOW = 4000;
const MEDIUM = 2000;
const FAST = 1000;
const THIRDS = 3;
const POSITIONS = 2;
const ALL = 1;
const MAJOR3RD = 3;
const PERFECT5TH = 5;
const SEVENTH = 7;  


let noteSequence = []; //noteSequence[] is the crux of the biscuit


let randomNote;
let countdownInterval;
let timeRemaining;
let score = 0;
let timeLimit = 20;
let audioContext;
let playSpeed = 3000;
let gamePaused = false;

let isPlaying = false; // Add this to track if a noteSequence is currently playing


const noteNames = ['A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3',
    'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4',
    'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5'];



const whiteKeySemitones = [
    { note: 'A', semitone: 0 },
    { note: 'B', semitone: 2 },
    { note: 'C', semitone: 3 },
    { note: 'D', semitone: 5 },
    { note: 'E', semitone: 7 },
    { note: 'F', semitone: 8 },
    { note: 'G', semitone: 10 }
];
// Corresponding to: A, B, C, D, E, F, G


const fretBoard = [
    [
        { string: 0, fret: 0, semitone: 7, note: 'E4', frequency: 329.63 },
        { string: 0, fret: 1, semitone: 8, note: 'F4', frequency: 349.23 },
        { string: 0, fret: 2, semitone: 9, note: 'F#4', frequency: 369.99 },
        { string: 0, fret: 3, semitone: 10, note: 'G4', frequency: 392.00 },
        { string: 0, fret: 4, semitone: 11, note: 'G#4', frequency: 415.30 },
        { string: 0, fret: 5, semitone: 0, note: 'A4', frequency: 440.00 },
        { string: 0, fret: 6, semitone: 1, note: 'A#4', frequency: 466.16 },
        { string: 0, fret: 7, semitone: 2, note: 'B4', frequency: 493.88 },
        { string: 0, fret: 8, semitone: 3, note: 'C5', frequency: 523.25 },
        { string: 0, fret: 9, semitone: 4, note: 'C#5', frequency: 554.37 },
        { string: 0, fret: 10, semitone: 5, note: 'D5', frequency: 587.33 },
        { string: 0, fret: 11, semitone: 6, note: 'D#5', frequency: 622.25 },
        { string: 0, fret: 12, semitone: 7, note: 'E5', frequency: 659.25 },
        { string: 0, fret: 13, semitone: 8, note: 'F5', frequency: 698.46 },
        { string: 0, fret: 14, semitone: 9, note: 'F#5', frequency: 739.99 },
        { string: 0, fret: 15, semitone: 10, note: 'G5', frequency: 783.99 },
        { string: 0, fret: 16, semitone: 11, note: 'G#5', frequency: 830.61 },
        { string: 0, fret: 17, semitone: 0, note: 'A5', frequency: 880.00 }
    ],
    [
        { string: 1, fret: 0, semitone: 2, note: 'B3', frequency: 246.94 },
        { string: 1, fret: 1, semitone: 3, note: 'C4', frequency: 261.63 },
        { string: 1, fret: 2, semitone: 4, note: 'C#4', frequency: 277.18 },
        { string: 1, fret: 3, semitone: 5, note: 'D4', frequency: 293.66 },
        { string: 1, fret: 4, semitone: 6, note: 'D#4', frequency: 311.13 },
        { string: 1, fret: 5, semitone: 7, note: 'E4', frequency: 329.63 },
        { string: 1, fret: 6, semitone: 8, note: 'F4', frequency: 349.23 },
        { string: 1, fret: 7, semitone: 9, note: 'F#4', frequency: 369.99 },
        { string: 1, fret: 8, semitone: 10, note: 'G4', frequency: 392.00 },
        { string: 1, fret: 9, semitone: 11, note: 'G#4', frequency: 415.30 },
        { string: 1, fret: 10, semitone: 0, note: 'A4', frequency: 440.00 },
        { string: 1, fret: 11, semitone: 1, note: 'A#4', frequency: 466.16 },
        { string: 1, fret: 12, semitone: 2, note: 'B4', frequency: 493.88 },
        { string: 1, fret: 13, semitone: 3, note: 'C5', frequency: 523.25 },
        { string: 1, fret: 14, semitone: 4, note: 'C#5', frequency: 554.37 },
        { string: 1, fret: 15, semitone: 5, note: 'D5', frequency: 587.33 },
        { string: 1, fret: 16, semitone: 6, note: 'D#5', frequency: 622.25 },
        { string: 1, fret: 17, semitone: 7, note: 'E5', frequency: 659.25 }
    ],
    [
        { string: 2, fret: 0, semitone: 10, note: 'G3', frequency: 196.00 },
        { string: 2, fret: 1, semitone: 11, note: 'G#3', frequency: 207.65 },
        { string: 2, fret: 2, semitone: 0, note: 'A3', frequency: 220.00 },
        { string: 2, fret: 3, semitone: 1, note: 'A#3', frequency: 233.08 },
        { string: 2, fret: 4, semitone: 2, note: 'B3', frequency: 246.94 },
        { string: 2, fret: 5, semitone: 3, note: 'C4', frequency: 261.63 },
        { string: 2, fret: 6, semitone: 4, note: 'C#4', frequency: 277.18 },
        { string: 2, fret: 7, semitone: 5, note: 'D4', frequency: 293.66 },
        { string: 2, fret: 8, semitone: 6, note: 'D#4', frequency: 311.13 },
        { string: 2, fret: 9, semitone: 7, note: 'E4', frequency: 329.63 },
        { string: 2, fret: 10, semitone: 8, note: 'F4', frequency: 349.23 },
        { string: 2, fret: 11, semitone: 9, note: 'F#4', frequency: 369.99 },
        { string: 2, fret: 12, semitone: 10, note: 'G4', frequency: 392.00 },
        { string: 2, fret: 13, semitone: 11, note: 'G#4', frequency: 415.30 },
        { string: 2, fret: 14, semitone: 0, note: 'A4', frequency: 440.00 },
        { string: 2, fret: 15, semitone: 1, note: 'A#4', frequency: 466.16 },
        { string: 2, fret: 16, semitone: 2, note: 'B4', frequency: 493.88 },
        { string: 2, fret: 17, semitone: 3, note: 'C5', frequency: 523.25 }
    ],
    [
        { string: 3, fret: 0, semitone: 5, note: 'D3', frequency: 146.83 },
        { string: 3, fret: 1, semitone: 6, note: 'D#3', frequency: 155.56 },
        { string: 3, fret: 2, semitone: 7, note: 'E3', frequency: 164.81 },
        { string: 3, fret: 3, semitone: 8, note: 'F3', frequency: 174.61 },
        { string: 3, fret: 4, semitone: 9, note: 'F#3', frequency: 185.00 },
        { string: 3, fret: 5, semitone: 10, note: 'G3', frequency: 196.00 },
        { string: 3, fret: 6, semitone: 11, note: 'G#3', frequency: 207.65 },
        { string: 3, fret: 7, semitone: 0, note: 'A3', frequency: 220.00 },
        { string: 3, fret: 8, semitone: 1, note: 'A#3', frequency: 233.08 },
        { string: 3, fret: 9, semitone: 2, note: 'B3', frequency: 246.94 },
        { string: 3, fret: 10, semitone: 3, note: 'C4', frequency: 261.63 },
        { string: 3, fret: 11, semitone: 4, note: 'C#4', frequency: 277.18 },
        { string: 3, fret: 12, semitone: 5, note: 'D4', frequency: 293.66 },
        { string: 3, fret: 13, semitone: 6, note: 'D#4', frequency: 311.13 },
        { string: 3, fret: 14, semitone: 7, note: 'E4', frequency: 329.63 },
        { string: 3, fret: 15, semitone: 8, note: 'F4', frequency: 349.23 },
        { string: 3, fret: 16, semitone: 9, note: 'F#4', frequency: 369.99 },
        { string: 3, fret: 17, semitone: 10, note: 'G4', frequency: 392.00 }
    ],
    [
        { string: 4, fret: 0, semitone: 0, note: 'A2', frequency: 110.00 },
        { string: 4, fret: 1, semitone: 1, note: 'A#2', frequency: 116.54 },
        { string: 4, fret: 2, semitone: 2, note: 'B2', frequency: 123.47 },
        { string: 4, fret: 3, semitone: 3, note: 'C3', frequency: 130.81 },
        { string: 4, fret: 4, semitone: 4, note: 'C#3', frequency: 138.59 },
        { string: 4, fret: 5, semitone: 5, note: 'D3', frequency: 146.83 },
        { string: 4, fret: 6, semitone: 6, note: 'D#3', frequency: 155.56 },
        { string: 4, fret: 7, semitone: 7, note: 'E3', frequency: 164.81 },
        { string: 4, fret: 8, semitone: 8, note: 'F3', frequency: 174.61 },
        { string: 4, fret: 9, semitone: 9, note: 'F#3', frequency: 185.00 },
        { string: 4, fret: 10, semitone: 10, note: 'G3', frequency: 196.00 },
        { string: 4, fret: 11, semitone: 11, note: 'G#3', frequency: 207.65 },
        { string: 4, fret: 12, semitone: 0, note: 'A3', frequency: 220.00 },
        { string: 4, fret: 13, semitone: 1, note: 'A#3', frequency: 233.08 },
        { string: 4, fret: 14, semitone: 2, note: 'B3', frequency: 246.94 },
        { string: 4, fret: 15, semitone: 3, note: 'C4', frequency: 261.63 },
        { string: 4, fret: 16, semitone: 4, note: 'C#4', frequency: 277.18 },
        { string: 4, fret: 17, semitone: 5, note: 'D4', frequency: 293.66 }
    ],
    [
        { string: 5, fret: 0, semitone: 7, note: 'E2', frequency: 82.41 },
        { string: 5, fret: 1, semitone: 8, note: 'F2', frequency: 87.31 },
        { string: 5, fret: 2, semitone: 9, note: 'F#2', frequency: 92.50 },
        { string: 5, fret: 3, semitone: 10, note: 'G2', frequency: 98.00 },
        { string: 5, fret: 4, semitone: 11, note: 'G#2', frequency: 103.83 },
        { string: 5, fret: 5, semitone: 0, note: 'A2', frequency: 110.00 },
        { string: 5, fret: 6, semitone: 1, note: 'A#2', frequency: 116.54 },
        { string: 5, fret: 7, semitone: 2, note: 'B2', frequency: 123.47 },
        { string: 5, fret: 8, semitone: 3, note: 'C3', frequency: 130.81 },
        { string: 5, fret: 9, semitone: 4, note: 'C#3', frequency: 138.59 },
        { string: 5, fret: 10, semitone: 5, note: 'D3', frequency: 146.83 },
        { string: 5, fret: 11, semitone: 6, note: 'D#3', frequency: 155.56 },
        { string: 5, fret: 12, semitone: 7, note: 'E3', frequency: 164.81 },
        { string: 5, fret: 13, semitone: 8, note: 'F3', frequency: 174.61 },
        { string: 5, fret: 14, semitone: 9, note: 'F#3', frequency: 185.00 },
        { string: 5, fret: 15, semitone: 10, note: 'G3', frequency: 196.00 },
        { string: 5, fret: 16, semitone: 11, note: 'G#3', frequency: 207.65 },
        { string: 5, fret: 17, semitone: 0, note: 'A3', frequency: 220.00 }
    ]
];



function playSound(freq) {
    if (!audioContext) {
        console.error('AudioContext not initialized. User interaction required.');
        return;
    }

    const duration = 0.5;
    const attackTime = 0.01;
    const decayTime = 0.2;
    const sustainLevel = 0.8;
    const releaseTime = 0.3;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const distortion = audioContext.createWaveShaper();

    // Use a combination of sawtooth and triangle waves
    oscillator.type = 'sawtooth';
    const realCoeffs = new Float32Array([0, 0.4, 0.4, 0.2, 0.1, 0.1, 0.05]);
    const imagCoeffs = new Float32Array(realCoeffs.length);
    const customWave = audioContext.createPeriodicWave(realCoeffs, imagCoeffs);
    oscillator.setPeriodicWave(customWave);

    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

    // ADSR envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + attackTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, audioContext.currentTime + attackTime + decayTime);
    gainNode.gain.setValueAtTime(sustainLevel, audioContext.currentTime + duration - releaseTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

    // Distortion
    function makeDistortionCurve(amount) {
        const k = typeof amount === 'number' ? amount : 50;
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;
        for (let i = 0; i < n_samples; ++i) {
            const x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }
    distortion.curve = makeDistortionCurve(20);
    distortion.oversample = '4x';

    oscillator.connect(gainNode);
    gainNode.connect(distortion);
    distortion.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}



function drawNeck() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const width = canvas.width;
    const cellWidth = width / 18;
    const fretboardHeight = cellWidth * 6; // 6 strings
    
    // Adjust canvas height to fit the new neck size, fret markers, and text
    canvas.height = fretboardHeight + 60; // 30px for fret markers, 30px for text
    
    const height = fretboardHeight;

    // Fill each cell in column 0 with very light grey
    ctx.fillStyle = 'rgba(220, 220, 220, 0.5)'; // 50% darker very light grey with some transparency
    for (let i = 0; i < 6; i++) {
        ctx.fillRect(0, i * cellWidth, cellWidth, cellWidth);
    }

    // Draw vertical lines
    for (let i = 0; i <= 18; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellWidth, 0);
        ctx.lineTo(i * cellWidth, height);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let i = 0; i <= 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellWidth);
        ctx.lineTo(width, i * cellWidth);
        ctx.stroke();
    }

    // Draw fret markers
    ctx.fillStyle = 'black';
    const markerPositions = [4, 6, 8, 10, 13]; // 13 is the 12th fret
    markerPositions.forEach(pos => {
        if (pos === 13) {
            // Double dot at the 12th fret
            ctx.beginPath();
            ctx.arc((pos - 0.75) * cellWidth, height + 15, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc((pos - 0.25) * cellWidth, height + 15, 5, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            // Single dot for other positions
            ctx.beginPath();
            ctx.arc((pos - 0.5) * cellWidth, height + 15, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    });
}
function playRound() {
    if (isPlaying) return; // Don't start a new game if a sequence is still playing
    
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    // Create a single AudioContext for the entire application
    if (audioContext) {
        audioContext.close();
    }
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

  

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the neck
    drawNeck();

    // Set a new random note
    randomIndex = Math.floor(Math.random() * 7);

    const randomSemitone = whiteKeySemitones[randomIndex].semitone;
    console.log("noteName", whiteKeySemitones[randomIndex].note);
    const text = "Root: " + whiteKeySemitones[randomIndex].note; // ${noteName.slice(0, -1)} `;
    ctx.font = '18px Arial'; // Set the font size to 32px (twice as big as the default 16px)
    ctx.fillText(text, canvas.width / 2, canvas.height - 16); // Adjusted y-coordinate to account for larger font
    // Call the playRandomNotes function with the random note
    createNoteSequence(randomSemitone);
    playRandomNotes();


}

function pauseGame(){
    gamePaused = true;
}

function resumeGame(){
    gamePaused = false;
}

function startGame() {
    gamePaused = false;

    if (startButton.textContent === 'Start') {
        startButton.textContent = 'Stop';
    }
    else {
        startButton.textContent = 'Start';
        pauseGame();
    }

    if (isPlaying) return; // Don't start a new game if a sequence is still playing
    
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    // Create a single AudioContext for the entire application
    if (audioContext) {
        audioContext.close();
    }
    playRound();

    

}

function updateCountdown() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Calculate the height of the fretboard
    const cellWidth = canvas.width / 18;
    const fretboardHeight = cellWidth * 6;

    // Clear only the area for the text, not the fret markers
    ctx.clearRect(0, fretboardHeight + 30, canvas.width, 30);

    // Set up text properties
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    // Display the note to play and the countdown timer on one line
    const noteName = noteNames[randomNote];
    const text = `Play: ${noteName.slice(0, -1)} | Time: ${timeRemaining}s`;
    ctx.fillText(text, canvas.width / 2, canvas.height - 10);

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        //startGame(); // Start a new game when time runs out
    } else {
        timeRemaining--;
    }
}

function randomSemitone() {
    return Math.floor(Math.random() * 12);
    
}

function clickNeck(event) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const cellWidth = canvas.width / 18;
    
    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellWidth);
    
    // Ensure row is within bounds (0-5)
    if (row < 0 || row > 5) {
        console.log('Click outside the fretboard');
        return;
    }
    
    const clickedNote = fretBoard[row][col].note;
    
    console.log(`Clicked on fret: ${col}, string: ${row + 1}, note: ${clickedNote}`);
   
    
    // Check if the clicked note matches the random note
    if (clickedNote.slice(0, -1) === noteNames[randomNote]) {
        console.log('Correct! You found the right note.');
        
        // Fill the clicked square with light green
        ctx.fillStyle = 'rgba(144, 238, 144, 0.6)'; // Light green with some transparency
        ctx.fillRect(col * cellWidth, row * cellWidth, cellWidth, cellWidth);
        
        // Redraw the grid lines for the filled square
        ctx.strokeStyle = 'black';
        ctx.strokeRect(col * cellWidth, row * cellWidth, cellWidth, cellWidth);
        

    } else {
        console.log('Try again!');
        
        // Display the note name in the square
        ctx.fillStyle = 'rgba(255, 200, 200, 0.6)'; // Light red background
        ctx.fillRect(col * cellWidth, row * cellWidth, cellWidth, cellWidth);
        
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(clickedNote.slice(0, -1), (col + 0.5) * cellWidth, (row + 0.5) * cellWidth);
        
        // Redraw the grid lines for the filled square
        ctx.strokeStyle = 'black';
        ctx.strokeRect(col * cellWidth, row * cellWidth, cellWidth, cellWidth);
        
        // Clear the square after 2 seconds
        setTimeout(() => {
            ctx.clearRect(col * cellWidth, row * cellWidth, cellWidth, cellWidth);
            ctx.strokeRect(col * cellWidth, row * cellWidth, cellWidth, cellWidth);
        }, 2000);
    }
}

// Modify the DOMContentLoaded event listener to start the first game
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('myCanvas');
    if (canvas) {
        canvas.addEventListener('click', clickNeck);
        drawNeck(); // Draw the neck when the page loads
        //startGame(); // Start the first game when the page loads
    } else {
        console.error('Canvas element not found');
    }
});

// Function to adjust the score
function adjustScore(s) {
    if (s > 0) {
        score++;
    } else {
        score = Math.max(0, score - 1);
    }
}

function createNoteSequence(st) {
    noteSequence = [];

    fretBoard.forEach((string, stringIndex) => {
        string.forEach((note) => {
            if (note.semitone === st) {  
                console.log("Root");
                addToNoteSequence(note);
                
            }
            //Major 3rd
            console.log("(st + 4) % 12): ", (st + 4) % 12);
            if (note.semitone === (st + 4) % 12) { 
                console.log("Major 3rd");
                if (checkInterval(MAJOR3RD)) {
                    addToNoteSequence(note);  
                }
            }
            //Perfect 5th
            if (note.semitone === (st + 7) % 12) {
                if (checkInterval(PERFECT5TH)) {
                    addToNoteSequence(note);
                }
               
            }
            //Major 7th
            if (note.semitone === (st + 11) % 12) { 
                if (checkInterval(SEVENTH)) {
                    addToNoteSequence(note);
                }
                
            }

        });
    });
}

function playRandomNotes() {
    if (isPlaying) return; // Don't start a new noteSequence if one is already playing
    
    isPlaying = true;


    // reverse the sequence sometimes
    if (Math.random() < 0.5) {
        noteSequence = reverseOrder(noteSequence);
    }

    // Call playSequence with the populated sequence
    playSequence(noteSequence);
}

// Add this new function to shuffle the array
function reverseOrder(array) {
    return array.reverse();
}

function setSpeed(s) {
    console.log('Setting speed to ' + s);
    switch(s) {
        case 'fast':
            playSpeed = FAST;
            break;
        case 'slow':
            playSpeed = SLOW;
            break;
        case 'medium':
        default:
            playSpeed = MEDIUM;
            break;
    }
}

function getNoteColor(noteName) {
    // Extract only the first character of the note name
    const baseNote = noteName.charAt(0);
    
    switch (baseNote) {
        case 'C':
            return '#FF0000'; // Red   
        case 'D':
            return '#FFA500'; // Orange
        case 'E':
            return '#FFFF00'; // Yellow
        case 'F':
            return '#00FF00'; // Green
        case 'G':
            return '#0000FF'; // Blue
        case 'A':
            return '#800080'; // Purple
        case 'B':
            return '#FFC0CB'; // Pink
        default:
            return '#000000'; // Black (for any unexpected input)
    }
}



function addToNoteSequence(note, type) {

    if (checkPosition(note, type)) {
        noteSequence.push(note);
    }

    return 1;
}

function checkInterval(type) {
    if(type === MAJOR3RD) {
        if(document.getElementById('major3rd').checked) {
            return 1;
        }
    }
    if(type === PERFECT5TH) {
        if(document.getElementById('perfect5th').checked) {
            return 1;
        }
    }
    if(type === SEVENTH) {
        if(document.getElementById('seventh').checked) {
            return 1;
        }
    }
    return 0;
}

function checkPosition(note) {

    console.log("XXXXXXX-- CHECK POSITION --XXXXXX");

    const position1 = document.getElementById('position1').checked;
    const position5 = document.getElementById('position5').checked;
    const position7 = document.getElementById('position7').checked;

        console.log(position1, position5, position7);
            if (position1 && note.fret >= 0 && note.fret <= 4) {
                return 1;
            }

            if (position5 && note.fret >= 5 && note.fret <= 8) {
                return 1;
            }

            if (position7 && note.fret >= 7 && note.fret <= 11) {
                return 1;
            }
            // If all positions are unchecked, return 1
            if (!position1 && !position5 && !position7) {
                return 1;
            }

    return 0;
}

function ifInterval(type) {
    if(type === MAJOR3RD) {
        if(document.getElementById('major3rd').checked) {
            return 1;
        }
    }
    if(type === PERFECT5TH) {
        if(document.getElementById('perfect5th').checked) {
            return 1;
        }
    }
    if(type === SEVENTH) {
        if(document.getElementById('seventh').checked) {
            return 1;
        }
    }
        return 0;
    }






// Move playSequence to the global scope
function playSequence(sequence, index = 0) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const cellWidth = canvas.width / 18;

    if (index < noteSequence.length) {
        const note = noteSequence[index];
        
        playSound(note.frequency);
        // Log the note being played
        console.log(`Playing note: ${note.note} at fret ${note.fret} on string ${note.string}`);

        
        ctx.fillStyle = getNoteColor(note.note);
        ctx.fillRect(note.fret * cellWidth, note.string * cellWidth, cellWidth, cellWidth);

        // Display "#" if the note contains a sharp
        if (note.note.includes('#')) {
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('#', (note.fret + 0.5) * cellWidth, (note.string + 0.5) * cellWidth);
        }
        
        ctx.strokeStyle = 'black';
        ctx.strokeRect(note.fret * cellWidth, note.string * cellWidth, cellWidth, cellWidth);
        
        setTimeout(() => {
            playSequence(noteSequence, index + 1);
        }, playSpeed);
    } else {
        console.log('Sequence complete');
        isPlaying = false; // Reset the playing flag
        if(!gamePaused) {
            playRound(); // play another round

        }
    }
}
