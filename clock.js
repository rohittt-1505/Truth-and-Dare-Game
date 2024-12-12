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

    createPlayerCircle();
    spinArrow();
}

function createPlayerCircle() {
    const playerCircle = document.getElementById('playerCircle');
    playerCircle.innerHTML = '';

    players.forEach((player, index) => {
        const angle = (index * 360) / players.length;
        const playerElement = document.createElement('div');
        playerElement.classList.add('player-name');
        playerElement.style.transform = `rotate(${angle}deg) translateX(120px)`;
        playerElement.textContent = player;
        playerCircle.appendChild(playerElement);
    });
}

function spinArrow() {
    const arrow = document.getElementById('arrow');
    let rotation = 0;

    // Speed up rotation (faster than before)
    spinningInterval = setInterval(() => {
        rotation += 20; // Increase increment for faster rotation
        arrow.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
    }, 30); // Faster interval (every 30ms)

    setTimeout(() => {
        clearInterval(spinningInterval);
        const selectedPlayerIndex = Math.floor(Math.random() * players.length);
        const angle = (selectedPlayerIndex * 360) / players.length;
        arrow.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;

        document.getElementById('selectedPlayer').textContent = `${players[selectedPlayerIndex]}, it's your turn!`;

        document.getElementById('gameScreen').classList.add('d-none');
        document.getElementById('truthDareScreen').classList.remove('d-none');
        document.getElementById('startButton').classList.remove('d-none');
    }, 7000); // Stop after 7 seconds
}


function startTurn() {
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
