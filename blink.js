let players = [];
let spinningInterval;
let truthDareInterval;

function showPlayerInput() {
    document.getElementById('welcomeScreen').classList.add('d-none');
    document.getElementById('playerInputScreen').classList.remove('d-none');
}

function showNameInputs() {
    const numPlayers = document.getElementById('numPlayers').value;
    if (numPlayers <= 0) return alert('Please enter a valid number of players.');

    const nameInputs = document.getElementById('nameInputs');
    nameInputs.innerHTML = '';

    for (let i = 0; i < numPlayers; i++) {
        nameInputs.innerHTML += `<input type="text" class="form-control mb-2" placeholder="Player ${i + 1} Name" id="player${i}">`;
    }

    document.getElementById('playerInputScreen').classList.add('d-none');
    document.getElementById('nameInputScreen').classList.remove('d-none');
}

function startGame() {
    // Clear previous data when restarting
    document.getElementById('playerNameDisplay').textContent = ''; // Clear player name display
    document.getElementById('result').textContent = ''; // Clear Truth/Dare/Pass result
    document.getElementById('selectedPlayer').textContent = ''; // Clear selected player
    document.getElementById('startButton').classList.add('d-none'); // Hide start button for Truth/Dare
    document.getElementById('truthDareScreen').classList.add('d-none'); // Hide Truth/Dare screen
    document.getElementById('gameScreen').classList.add('d-none'); // Reset game screen

    players = [];
    const numPlayers = document.getElementById('numPlayers').value;

    for (let i = 0; i < numPlayers; i++) {
        const name = document.getElementById(`player${i}`).value;
        if (!name) return alert(`Please enter a name for Player ${i + 1}`);
        players.push(name);
    }

    document.getElementById('nameInputScreen').classList.add('d-none');
    document.getElementById('gameScreen').classList.remove('d-none');

    spinNames();
}

function spinNames() {
    const display = document.getElementById('playerNameDisplay');

    spinningInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * players.length);
        display.textContent = players[randomIndex];
    }, 100);

    setTimeout(() => {
        clearInterval(spinningInterval);
        const selectedPlayer = display.textContent;
        document.getElementById('selectedPlayer').textContent = `${selectedPlayer}, it's your turn!`;

        document.getElementById('gameScreen').classList.add('d-none');
        document.getElementById('truthDareScreen').classList.remove('d-none');

        document.getElementById('startButton').classList.remove('d-none');
    }, 7000);
}

function startTurn() {
    document.getElementById('startButton').classList.add('d-none');
    spinTruthDare();
}

function spinTruthDare() {
    const resultDisplay = document.getElementById('result');
    const options = ['Truth', 'Dare', 'Pass'];

    resultDisplay.textContent = ''; // Clear previous result
    resultDisplay.classList.add('blinking');

    truthDareInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * options.length);
        resultDisplay.textContent = options[randomIndex];
    }, 100);

    setTimeout(() => {
        clearInterval(truthDareInterval);
        const randomIndex = Math.floor(Math.random() * options.length);
        resultDisplay.textContent = options[randomIndex];
        resultDisplay.classList.remove('blinking');
    }, 5000);
}

function restartGame() {
    document.getElementById('playerNameDisplay').textContent = ''; // Clear player name display
    document.getElementById('result').textContent = ''; // Clear Truth/Dare/Pass result
    document.getElementById('selectedPlayer').textContent = ''; // Clear selected player
    document.getElementById('truthDareScreen').classList.add('d-none'); // Hide Truth/Dare screen
    document.getElementById('gameScreen').classList.remove('d-none'); // Reset to game screen

    spinNames(); // Restart the spinning process
}
