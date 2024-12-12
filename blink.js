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

        // Show Start button after 5 seconds
        document.getElementById('startButton').classList.remove('d-none');
    }, 7000);
}

function startTurn() {
    // Hide the Start button after it's clicked
    document.getElementById('startButton').classList.add('d-none');

    spinTruthDare();
}

function spinTruthDare() {
    const resultDisplay = document.getElementById('result');
    const options = ['Truth', 'Dare', 'Pass'];

    truthDareInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * options.length);
        resultDisplay.textContent = options[randomIndex];
    }, 100);

    setTimeout(() => {
        clearInterval(truthDareInterval);
    }, 5000);
}
