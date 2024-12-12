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
    document.getElementById('askPlayer').textContent = ''; // Clear "ask player" question
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

    resultDisplay.textContent = ''; // Clear the result text

    truthDareInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * options.length);
        resultDisplay.textContent = options[randomIndex];
    }, 100);

    setTimeout(() => {
        clearInterval(truthDareInterval);
        const randomIndex = Math.floor(Math.random() * options.length);
        resultDisplay.textContent = options[randomIndex];
        resultDisplay.classList.remove('blinking'); // Stop blinking

        if (resultDisplay.textContent === 'Pass') {
            celebrate(); // Trigger fireworks celebration
            return; // Stop further execution if the result is 'Pass'
        }

        // Get the current player (selected player for truth/dare)
        const currentPlayer = document.getElementById('selectedPlayer').textContent.replace(", it's your turn!", "");

        // Select a random player who is NOT the current player
        let askPlayer = players[Math.floor(Math.random() * players.length)];

        // Ensure the selected player is not the current player
        while (askPlayer === currentPlayer) {
            askPlayer = players[Math.floor(Math.random() * players.length)];
        }

        // Display the result for the second player (who asks the current player)
        const askDisplay = document.getElementById('askPlayer');
        askDisplay.textContent = `${askPlayer}, ask question to ${currentPlayer} `;

    }, 5000);
}

// Function to trigger the fireworks celebration
function celebrate() {
    const fireworksContainer = document.getElementById('fireworks-container');
    fireworksContainer.classList.remove('d-none'); // Make fireworks container visible

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(fireworksContainer);
        }, i * 500); // Stagger each firework
    }

    setTimeout(() => {
        fireworksContainer.classList.add('d-none'); // Hide fireworks container after celebration
        fireworksContainer.innerHTML = ''; // Remove any remaining particles
    }, 3000); // End celebration after 3 seconds
}

function createFirework(container) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.top = `${Math.random() * 100}%`;
    firework.style.left = `${Math.random() * 100}%`;
    container.appendChild(firework);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
        particle.style.setProperty('--y', `${Math.random() * 200 - 100}px`);
        particle.style.backgroundColor = randomColor();
        firework.appendChild(particle);
    }

    setTimeout(() => {
        firework.remove(); // Remove firework after animation
    }, 1500);
}

function randomColor() {
    const colors = ['#ff6347', '#ffa500', '#00ff00', '#00ced1', '#1e90ff', '#ff69b4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function restartGame() {
    // Clear previous data when restarting
    document.getElementById('playerNameDisplay').textContent = ''; // Clear player name display
    document.getElementById('result').textContent = ''; // Clear Truth/Dare/Pass result
    document.getElementById('selectedPlayer').textContent = ''; // Clear selected player
    document.getElementById('askPlayer').textContent = ''; // Clear "ask player" question
    document.getElementById('truthDareScreen').classList.add('d-none'); // Hide Truth/Dare screen
    document.getElementById('gameScreen').classList.remove('d-none'); // Reset to game screen

    spinNames(); // Restart the spinning process
}

function goToHome() {
    window.location.href = 'index.html'; // Redirect to the home page
}
